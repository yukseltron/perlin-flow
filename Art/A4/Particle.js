
function Particle() {
  this.pos = createVector(300, 300);
  this.inv = createVector(random(height), random(width));
  this.vel = createVector(random(height), random(width));
  this.acc = createVector(random(height), random(width));
  this.maxspeed = 3;

  this.prevPos = this.pos;

  this.follow = function(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }

  this.update = function() {
    this.vel.add(random(-5,5));
    this.vel.limit(this.maxspeed);
    this.pos.add(random(-5,5), random(-5,5));
    this.acc.mult(0);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    let x = this.pos.x;
    let y = this.pos.y;
    let h = this.inv.y;
    let w = this.inv.y;

    arc(x, y, w, h, PI, 0);
    arc(y, x, h, w, 0, PI);
    strokeWeight(0.2);
    noFill();
    this.updatePrev();
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }
  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
