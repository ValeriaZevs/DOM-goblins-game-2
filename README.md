# 🎮 Goblin Whack-a-Mole

[![Build, Test and Deploy](https://github.com/ValeriaZevs/DOM-goblins-game-2/actions/workflows/deploy.yml/badge.svg)](https://github.com/ValeriaZevs/DOM-goblins-game-2/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://ValeriaZevs.github.io/DOM-goblins-game-2/)

Игра по теме DOM: гоблин появляется в случайной ячейке на 1 секунду, игрок должен кликнуть по нему и набрать очки.

## 🚀 Demo

- GitHub Pages: https://ValeriaZevs.github.io/DOM-goblins-game-2/

## ✅ Реализовано

- Поле 4x4 генерируется динамически.
- Гоблин появляется в случайной клетке ровно на 1 секунду.
- При клике по гоблину начисляется +1 очко и гоблин исчезает.
- Пропуск гоблина увеличивает счётчик промахов.
- После 5 промахов игра завершается.
- Логика игры разделена на классы (`GameBoard`, `ScoreBoard`, `GoblinGame`).
- Сборка и стили/картинки проходят через Webpack.
- Деплой на GitHub Pages через GitHub Actions.

## 🛠 Tech stack

- Yarn
- Webpack
- Babel
- ESLint (Airbnb base)
- Jest
- GitHub Actions + GitHub Pages

## 📦 Local запуск

```bash
yarn install
yarn start
```

## 🧪 Проверки

```bash
yarn lint
yarn test
yarn build
```
