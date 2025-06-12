document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("noiseCanvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  let frame = 0;

  function generateNoise() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const brightness = Math.floor(Math.random() * 50); // brillo bajo

      // Colores morados con variaciones
      data[i] = brightness * 1.5;       // rojo
      data[i + 1] = brightness * 0.4;   // verde
      data[i + 2] = brightness * 2;     // azul
      data[i + 3] = 255;                // alfa
    }

  }

  function animate() {
    generateNoise();
    requestAnimationFrame(animate);
  }

  animate();
});
