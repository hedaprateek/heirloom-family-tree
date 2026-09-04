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

Three views: **Descendants** of a chosen person, **Ancestors** as a pedigree
chart, or **Everyone** with unconnected trees side by side.

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

## Printing

The print dialog shows a live sheet preview with the page grid drawn over the
real chart.

- **One sheet** — A4 through A0, shrink to fit. It warns you when names get too
  small to read.
- **Poster** — tiles across sheets at a print size you choose, with glue
  overlap, corner marks and row/column labels. It tells you the assembled size
  ("6 sheets — 3 across × 2 down, 126 × 84 cm").

For a true vector PDF, press Print and choose *Save as PDF*. In the print dialog
set margins to **None** and turn **headers and footers off**.

Also exports **PNG** (rendered through Canvas so the fonts survive), **SVG**
(vector, scales to any size) and the raw **family data** as JSON.

## Your data

Everything lives in your own browser as you type. Nothing is uploaded anywhere.

Use **File → Save family file** to keep a copy, move it to another computer, or
send it round the family. Clipboard copy/paste works as a fallback where
downloads are blocked.

## Keyboard

| | |
|---|---|
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

---

Stunity tech — by Prateek
