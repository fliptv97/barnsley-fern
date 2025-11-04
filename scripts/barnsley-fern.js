export class BarnsleyFern {
  #canvas = null;
  #ctx = null;
  #bounds = {
    xmin: -3,
    xmax: 3,
    ymin: 0,
    ymax: 10,
  };

  constructor(canvas) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw TypeError("canvas should be a HTMLCanvasElement");
    }

    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");
  }

  setDimensions(width, height) {
    if (typeof width !== "number" || typeof height !== "number") {
      throw new TypeError("both width and height should be numbers");
    }

    this.#canvas.width = width;
    this.#canvas.height = height;
  }

  draw() {
    let x = 0;
    let y = 0;
    let xn = 0;
    let yn = 0;

    for (let i = 0; i < 50_000; i++) {
      let r = Math.random();

      if (r < 0.01) {
        xn = 0;
        yn = 0.16 * y;
      } else if (r < 0.86) {
        xn = 0.85 * x + 0.04 * y;
        yn = -0.04 * x + 0.85 * y + 1.6;
      } else if (r < 0.93) {
        xn = 0.2 * x - 0.26 * y;
        yn = 0.23 * x + 0.22 * y + 1.6;
      } else {
        xn = -0.15 * x + 0.28 * y;
        yn = 0.26 * x + 0.24 * y + 0.44;
      }

      x = xn;
      y = yn;

      this.#ctx.fillStyle = "green";
      this.#ctx.fillRect(...this.#toPixel(xn, yn), 1, 1);
    }
  }

  #toPixel(x, y) {
    let { width: w, height: h } = this.#canvas;
    let { xmin, xmax, ymin, ymax } = this.#bounds;

    let scaledX = ((x - xmin) / (xmax - xmin)) * w;
    let scaledY = h - ((y - ymin) / (ymax - ymin)) * h;

    return [scaledX, scaledY];
  }
}
