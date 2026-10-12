// Local preview only. The published website remains plain HTML, with no server dependency.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8',
  '.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.png':'image/png'};
http.createServer((request,response)=>{
  let target;
  try {target = path.resolve(root,'.'+decodeURIComponent(new URL(request.url,'http://localhost').pathname));}
  catch {response.writeHead(400).end();return;}
  if(target !== root && !target.startsWith(root+path.sep)){response.writeHead(403).end();return;}
  if(target === root) target = path.join(root,'index.html');
  if(!['.html','.js','.webmanifest','.svg','.png'].includes(path.extname(target))){response.writeHead(404).end();return;}
  fs.readFile(target,(error,data)=>{
    if(error){response.writeHead(404).end();return;}
    response.writeHead(200,{'Content-Type':types[path.extname(target)],'Cache-Control':'no-cache'});response.end(data);
  });
}).listen(8794,'127.0.0.1',()=>{
  console.log('Heirloom preview: http://localhost:8794/ — press Ctrl+C to stop.');
  if(process.argv.includes('--open') && process.platform === 'win32'){
    require('node:child_process').spawn('powershell.exe', ['-NoProfile','-Command',
      "Start-Process 'http://localhost:8794/'"], {windowsHide:true,stdio:'ignore'});
  }
});
