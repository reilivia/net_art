// Var for the sound file
let audioFile;
let audioBG;

// Button that will trigger the sound
let button;

// this is the array for mouse trail
// this will contain all the circles that folows the mouse
let trail = [];

// this is the variable for the mouse ripple on Click
let rippleX;
let rippleY;
let rippleSize;

// Array for random stroke weight for the recursive rectangle
// This will create an illussion of a rapid movement on each rectangle
const web = [1, 2, 3];

// Preload the fonts for the text
function preload() {
  aclonica = loadFont("Aclonica-Regular.ttf");
}

function setup() {
  // createCanvas(576, 324);
  createCanvas(innerWidth, innerHeight);

  // set the rectangle to start at the center
  rectMode(CENTER);
  // set the angle mode to degrees, not radius
  angleMode(DEGREES);
  // set the ellipse mode to radius
  ellipseMode(RADIUS);

  // set the frame rate to 20 frame per second to make it slower
  frameRate(20);

  // Load the sound file.
  // The audio is an echoy bell that I recorded in garage band
  soundFormats("mp3");
  audioFile = loadSound("Muriel by Bobby Richards.mp3");
  audioBG = loadSound("ding.mp3");

  // Create a new button to set up instance
  // The button will sit in the middle of the screen
  button = new myButton(width / 2, height / 2, width / 4);

  // This is the starting position and size for the ripple-onclick
  rippleX = width / 2;
  rippleY = height / 2;
  rippleSize = 0;
}

function draw() {
  background("black");

  // I put the button at the back so that it can act as a window to see the other elements on top of it

  button.display(mouseX, mouseY);

  // Mouse ripple is a group of 3 circle that scale up over time and recreate itself on click
  mouseripple();

  // Mouse trail is a group of circles that follows behind the mouse
  // The circles will get smaller and dissapear over time
  mousetrail();

  // The recursive rectangle and the content are at the front and have the same colour with the background
  // You can only see it with the white mouse trail or the button
  // I added push() and pop() around the recursive rectangle function so the setting does not apply to the other elements
  push();
  rectPattern(width / 2, height / 2, width, height);
  pop();

  textContent();
}

//-----------------

// A Class to describe a button
class myButton {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  // Identify mouse position on the button
  contains(mx, my) {
    return dist(mx, my, this.x, this.y) < this.r;
  }

  // Show the button
  display(mx, my) {
    noStroke();
    // The button is grey on mouseover, this way it will create some kind of a window to see the elements (recursive rectangle and text) on top of it
    if (this.contains(mx, my)) {
      fill(150);
    }
    // When the mouse is not over the button, the button is dark grey so you can't see clearly what is happening on the screen
    else {
      fill(50);
    }

    this.r = (height + width) / 8;
    ellipse(this.x, this.y, this.r, this.r);
  }
}

//-----------------

function mousetrail() {
  // the mouse trail has a contrast colour to the backgorund, the recursive revtangle, and the text.
  // when you hover around the screen, it's like using a light to see what's on the screen
  noStroke();
  fill("white");

  // Add a point to the end of the trail at the mouse position
  trail.push(new p5.Vector(mouseX, mouseY));

  // If the trail gets too long, remove the first (oldest) point
  // delete the oldest circle on the mouse trail
  if (trail.length > 50) {
    trail.shift();
  }

  // Draw the trail
  for (let i = 0; i < trail.length; i++) {
    let p = trail[i];

    // The trail is smaller at the beginning,and larger closer to the mouse
    let size = (50.0 * i) / trail.length;

    // create the circle
    circle(p.x, p.y, size);
  }
}
//-----------------

function mouseripple() {
  // for the same reason with the mouse trail, the mouse ripple will show what is happening on the screen.
  noFill();
  stroke("white");
  strokeWeight(50);

  // the circles size grow bigger (expand) over time
  rippleSize += 10;

  // create 3 circle for ripple effect
  circle(rippleX, rippleY, rippleSize);
  circle(rippleX, rippleY, (rippleSize * 3) / 4);
  circle(rippleX, rippleY, (rippleSize * 1) / 2);
}

//-----------------

function rectPattern(x, y, w, h) {
  // with no fill you can see the rectangles overlapped with each other
  noFill();

  // this if function will contain the recursive rectangles on the screen so it wont overload more rectangle outside the canvas
  if (w > 0 && h > 0) {
    // Create a rectangle
    rect(width / 2, height / 2, w, h);

    // The random stroke weight will enhance the illusion
    stroke("#000000");
    strokeWeight(random(web));

    // The rectangles rotate, creating some kind of an illusion
    rotate(frameCount * 0.05);

    // This is the recursion for the rectangle
    rectPattern(x, y, w - 10, h - 10);
  }
}

//-----------------

function mousePressed() {
  // set the mouse position as the circle ripple position
  // when you click on the screen, it will create three circle that expand out over time
  rippleX = mouseX;
  rippleY = mouseY;
  rippleSize = 0;

  // This will play/stop the music when you click on the button
  if (button.contains(mouseX, mouseY)) {
    if (audioFile.isPlaying()) {
      audioFile.stop();
    } else {
      audioFile.play();
    }
  }

  // This will play a sound effect if you click on any part of the canvas
  audioBG.play();
}

//-----------------

function textContent() {
  // This is the hidden text that will give you a hint on what interaction you can do
  fill("black");
  textSize(36);
  textAlign(CENTER);
  textFont(aclonica);
  text(`CLICK HERE`, width / 2, height / 2 + 20);
}
