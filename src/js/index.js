document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("noiseCanvas");
  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Implementación simple de Perlin Noise
  let permutation = [...Array(256).keys()];
  permutation = permutation.concat(permutation);

  function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function lerp(a, b, t) {
    return a + t * (b - a);
  }

  function grad(hash, x, y) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
  }

  function perlin(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);

    const u = fade(x);
    const v = fade(y);

    const aa = permutation[X + permutation[Y]];
    const ab = permutation[X + permutation[Y + 1]];
    const ba = permutation[X + 1 + permutation[Y]];
    const bb = permutation[X + 1 + permutation[Y + 1]];

    const gradAA = grad(aa, x, y);
    const gradBA = grad(ba, x - 1, y);
    const gradAB = grad(ab, x, y - 1);
    const gradBB = grad(bb, x - 1, y - 1);

    const lerpX1 = lerp(gradAA, gradBA, u);
    const lerpX2 = lerp(gradAB, gradBB, u);

    return (lerp(lerpX1, lerpX2, v) + 1) / 2;
  }

  let time = 0;

  function drawNoise() {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    let index = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const value = perlin(x * 0.005, y * 0.005 + time);
        const brightness = Math.floor(value * 100); // Controlar intensidad
        data[index++] = 80 + brightness; // R
        data[index++] = 0;              // G
        data[index++] = 90 + brightness * 1.5; // B
        data[index++] = 255;            // A
      }
    }

    ctx.putImageData(imageData, 0, 0);
    time += 0.003;
    requestAnimationFrame(drawNoise);
  }

  drawNoise();
});
