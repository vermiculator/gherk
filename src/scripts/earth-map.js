function setup() {
    let mycanvas = createCanvas(400, 400);
    mycanvas.parent('earth-map');
    background(0);
}
function draw() {
    fill(255);
    ellipse(mouseX, mouseY, 80, 80);
}

export default function sketch(p) {
  p.setup = setup;
  p.draw = draw;
}