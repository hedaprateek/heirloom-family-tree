# Heirloom

A family tree you build by hand and print as a poster.

One self-contained HTML file — no build step, no server, no accounts. Open it,
add people, and print the chart at anything from A4 to a six-sheet A1 poster.

**Live:** https://hedaprateek.github.io/heirloom-family-tree/

---

## Building the tree

Select anyone on the chart and you get **＋ Partner**, **＋ Child**, **＋ Parent**
and **＋ Sibling**. Each opens a picker that either links someone already on the
chart or creates them from the name you type — fast enough to fill in at a table
with the family talking over each other.

Handled properly: remarriages, divorces and separations, single parents, unknown
partners, adopted-in spouses, and people whose own family sits elsewhere on the
chart (a faint dashed line runs to them rather than duplicating the card).

Scope it to the **descendants** of a chosen person, their **ancestors**, or
**everyone** with unconnected families side by side.

## Six views of the same family

Switch with the buttons in the top bar or the <kbd>1</kbd>–<kbd>6</kbd> keys.
All of them print and export identically, so pick the picture you want and hit
Print. A link can open straight into one: `?view=tree`, and the tree's shape
too: `?view=tree&shape=rows`.

| View | What it's for |
|---|---|
| **Chart** | The full record — photos, dates, places, occupations, every link. |
| **Tree** | An actual tree — showing name, dates and place · occupation; trunk at the foot, branches forking up into a crown, foliage at the growing tips, names on the wood. Comes in **two shapes**: *grown*, which splays into a canopy, and *generations*, which keeps the same tree on tidy rows. Click **Tree** again to switch. Limbs thicken in proportion to how many descendants that line carries. The card-detail button adds years, then photos. |
| **Fan** | Generations as concentric rings, each slice sized by how much of the family sits behind that person. The best poster for a deep family. |
| **Timeline** | One bar per life across the years, grouped by generation, with brass ties marking the year two people married. Shows at a glance who overlapped whom. |
| **Register** | A numbered list to hand round the table, using d'Aboville numbering — `1.2.1` places anyone exactly without needing the chart. |
| **In-laws** | The families married into: each married-in person with their own parents and their brothers and sisters, and a line saying who they married. Kept off the main chart, which is why it exists. |

## Reading the chart

It's laid out as a family register rather than an org chart:

| | |
|---|---|
| `∗` | born |
| `†` | died — the card is shaded too |
| `⚭` | married, with the year beneath |
| `c.` | approximate — "c. 1910" |
| `⚮` | divorced or separated |
| `◇` | partners |

Roman numerals down the left gutter mark each generation.

## Dates

Give someone a full **date of birth** and it is kept and used — but nothing
forces you to. Dates are free text, read for whatever precision is there:

`12 Mar 1948` · `12 March 1948` · `12/3/1948` (day first) · `1948-03-12` ·
`Mar 1948` · `1948` · `c. 1910` · `abt 1905`

As you type, the panel echoes back how it was read, so a vague entry is never a
mystery. It also shows the **age** — years so far for the living, age at death
for those who have died, marked *about* when only a year is known.

The calendar button beside the zoom controls switches the chart between years
only and full dates. Full dates are also what siblings are sorted by, so two
children born in the same year fall in the right order.

## The families you married into

A spouse's own parents and siblings would swamp a descent chart, so they are
kept off it. Record them anyway — open anyone who married in and add their
parents or their brothers and sisters — and they gather in the **In-laws**
view, one panel per family:

```
THE JOSHI FAMILY
  [Govind Joshi] ⚭ [Sarala Joshi]
              │
  [Kamala Joshi]  [Madhav Joshi]
  Kamala ⚭ 1941 Hari Prasad Deshmukh
```

The person who married in is highlighted and carries a ⚭ badge; the last line
says who in your family they married. Inside their own family everyone goes by
the name they were born with, so Kamala reads *Kamala Joshi*, not *Kamala
Deshmukh*. Families where only the spouse is known so far still get a panel —
which makes the view a useful list of what is still missing.

Panels are grouped by birth family, so two sisters who married two brothers
share one. If an in-law's parents *are* already on the main chart, no panel is
made — the tie is drawn there instead.

