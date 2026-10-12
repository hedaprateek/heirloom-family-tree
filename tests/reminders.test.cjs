const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {test} = require('node:test');
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const context = vm.createContext({TextEncoder, Date});
const dates = html.slice(html.indexOf('const MON_SHORT'), html.indexOf('/** style:'));
const reminders = html.slice(html.indexOf('function reminderDates()'), html.indexOf('function remindersDialog()'));
vm.runInContext(dates + '\n' + reminders + `
let S = {people:{}, unions:{}, meta:{title:'Family'}};
function P(id){return S.people[id];}
function U(id){return S.unions[id];}
function isDead(p){return !!(p.dead || p.death);}
function fullName(p){return p.name;}
`, context);
const run = code => vm.runInContext(code, context);

test('includes exact living birthdays and eligible marriages; reports invalid dates', () => {
  run(`S.people = {
    a:{name:'A', birth:'29 Feb 2000'}, b:{name:'B', birth:'12 March 1990'},
    c:{name:'Unknown'}, d:{name:'Approximate', birth:'c. 12 Mar 1940'},
    e:{name:'Invalid leap', birth:'29 Feb 2001'}, f:{name:'Bad month', birth:'2000-13-01'},
    g:{name:'Month only', birth:'Mar 1970'}, h:{name:'Deceased', birth:'1 Jan 1920',dead:true},
    i:{name:'Invalid day', birth:'31 April 1990'}, j:{name:'Zero day',birth:'2000-03-00'}
  }; S.unions = {
    married:{a:'a',b:'b',date:'1 Jan 2020',status:'married'},
    divorced:{a:'a',b:'b',date:'2 Jan 2020',divorced:'2021'},
    partners:{a:'a',b:'b',date:'3 Jan 2020',status:'partners'},
    widowed:{a:'a',b:'h',date:'4 Jan 2020'},
    incomplete:{a:'a',b:'b',date:'2020'},
    dangling:{a:'a',b:'absent',date:'5 Jan 2020'}
  }`);
  assert.equal(run('reminderDates().events.length'), 3);
  assert.equal(run('reminderDates().missing.length'), 8);
});

test('annual dates roll forward and leap birthdays fall on February 28 or 29', () => {
  const text = run(`reminderCalendar(reminderDates().events, 'day', new Date(2026,9,11,10))`);
  assert.match(text, /DTSTART:20270228T090000/);
  assert.match(text, /RRULE:FREQ=YEARLY;BYMONTH=2;BYMONTHDAY=-1/);
  assert.match(text, /DTSTART:20270312T090000/);
  assert.equal((text.match(/BEGIN:VEVENT/g) || []).length, 3);
  assert.equal((text.match(/TRIGGER:-P1D/g) || []).length, 3);
  assert.equal((text.match(/TRIGGER:PT0S/g) || []).length, 3);
  assert.match(text, /DTSTART:20270101T090000/);
  assert.match(run(`reminderCalendar([reminderDates().events[0]], 'same', new Date(2028,0,1))`), /DTSTART:20280229T090000/);
});

test('today, future original dates, and reminder choices', () => {
  const events = `[{kind:'birthday',who:'Today',id:'x',y:2000,m:10,d:11}]`;
  assert.match(run(`reminderCalendar(${events}, 'same', new Date(2026,9,11,8))`), /DTSTART:20261011T090000/);
  assert.match(run(`reminderCalendar(${events}, 'week', new Date(2026,9,11,10))`), /DTSTART:20271011T090000/);
  assert.match(run(`reminderCalendar(${events}, 'week')`), /TRIGGER:-P7D/);
  assert.match(run(`reminderCalendar([{kind:'anniversary',who:'Future',id:'y',y:2029,m:1,d:1}], 'same', new Date(2026,0,1))`), /DTSTART:20290101T090000/);
});

test('escapes calendar injection, folds Unicode by bytes, and produces stable UIDs', () => {
  const name = 'आशा '.repeat(40) + ',;\\\nBEGIN:VEVENT';
  context.personName = name;
  const expression = `reminderCalendar([{kind:'birthday',who:personName,id:'x',y:1990,m:5,d:1}], 'same', new Date(2026,0,1))`;
  const text = run(expression);
  assert.equal((text.match(/BEGIN:VEVENT\r\n/g) || []).length, 1);
  for(const line of text.split('\r\n')) assert.ok(Buffer.byteLength(line, 'utf8') <= 75);
  const unfolded = text.replace(/\r\n /g, '');
  assert.ok(unfolded.includes('SUMMARY:' + run('calendarText(personName + " — birthday")')));
  assert.ok(text.endsWith('END:VCALENDAR\r\n'));
  assert.equal(unfolded.match(/UID:(.*)/)[1], run(expression).replace(/\r\n /g, '').match(/UID:(.*)/)[1]);
});

test('inline application scripts parse', () => {
  for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){
    if(/src=|application\/ld\+json/.test(match[1])) continue;
    new vm.Script(match[2]);
  }
});
