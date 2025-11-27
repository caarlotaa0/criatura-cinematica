let x, y;
let vx, vy;
let tam = 90;
let colorF;


let barraX;
let barraW = 45;
let barraH;


let canvas;

function setup() {
  canvas = createCanvas(600, 450);
  canvas.parent("canvas");
  frameRate(60);

  
  x = width / 2;
  y = height / 2;
  vx = 3;
  vy = 2;

  
  colorF = color(255, 255, 255, 220);

  
  barraX = width / 2;
  barraH = height * 0.45;

  ellipseMode(CENTER);
  rectMode(CENTER);
}

function draw() {
  
  background(20, 24, 40, 40);

  
  fill(255, 255, 255, 40);
  noStroke();
  for (let i = 0; i < 40; i++) {
    let px = (i * 60 + frameCount * 0.3) % width;
    let py = (i * 45) % height;
    ellipse(px, py, 2, 2);
  }

  
  x += vx;
  y += vy;

  
  if (x > width - tam/2 || x < tam/2) {
    vx *= -1;
    mutarFantasma();
  }
  if (y > height - tam/2 || y < tam/2) {
    vy *= -1;
    mutarFantasma();
  }

  
  fill(120, 150, 255, 120);
  rect(barraX, height / 2, barraW, barraH, 10);

  
  let arriba = height / 2 - barraH/2;
  let abajo = height / 2 + barraH/2;
  let izq = barraX - barraW/2;
  let der = barraX + barraW/2;

  let colV = y + tam/2 > arriba && y - tam/2 < abajo;
  let colH = x + tam/2 > izq && x - tam/2 < der;

  if (colV && colH) {
    vx *= -1;
    mutarFantasma();
  }

  
  dibujarFantasma(x, y);
}


function dibujarFantasma(x, y) {
  noStroke();
  fill(colorF);

  // Cuerpo redondeado y ondas abajo
  let squish = sin(frameCount * 0.1) * 5;

  // Parte superior redondita
  ellipse(x, y - tam * 0.15, tam * 0.8 + squish, tam * 0.7);

  // Parte inferior ondulada
  beginShape();
  vertex(x - tam * 0.4, y - 5);

  for (let i = -2; i <= 2; i++) {
    let waveX = x + i * 15;
    let waveY = y + sin(frameCount * 0.2 + i) * 5 + 15;
    curveVertex(waveX, waveY);
  }

  vertex(x + tam * 0.4, y - 5);
  endShape(CLOSE);

  // ojos
  fill(30, 30, 50);
  ellipse(x - tam/6, y - 10, 14, 18);
  ellipse(x + tam/6, y - 10, 14, 18);

  // Brillito ojos
  fill(255, 255, 255, 200);
  ellipse(x - tam/6 - 3, y - 13, 4, 4);
  ellipse(x + tam/6 - 3, y - 13, 4, 4);
}


function mutarFantasma() {

  colorF = color(
    random(200, 255),
    random(200, 255),
    random(255),
    random(180, 240)
  );

  tam = random(70, 100);
}
