'use strict';

const Cloud = {
  INITIAL_X: 110,
  INITIAL_Y: 10,
  WIDTH: 420,
  HEIGTH: 270,
  COLOR: `#fff`,
  SHADOW_COLOR: `rgba(0, 0, 0, 0.7)`,
  SHADOW_GAP: 10,
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
  PADDING_LEFT: 55,
  HEIGTH: 150,
  WIDTH: 40,
  GAP: 50,
};

const Label = {
  PADDING_LEFT: 55,
  PADDING_TOP: 260,
  PADDING_TOP_TIMES: 115,
  USER_COLOR: `rgba(255, 0, 0, 1)`,
};

const renderCloud = (ctx, x, y, width, height, color, shadowColor, shadowGap) => {
// SM. Complicate using methods beginPath, moveTo, closePath, fill.
  ctx.fillStyle = shadowColor;
  ctx.fillRect((x + shadowGap), (y + shadowGap), width, height);

  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = (ctx, names, times) => {
  renderCloud(ctx, Cloud.INITIAL_X, Cloud.INITIAL_Y, Cloud.WIDTH, Cloud.HEIGTH, Cloud.COLOR, Cloud.SHADOW_COLOR, Cloud.SHADOW_GAP);
  ctx.save();

  ctx.translate(110, 10);
  ctx.font = `${Font.SIZE} ${Font.FAMILY}`;
  ctx.fillStyle = `${Font.COLOR}`;
  ctx.fillText(`Ура вы победили!`, Intro.GAP_LINE1, Font.LINE_SPACE);
  ctx.fillText(`Список результатов:`, Intro.GAP_LINE2, Font.LINE_SPACE * 2);

  let maxTime = 0;
  times.forEach(function (currentTime) {
    if (maxTime < currentTime) {
      maxTime = currentTime;
    }
  });

  // Put YOU on the first position.
  for (let i = 0; i < names.length; i++) {
    if (names[i] === `Вы`) {
      const swapName = names[0];
      names[0] = names[i];
      names[i] = swapName;

      const swapTime = times[0];
      times[0] = times[i];
      times[i] = swapTime;
    }
  }

  for (let i = 0; i < names.length; i++) {
    const currentBarHeight = 150 * times[i] / maxTime;
    ctx.fillStyle = `hsl(240, ${Math.floor(Math.random() * 101)}%, 50%)`;

    if (names[i] === `Вы`) {
      ctx.fillStyle = Label.USER_COLOR;
      names[i] = ` Вы `;
    }

    ctx.translate(0, Cloud.HEIGTH);
    ctx.rotate(-Math.PI / 2);
    ctx.fillRect(Bar.PADDING_BOTTOM, Bar.PADDING_LEFT + (Bar.WIDTH + Bar.GAP) * i, currentBarHeight, Bar.WIDTH);
    ctx.rotate(Math.PI / 2);
    ctx.translate(0, -Cloud.HEIGTH);
    ctx.fillText(names[i], Label.PADDING_LEFT + (Bar.WIDTH + Bar.GAP) * i, Label.PADDING_TOP);
    ctx.fillText(Math.round(times[i]), Label.PADDING_LEFT + (Bar.WIDTH + Bar.GAP) * i, Label.PADDING_TOP_TIMES - Font.LINE_SPACE + Bar.HEIGTH - currentBarHeight);
  }
  ctx.restore();
};