On the **main chart** the parents are named under the in-law's card in the
register's own shorthand — `d/o Govind & Sarala Joshi`, `s/o Iqbal & Farida
Sheikh` — so you can see where someone came from without leaving the tree.
Parents who share a surname share it in the line. It appears only where those
parents are not already drawn.

**People who married in** are drawn a step back — smaller, lighter type, no
generation stripe — so the line of descent reads first and the in-laws stay
legible without competing with it. Who counts as married-in is worked out from
the chart itself: anyone reached as a partner rather than by descent from
whoever the chart is drawn around. Change the focus person and it re-reckons.
The last button beside the zoom controls turns the effect off and shows
everyone the same.

## Printing

The print dialog shows a live sheet preview with the page grid drawn over the
real chart. Start from a preset — A4 handout, A3 chart, A2 poster, A1 wall,
or a multi-sheet mural — then adjust.

**Size**
- **One sheet** — A4 through A0, shrink to fit. It warns you when names get too
  small to read.
- **N sheets across** — say how wide you want the finished poster and it works
  out the scale and the grid.
- **Exact print size** — set the percentage yourself.

Tiled posters get glue overlap, corner trim marks, row/column labels, and an
**assembly sheet** printed first showing the numbered grid and the finished
size ("6 sheets — 3 across × 2 down, 126 × 84 cm").

**Heading** — the title and subtitle are worked out from your own family: the
commonest surname, the place most of them come from, the person the chart is
drawn around. One-tap suggestions sit under each field — *The Deshmukh Family*,
*The Deshmukhs of Nagpur*, *Descendants of Hari Prasad Deshmukh*. Leave one
untouched and it keeps following the data; type your own and it sticks.

**On the sheet** — optional frame rule, symbol key, date printed, people count,
and a **QR code linking to the shared tree**, so guests can scan the poster and
open the family on their phone.

**Ink and paper** — full colour or black &amp; white (the whole palette collapses
to greys for cheap printing), on white, warm cream, or transparent for export.

**Files** — vector **PDF** via Print ▸ *Save as PDF* (set margins to **None**
and turn **headers and footers off**); **PNG** at 150/300/600 dpi sized to the
paper you chose; **SVG**; **Excel** or **CSV** (see below); and the raw
**family file** as JSON.

## Spreadsheets

**File ▸ Blank spreadsheet to fill in** gives you an `.xlsx` with the columns
set up and a second sheet explaining how. Mail it round, let people type into
it, then **File ▸ Import a spreadsheet**.

One row per person. Only a name is required:

| ID | First name | Family name | Née | Sex | Born | Died | Place | Occupation | Father | Mother | Partner | Married | Divorced | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

- **Father / Mother / Partner** take a person's full name as it appears in
  their own row. Someone named but with no row of their own still gets a card,
  so no link is lost.
- **Two relatives with the same name** are fine. Both rows are kept, and the
  link is worked out where it can be — only one Ramesh Deshmukh is old enough
  to be the father of someone born in 1968, and a *Father* column prefers a
  man. Where it genuinely cannot tell, put the year after the name —
  `Ramesh Deshmukh (1940)` — and it says so rather than guessing.
- More than one partner: separate with semicolons — `Sulochana Kale; Anita Rao`
  — and line the **Married** and **Divorced** columns up in the same order.
- **Born / Died** accept anything readable: `1948`, `Mar 1948`, `c. 1910`. If
  Excel has turned a year into a date, it is converted back.
- Column headings are matched loosely, so a sheet someone already made usually
  imports as-is: *Name*, *DOB*, *Gender*, *Spouse*, *Mother's name* and the
  like are all understood. A single **Name** column is split into first and
  family name.

Before anything is applied you see what was read, plus anything worth checking
(ambiguous names, ignored columns), and choose **merge** or **replace**.

**File ▸ Export to Excel** writes the same columns back out with IDs filled in,
so a sheet can go out to the family, come back edited, and merge without
duplicating anyone.

Reading and writing `.xlsx` is done in the page itself — the format is a zip of
XML, and the browser already has deflate and an XML parser — so there is no
library to load and it works offline.

## Gathering it from the whole family

**Share** puts the whole tree into one link — the data rides in the URL's
fragment, so it never reaches any server. No account, no backend, nothing to
run. Put your name on it, send it by message, or print its QR code on the
poster.

There is no shared server, so nobody edits the same copy — everyone gets their
own. The round trip is built for that:

1. **You share.** One link to as many relatives as you like.
2. **They add what they know.** Their copy shows a banner — *"Prateek shared
   this with you · you have added 4 people"* — with a **Send my additions
   back** button. That hands them a link (or a file, for a big tree) tagged
   with their name.
3. **You collect.** **File ▸ Collect everyone's additions** takes a whole
   batch at once: paste all the links one per line, pick several files, or
   both. Each is merged in turn and you get a table of what each person
   contributed.

| From | Added | Already here | Blanks filled |
|---|---|---|---|
| Meera | 2 | 3 | 0 |
| Anil | 1 | 4 | 2 |

Merging **only ever adds**. People are matched on name and birth year, so
nobody is duplicated, blanks you left are filled from whoever knew them, and
nothing you already have is overwritten. Send the same link out again after
collecting and everyone gets the combined tree.

If you would rather everyone typed into one place, a spreadsheet works too —
see above — or say the word and we can talk about what a real shared backend
would take.

## Writing in Hindi

Names, places and occupations can be written in Devanagari — **हरि प्रसाद
देशमुख**, **नागपुर · रेलवे क्लर्क** — and they render, measure, print and
export exactly like Latin text. Noto Sans and Noto Serif Devanagari sit behind
the register faces in every font stack, including the ones the canvas painter
and the standalone SVG export use, so nothing falls back to a mismatched
system font. Hindi and English names can sit side by side in the same tree.

The interface itself is still in English.

## Your data

Everything lives in your own browser as you type. Nothing is uploaded anywhere.

Use **File ▸ Save family file** to keep a copy or move it to another computer.
Clipboard copy/paste works as a fallback where downloads are blocked.

## Keyboard

| | |
|---|---|
| <kbd>1</kbd>–<kbd>5</kbd> | switch view — chart, tree, fan, timeline, register |
| <kbd>N</kbd> | add a person and start typing their name |
| <kbd>F</kbd> | fit the whole chart on screen |
| <kbd>/</kbd> | jump to search |
| <kbd>P</kbd> | print &amp; export |
| <kbd>Ctrl</kbd>+<kbd>Z</kbd> | undo (<kbd>Shift</kbd> to redo) |
| <kbd>Esc</kbd> | close a dialog, or deselect |

Drag to pan, scroll or pinch to zoom, double-click a card to redraw the chart
around that person.

## Running it

Download `index.html` and open it. That's the whole app.

The only thing it fetches from the internet is the typefaces and a small QR
code library. Both are optional — offline you get system fonts and no QR, and
everything else works exactly the same.

---

Stunity tech — by Prateek
