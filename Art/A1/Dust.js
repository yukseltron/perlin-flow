let inc;
let scl;
let cols;
let rows;
let zoff;
let fr;
let particles = [];
let flowField = [];
let start = true;

let bg;
let fg;


function setup() {
  var button = createButton('Stop').parent("buttons");
  button.mousePressed(switchStart);
  button.id('switch');

  var reset = createButton('Reset').parent("buttons");
  reset.mousePressed(resetSketch);

  var sprinkle = createButton('Sprinkle').parent("buttons");
  sprinkle.mousePressed(sprinkleSketch);

  var randomize= createButton('Random').parent("buttons");
  randomize.mousePressed(randomizeSketch);
  randomize.id('randomize');


  createCanvas(displayWidth, displayHeight).parent("sketch");
  sprinkleSketch();

  bg = document.getElementById("background").value;
  fg = document.getElementById("foreground").value;
  background(bg);
  stroke(fg);
  setParticles();
}

function setParticles() {
    particles = [];
    times = random(10,200);

    for (let i = 0; i < times; i++) {
      particles[i] = new Particle();
    }
}

function resetSketch() {
    sprinkleSketch();
    background(document.getElementById("background").value);
    stroke(document.getElementById("foreground").value);
}

function sprinkleSketch() {
  zoff = 0;
  scl = 6;
  inc = 0.1;
  cols = floor(width / scl);
  rows = floor(height / scl);
  setParticles();
}

function randomizeSketch() {
  randomForegroundSketch();
  randomBackgroundSketch();
}

function randomForegroundSketch() {
  const r = random(255);
  const g = random(255);
  const b = random(255);
  stroke(r,g,b)
  document.getElementById("randomize").style.color = `rgb(${r},${g},${b})`;
}

function randomBackgroundSketch() {
  const r = random(255);
  const g = random(255);
  const b = random(255);
  background(r,g,b)
  document.getElementById("randomize").style.backgroundColor = `rgb(${r},${g},${b})`;
}


function switchStart() {
    if (start === true) {
        document.querySelector('#switch').innerHTML = "Start";
        start = false;
    } else {
        document.querySelector('#switch').innerHTML = "Stop";
        start = true;
    }
}

function events(){
    document.getElementById("background").addEventListener('change', (e) => {
        let color = e.target.value;
        background(color);
    });

    document.getElementById("foreground").addEventListener('change', (e) => {
        let color = e.target.value;
        stroke(color);
    });
};

function draw() {
  let yoff = 0;

  if (start == true) {
      for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
          let index = (x + y * cols);
          let angle = noise(xoff, yoff, zoff) * TWO_PI;
          let v = p5.Vector.fromAngle(angle);
          v.setMag(1);
          flowField[index] = v;
          xoff += inc;

        }
        yoff += inc;
        zoff += random(0,0.0000003);
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].edges();
        particles[i].show();
        particles[i].follow(flowField);
      }
    }
}

events();
