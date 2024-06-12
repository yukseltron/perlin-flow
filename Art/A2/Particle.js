
function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(random(width), random(height));
  this.acc = createVector(random(width), random(height));
  this.maxspeed = 2;

  this.prevPos = this.pos;

  this.follow = function(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);

  }

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    strokeWeight(1);
    //stroke(random(255), random(255), random(255));
    //rect(this.pos.x, this.pos.y, random(20), random(20));
    //rect(this.pos.x, this.pos.y, 100, random(10));
    //ellipse(this.pos.x, this.pos.y, 10);
    //ellipse(this.pos.x, this.pos.y, 1);
    //point(this.pos.x, this.pos.y);
    rect(this.pos.x, this.pos.y, 10, 10);
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
