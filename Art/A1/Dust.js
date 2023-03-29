let inc;
let scl;
let cols;
let rows;
let zoff;
let fr;
let particles = [];
let flowField = [];
let start = false;

function setup() {
  var button = createButton('Start').parent("buttons");
  button.mousePressed(switchStart);
  button.id('switch');

  var reset = createButton('Reset').parent("buttons");
  reset.mousePressed(resetSketch);

  createCanvas(displayWidth, displayHeight).parent("sketch");
  zoff = 0;
  scl = 6;
  inc = 0.1;
  cols = floor(width / scl);
  rows = floor(height / scl);
  background(document.getElementById("back").value);
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
    zoff = 0;
    scl = 6;
    inc = 0.1;
    cols = floor(width / scl);
    rows = floor(height / scl);
    setParticles();
    background(document.getElementById("back").value);
    stroke(document.getElementById("fore").value);
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
    document.getElementById("back").addEventListener('change', (e) => {
        let color = e.target.value;
        background(color);
    });

    document.getElementById("fore").addEventListener('change', (e) => {
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
