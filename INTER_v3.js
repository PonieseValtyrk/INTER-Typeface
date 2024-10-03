const width = document.getElementById('rightBox').offsetWidth, height = document.getElementById('rightBox').offsetHeight;
let xDotSize, yDotSize, xDotUnusedSize, yDotUnusedSize;
let dotColor = 'rgb(0,0,0)', dotUnusedColor = 'rgb(0,0,0)', backgroundColor = 'rgb(255,255,255)';
let inputText, Spacing;
let xInterval, yInterval;
let svgWriter;
let round = 0;
let textAlignment = 'left'; // 可以是 'left', 'center', 或 'right'

import {letters} from './letters.js';

function setup() {
  let canvas = createCanvas(width, height);
  canvas.parent('rightBox');
  svgWriter = createGraphics(width, height, SVG);

  // 添加对齐方式选择器
  const alignmentSelect = createSelect();
  alignmentSelect.parent('controlPanel');
  alignmentSelect.option('left');
  alignmentSelect.option('center');
  alignmentSelect.option('right');
  alignmentSelect.selected('center');
  alignmentSelect.changed(() => {
    textAlignment = alignmentSelect.value();
    redraw();
  });
}

function applyParameters() {
  xInterval = parseFloat(document.getElementById('xInterval').value);
  yInterval = parseFloat(document.getElementById('yInterval').value);
  xDotSize = parseFloat(document.getElementById('xDotSize').value);
  yDotSize = parseFloat(document.getElementById('yDotSize').value);
  xDotUnusedSize = parseFloat(document.getElementById('xDotUnusedSize').value);
  yDotUnusedSize = parseFloat(document.getElementById('yDotUnusedSize').value);
  dotColor = document.getElementById('dotColor').value;
  dotUnusedColor = document.getElementById('dotUnusedColor').value;
  backgroundColor = document.getElementById('backgroundColor').value;
  inputText = document.getElementById('inputText').value;
  Spacing = parseFloat(document.getElementById('Spacing').value);
  textAlignment = document.getElementById('align').value;
}

function generateRandomPattern() {
  return Array.from({length: 8}, () => 
    Array.from({length: 8}, () => Math.random() < 0.5 ? 1 : 0)
  );
}

function drawText(offsetX, offsetY, renderer) {
  const lines = inputText.split('\n');
  const lineHeights = lines.map(line => (22 + Spacing) * yInterval);
  const totalHeight = lineHeights.reduce((sum, height) => sum + height, 0);

  const lineWidths = lines.map(line => {
    return line.split('').reduce((width, char) => {
      const letter = (char === '#') ? generateRandomPattern() : (letters[char] || letters[' ']);
      return width + (letter[0].length + Spacing * 2 + 8) * xInterval;
    }, 0);
  });
  const maxWidth = Math.max(...lineWidths);

  let startX, startY;
  if (textAlignment === 'center') {
    startX = (width - maxWidth) / 2;
    startY = (height - totalHeight) / 2;
  } else if (textAlignment === 'right') {
    startX = width - maxWidth - offsetX;
    startY = offsetY;
  } else { // 'left' alignment
    startX = offsetX;
    startY = offsetY;
  }

  let currentY = startY;
  lines.forEach((line, lineIndex) => {
    let currentX = textAlignment === 'center' ? (width - lineWidths[lineIndex]) / 2 :
                   textAlignment === 'right' ? width - lineWidths[lineIndex] - offsetX : startX;

    for (const char of line) {
      const letter = (char === '#') ? generateRandomPattern() : (letters[char] || letters[' ']);

      for (let i = 0; i < letter.length; i++) {
        for (let j = 0; j < letter[i].length; j++) {

          if (letter[i][j] === 2) {
            // Skip the rest of this iteration and move to the next iteration
            continue;
          }
          
          const dotX = (2 * j + 1) * xInterval + currentX - xDotSize * 0.5;
          const dotY = (2 * i + 1) * yInterval + currentY - yDotSize * 0.5;
          const isActive = letter[i][j] === 1;
          renderer.fill(isActive ? dotColor : dotUnusedColor);
          renderer.rect(dotX + 30, dotY + 30, 
                        isActive ? xDotSize : xDotUnusedSize, 
                        isActive ? yDotSize : yDotUnusedSize, 
                        round);
        }
      }

      currentX += (letter[0].length + Spacing * 2 + 8) * xInterval;
    }

    currentY += lineHeights[lineIndex];
  });
}

function draw() {
  applyParameters();
  clear();
  fill(backgroundColor);
  rect(0, 0, width, height);
  noStroke();
  drawText(0, 0, { fill: fill, rect: rect });
}

function saveSvg() {
  applyParameters();
  svgWriter.clear();
  svgWriter.noStroke();
  svgWriter.fill(backgroundColor);
  svgWriter.rect(0, 0, width, height);
  drawText(0, 0, { fill: svgWriter.fill, rect: svgWriter.rect });
  svgWriter.save("svgTest.svg");
}

// 事件监听器设置
window.addEventListener('load', () => {
  const paramInputs = ['xInterval', 'yInterval', 'xDotSize', 'yDotSize', 
                       'xDotUnusedSize', 'yDotUnusedSize', 'dotColor', 
                       'dotUnusedColor', 'backgroundColor', 'inputText', 'Spacing'];
  paramInputs.forEach(param => {
    document.getElementById(param).addEventListener('input', () => {
      applyParameters();
      redraw();
    });
  });

  document.getElementById('saveSvg').addEventListener('click', saveSvg);
});

// p5.js 全局函数
window.setup = setup;
window.draw = draw;