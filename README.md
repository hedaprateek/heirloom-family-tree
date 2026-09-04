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

## Five views of the same family

Switch with the buttons in the top bar or the <kbd>1</kbd>–<kbd>5</kbd> keys.
All five print and export identically, so pick the picture you want and hit
Print. A link can also open straight into one: `?view=tree`.

| View | What it's for |
|---|---|
| **Chart** | The full record — photos, dates, places, occupations, every link. |
| **Tree** | Names on branches that thicken in proportion to how many descendants each line carries. Trunk, roots and foliage at the tips. The card-detail button adds years, then photos. |
| **Fan** | Generations as concentric rings, each slice sized by how much of the family sits behind that person. The best poster for a deep family. |
| **Timeline** | One bar per life across the years, grouped by generation, with brass ties marking the year two people married. Shows at a glance who overlapped whom. |
| **Register** | A numbered list to hand round the table, using d'Aboville numbering — `1.2.1` places anyone exactly without needing the chart. |

## Reading the chart

It's laid out as a family register rather than an org chart:

| | |
|---|---|
| `∗` | born |
| `†` | died — the card is shaded too |
| `⚭` | married, with the year beneath |
| `⚮` | divorced or separated |
| `◇` | partners |

Roman numerals down the left gutter mark each generation.

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

## Sharing it with the family

**Share** puts the whole tree into one link — the data rides in the URL's
fragment, so it never reaches any server. No account, no backend, nothing to
run. Send it by message, or print its QR code on the poster.

Anyone who opens the link gets **their own copy** to explore and add to. There
is no shared server, so nobody is editing the same thing. When a relative has
added people, ask for their link or file back and use **File ▸ Merge** — it
matches on name and birth year, adds anyone new, fills in blanks you left, and
does not duplicate people you both have.

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
