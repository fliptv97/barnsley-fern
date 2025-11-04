import { BarnsleyFern } from "./barnsley-fern.js";
import { debounce } from "./utils.js";

let canvas = document.querySelector("canvas");
let { width, height } = calculateCanvasSize();
let barnesleyFern = new BarnsleyFern(canvas);

barnesleyFern.setDimensions(width, height);
barnesleyFern.draw();

window.addEventListener(
  "resize",
  debounce(() => {
    let { width, height } = calculateCanvasSize();
    let ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = "#191919";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    barnesleyFern.setDimensions(width, height);
    barnesleyFern.draw();
  })
);

function calculateCanvasSize() {
  let width = document.body.offsetWidth / 2;
  let height = Math.round(width * (16 / 12));

  return { width, height };
}
