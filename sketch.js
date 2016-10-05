dipoles = []
var running = true;
var mlcNumberInput;

function setup() {
    mlcNumberInput = createInput("25").position(10, 10)
    createButton("Molekülanzahl ändern").position(10, 35).mouseClicked(changeMoleculeNumber)
    createButton("Anregung").position(10, 60).mouseClicked(excitation)
    var canvas = createCanvas(500, 500)
    canvas.position(0, 100)
    background(255)
    for (var i = 0; i < 25; i++) {
        dipoles[i] = new Dipole();
    }
}

function draw() {
    // noLoop()
    background(255)
    for (var i = 0; i < dipoles.length; i++) {
        dipoles[i].draw()
    }
}

function excitation() {
    if (running) {
        for (var i = 0; i < dipoles.length; i++) {
            // var prob = dipoles[i].dot(createVector(1,0))

            if(random() < pow(cos(dipoles[i].rotation), 2)){
                dipoles[i].fillColor = color(color(255,0,0))
            }

            // var col = map(pow(cos(dipoles[i].rotation), 2), 0, 1, 255, 0)
            // dipoles[i].fillColor = color(col)


        }
        noLoop()
        running = false
    } else {
        for (var i = 0; i < dipoles.length; i++) {
            dipoles[i].fillColor = color(255)
        }
        loop()
        running = true
    }
}

function changeMoleculeNumber() {
    dipoles = [];
    for (var i = 0; i < Number(mlcNumberInput.value()); i++) {
        dipoles[i] = new Dipole();
    }
}

function Dipole(position, direction) {
    this.position = createVector(random(10, width - 10), random(10, height - 10))
    this.rotation = random(0, TWO_PI)
    this.omega = random(-5, 5);
    this.excited = false;
    this.fillColor = color(255)
}

Dipole.prototype.draw = function(dt) {
    fill(this.fillColor)
    push()
    translate(this.position.x, this.position.y)
    rotate(this.rotation)
    ellipse(0, 0, 10, 10)
    line(0, 0, 0, 10)
    pop()
    this.rotation += (this.omega * (dt || 0.01))
}
