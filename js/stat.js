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
// + Обратите внимание. Особенностью отрисовки текста на канвасе является то, что он не поддерживает перенос, поэтому каждая новая строчка должна быть отрисована новым вызовом метода fillText или strokeText.

// После сообщения о победе должна располагаться гистограмма времён участников. Параметры гистограммы следующие:
// + Высота гистограммы 150px.
// + Ширина колонки 40px.
// + Расстояние между колонками 50px.
// + Цвет колонки игрока Вы rgba(255, 0, 0, 1).
// + Цвет колонок других игроков — синий, а насыщенность задаётся случайным образом.
// Времена игроков располагаются над колонками.
// Имена игроков — под колонками гистограммы.
// Обратите внимание. В rgba последний параметр — это прозрачность, а не насыщенность. Поэтому для задания цвета колонок других игроков нужно использовать hsl.

// Обратите внимание. Время прохождения игры должно быть округлено к целому числу.

// -------------------------

const INITIAL_CLOUD_X = 100;
const INITIAL_CLOUD_Y = 10;
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const TEXT_HEIGHT = 25;

const HISTOGRAM_HEIGHT = 150;
const BAR_WIDTH = 40;
const BAR_GAP = 50;
const PLAYER_BAR_COLOR = `rgba(255, 0, 0, 1)`;

// TODO. Не уверен в этом коде. Проверить на баги.
let PLAYERS_BAR_COLOR = `hsl(240, ${Math.floor(Math.random() * 101)}, 50)`;
// https://ru.stackoverflow.com/questions/863591/%D0%A1%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B5-%D1%87%D0%B8%D1%81%D0%BB%D0%BE-%D0%BE%D1%82-1-%D0%B4%D0%BE-100


const renderCloud = (ctx, x, y, color) => {
  // SM. Complicate using methods beginPath, moveTo, closePath, fill.
  ctx.fillStyle = `rgba(0, 0, 0, 0.7)`;
  ctx.fillRect((INITIAL_CLOUD_X + 10), (INITIAL_CLOUD_Y + 10), CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = color;
  ctx.fillRect(INITIAL_CLOUD_X, INITIAL_CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = (ctx, names, times) => {
  renderCloud(ctx, INITIAL_CLOUD_X, INITIAL_CLOUD_Y, `#fff`);

  ctx.font = `16px PT Mono`;
  ctx.fillStyle = `#000`;
  // TODO. Здесь и далее убрать магические значения.
  ctx.fillText(`Ура вы победили!`, 250, TEXT_HEIGHT);
  ctx.fillText(`Список результатов:`, 237, TEXT_HEIGHT * 2);


};
