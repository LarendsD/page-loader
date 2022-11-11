<h1 align="center">
  Page loader
</h1>

[![Actions Status](https://github.com/LarendsD/backend-project-lvl3/workflows/hexlet-check/badge.svg)](https://github.com/LarendsD/backend-project-lvl3/actions)
<a href="https://codeclimate.com/github/LarendsD/backend-project-lvl3/maintainability"><img src="https://api.codeclimate.com/v1/badges/c2b9f0bf46ed58cc23b1/maintainability" /></a>
<a href="https://codeclimate.com/github/LarendsD/backend-project-lvl3/test_coverage"><img src="https://api.codeclimate.com/v1/badges/c2b9f0bf46ed58cc23b1/test_coverage" /></a>

Library for download web-pages.
## 🛠️ Installation ##
1. Clone this repo:
```bash
git clone https://github.com/LarendsD/backend-project-lvl3.git
```
2. Go to local repo and install library:
```bash
npm ci
```
3. Install library like package:
```bash
npm link
```
## :blue_book: Library using ##
By default, the site will download to the current directory.

```bash
page-loader <url>
```
<a href="https://asciinema.org/a/4Ct5CG5OenH7hgXzUaMw2K1Ol" target="_blank"><img src="https://asciinema.org/a/4Ct5CG5OenH7hgXzUaMw2K1Ol.svg" /></a>
You can change this behavior with the parameter -o or --output
```bash
page-loader -o [directory] <url>
```
<a href="https://asciinema.org/a/XQ25tOZt8ikj3A9WEANN3bGNN" target="_blank"><img src="https://asciinema.org/a/XQ25tOZt8ikj3A9WEANN3bGNN.svg" /></a>
Additional information:
```bash
page-loader -h
```
