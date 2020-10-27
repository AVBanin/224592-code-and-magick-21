'use strict';
// Задача
// + В новом файле js/stat.js определите функцию renderStatistics, которая будет являться методом объекта window, со следующими аргументами:

// + ctx — канвас на котором рисуется игра.
// + names — массив, с именами игроков прошедших уровень. Имя самого игрока — Вы. Массив имён формируется случайным образом.
// + times — массив, по длине совпадающий с массивом names. Массив содержит время прохождения уровня соответствующего игрока из массива names. Время прохождения уровня задано в миллисекундах.
// + Эта функция будет вызываться каждый раз когда игрок проходит уровень. Чтобы успешно пройти уровень, надо выстрелить фаерболом (клавиша Shift) в забор.

// При вызове этой функции на канвас ctx должны быть выведены следующие элементы:

// + Белое облако с координатами [100, 10] высотой 270px и шириной 420px. Облако может быть как правильным многоугольником, нарисованным методом fillRect, так и неправильным нарисованным с помощью методов beginPath, moveTo, closePath, fill и других.
// + Под облаком должна располагаться тень: многоугольник такой же формы, залитый цветом rgba(0, 0, 0, 0.7) (полупрозрачный чёрный), смещённый относительно белого на 10px вниз и вправо.
// + На облаке должен быть отрисован текст сообщения ’Ура вы победили! \nСписок результатов: ’ с помощью метода fillText. Текст должен быть набран шрифтом PT Mono размером 16px.
// + + Обратите внимание. Особенностью отрисовки текста на канвасе является то, что он не поддерживает перенос, поэтому каждая новая строчка должна быть отрисована новым вызовом метода fillText или strokeText.

// После сообщения о победе должна располагаться гистограмма времён участников. Параметры гистограммы следующие:
// + Высота гистограммы 150px.
// + Ширина колонки 40px.
// + Расстояние между колонками 50px.
// + Цвет колонки игрока Вы rgba(255, 0, 0, 1).
// + Цвет колонок других игроков — синий, а насыщенность задаётся случайным образом.
// Времена игроков располагаются над колонками.
// Имена игроков — под колонками гистограммы.
// + Обратите внимание. В rgba последний параметр — это прозрачность, а не насыщенность. Поэтому для задания цвета колонок других игроков нужно использовать hsl.

// Обратите внимание. Время прохождения игры должно быть округлено к целому числу.

// -------------------------

// <canvas width="700" height="300"></canvas>
// координаты облака внутри холста 110-420, 10-270
// Примерные координаты первой колонки

// const INITIAL_CLOUD_X = 100;
// const INITIAL_CLOUD_Y = 10;

// const CLOUD_WIDTH = 420;
// const CLOUD_HEIGHT = 270;
// const TEXT_HEIGHT = 25;

// const BarSize = {
//   HISTOGRAM_HEIGHT: 150,
//   WIDTH: 40,
//   HORIZONTAL_GAP: 50,
//   BOTTOM_GAP: 30,

// };

// const BarCoordinate = {
//   INITIAL_X: 100 + BarSize.HORIZONTAL_GAP,
//   INITIAL_Y: 20 + BarSize.BOTTOM_GAP,
// };


// const USER_BAR_COLOR = `rgba(255, 0, 0, 1)`;

// // TODO. Не уверен в этом коде. Проверить на баги.
// let PLAYERS_BAR_COLOR = `hsl(240, ${Math.floor(Math.random() * 101)}, 50)`;
// // SM. Пояснение для Марка. Удалю после этого PR. https://ru.stackoverflow.com/questions/863591/%D0%A1%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B5-%D1%87%D0%B8%D1%81%D0%BB%D0%BE-%D0%BE%D1%82-1-%D0%B4%D0%BE-100

// // Не удаётся задать координаты на основе объекта canvas через точечную нотацию. Я что-то делаю неправильно?


const Cloud = {
  INITIAL_X: 110,
  INITIAL_Y: 10,
  WIDTH: 420,
  HEIGTH: 270,
  COLOR: `#fff`,
  SHADOW_COLOR: `rgba(0, 0, 0, 0.7)`,
};

const Font = {
  SIZE: `16px`,
  FAMILY: `PT Mono`,
  LINE_SPACE: 25,
  COLOR: `#000`,
};

const Intro = {
  GAP_LINE1: 140,
  GAP_LINE2: 127,
};

const Bar = {
  PADDING_BOTTOM: 25,
  PADDING_LEFT: 25,
  HEIGTH: 150,
  WIDTH: 40,
  GAP: 50,
};

// let saturation: Math.floor(Math.random() * 101);

const Label = {
  PADDING_LEFT: 25,
  PADDING_TOP: 260,
  PADDING_TOP_TIMES: 115,
  USER_COLOR: `rgba(255, 0, 0, 1)`,
  PLAYERS_COLOR: `hsl(240, 40%, 50%)`,
};

const renderCloud = (ctx, x, y, width, height, color, shadowColor) => {
// SM. Complicate using methods beginPath, moveTo, closePath, fill.
// TODO. Здесь и далее заменить магические цифры и значения на переменные или константы.
  ctx.fillStyle = shadowColor;
  ctx.fillRect((x + 10), (y + 10), width, height);

  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = (ctx, names, times) => {
  renderCloud(ctx, Cloud.INITIAL_X, Cloud.INITIAL_Y, Cloud.WIDTH, Cloud.HEIGTH, Cloud.COLOR, Cloud.SHADOW_COLOR);

  ctx.translate(110, 10);
  ctx.font = `${Font.SIZE} ${Font.FAMILY}`;
  ctx.fillStyle = `${Font.COLOR}`;
  ctx.fillText(`Ура вы победили!`, Intro.GAP_LINE1, Font.LINE_SPACE);
  ctx.fillText(`Список результатов:`, Intro.GAP_LINE2, Font.LINE_SPACE * 2);

  ctx.fillStyle = Label.USER_COLOR;
  ctx.translate(0, Cloud.HEIGTH);
  ctx.rotate(-Math.PI / 2);
  ctx.fillRect(Bar.PADDING_BOTTOM, Bar.PADDING_LEFT + (Bar.WIDTH + Bar.GAP) * 0, Bar.HEIGTH, Bar.WIDTH);
  ctx.rotate(Math.PI / 2);
  ctx.translate(0, -Cloud.HEIGTH);
  ctx.fillText(` Вы `, Label.PADDING_LEFT, Label.PADDING_TOP);
  ctx.fillText(`1234`, Label.PADDING_LEFT, Label.PADDING_TOP_TIMES - Font.LINE_SPACE);

  ctx.fillStyle = Label.PLAYERS_COLOR;
  ctx.translate(0, 270);
  ctx.rotate(-Math.PI / 2);
  ctx.fillRect(Bar.PADDING_BOTTOM, Bar.PADDING_LEFT + (Bar.WIDTH + Bar.GAP) * 1, Bar.HEIGTH - 20, Bar.WIDTH);
  ctx.rotate(Math.PI / 2);
  ctx.translate(0, -270);
  ctx.fillText(names[1], Label.PADDING_LEFT + (Bar.WIDTH + Bar.GAP), Label.PADDING_TOP);
  ctx.fillText(Math.round(times[1]), Label.PADDING_LEFT + (Bar.WIDTH + Bar.GAP), Label.PADDING_TOP_TIMES - Font.LINE_SPACE + 20);
};
