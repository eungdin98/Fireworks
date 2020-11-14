class Particle {
  constructor(position) {
    this.acceleration = createVector(0, 0.05);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.position = position.copy();
    this.lifespan = random(50,255);
    this.mass = 100;
  }

  run() {
    this.update();
    this.display();
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 3;
  }

  // Method to display
  display() {
    stroke(255, 100, 0, this.lifespan);
    strokeWeight(1);
    fill(255, random(0,150), 0, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
  }

  // Is the particle still useful?
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
class ParticleSystem {
  constructor(num, position) {
    this.origin = position.copy();
    this.particles = [];
    for (let i = 0; i < num; i++) {
      this.particles.push(new Particle(this.origin));
    }
  }

  addParticle() {
    this.particles.push(new Particle(this.origin));
  }

  run() {
    for (let particle of this.particles) {
      particle.run();
    }
    this.particles = this.particles.filter(particle => !particle.isDead());
  }
}
let systems = [];

function setup() {
  let text = createP("click to add particle systems");
  text.position(10, 365);

  createCanvas(640, 360);
}

function draw() {
  background(35);
  for (let i = 0; i < systems.length; i++) {
    systems[i].addParticle();
    systems[i].run();
  }
}

function mousePressed() {
  systems.push(new ParticleSystem(random(12,50), createVector(mouseX, mouseY)));
}