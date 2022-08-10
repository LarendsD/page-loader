<h1 align="center">
  Загрузчик страниц
</h1>

[![Actions Status](https://github.com/LarendsD/backend-project-lvl3/workflows/hexlet-check/badge.svg)](https://github.com/LarendsD/backend-project-lvl3/actions)
<a href="https://codeclimate.com/github/LarendsD/backend-project-lvl3/maintainability"><img src="https://api.codeclimate.com/v1/badges/c2b9f0bf46ed58cc23b1/maintainability" /></a>
<a href="https://codeclimate.com/github/LarendsD/backend-project-lvl3/test_coverage"><img src="https://api.codeclimate.com/v1/badges/c2b9f0bf46ed58cc23b1/test_coverage" /></a>

Библиотека для скачивания веб-страниц.
## 🛠️ Инструкция по установке ##
1. Склонировать данный репозиторий:
```bash
git clone https://github.com/LarendsD/backend-project-lvl3.git
```
2. Перейдите в директорию библиотеки и установите её:
```bash
npm ci
```
3. Установить библиотеку как пакет:
```bash
npm link
```
## :blue_book: Использование библиотеки ##
По умолчанию сайт скачивается в текущую директорию.

```bash
page-loader <url>
```
<a href="https://asciinema.org/a/4Ct5CG5OenH7hgXzUaMw2K1Ol" target="_blank"><img src="https://asciinema.org/a/4Ct5CG5OenH7hgXzUaMw2K1Ol.svg" /></a>
Изменить это поведение можно с помощью опции -o или --output
```bash
page-loader -o [directory] <url>
```
<a href="https://asciinema.org/a/XQ25tOZt8ikj3A9WEANN3bGNN" target="_blank"><img src="https://asciinema.org/a/XQ25tOZt8ikj3A9WEANN3bGNN.svg" /></a>
Дополнительная информация
```bash
page-loader -h
```
