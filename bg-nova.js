(function () {
  var canvas = document.createElement('canvas');
  canvas.id = 'sitebg';
  document.body.prepend(canvas);
  var ctx = canvas.getContext('2d');
  var W, H, t = 0;
  function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
  function tick() {
    t += 0.6;
    ctx.fillStyle = '#05020a';
    ctx.fillRect(0, 0, W, H);
    var horizon = H * 0.55;
    var grad = ctx.createLinearGradient(0, 0, 0, horizon);
    grad.addColorStop(0, 'rgba(34,230,255,0.05)');
    grad.addColorStop(1, 'rgba(255,46,166,0.03)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, horizon);
    ctx.strokeStyle = 'rgba(255,46,166,0.35)';
    ctx.lineWidth = 1;
    var vpX = W / 2;
    for (var i = -10; i <= 10; i++) {
      ctx.beginPath();
      ctx.moveTo(vpX, horizon);
      ctx.lineTo(vpX + i * 140, H);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(34,230,255,0.28)';
    var rows = 14;
    for (var r = 0; r < rows; r++) {
      var prog = ((r * 40 + t) % (rows * 40)) / (rows * 40);
      var y = horizon + prog * prog * (H - horizon);
      ctx.beginPath();
      ctx.moveTo(vpX - (y - horizon) * 3, y);
      ctx.lineTo(vpX + (y - horizon) * 3, y);
      ctx.stroke();
    }
    requestAnimationFrame(tick);
  }
  addEventListener('resize', resize);
  resize();
  tick();
})();