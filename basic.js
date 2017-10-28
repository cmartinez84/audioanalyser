/////________________________________________________________
//Audio Context
var audio = new Audio();
audio.src = 'worldatpeace.mp3';
audio.controls = true;
audio.autoplay = false;
document.body.appendChild(audio);
var index = 0;
var audioCtx = new AudioContext();
var analyser = audioCtx.createAnalyser();
analyser.smoothingTimeConstant = .95;
var filter = audioCtx.createBiquadFilter();
var audioBuffer;
var frequencyData;

/////________________________________________________________
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
/////________________________________________________________
window.addEventListener('load', function(e) {
  var source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
   frequencyData = new Uint8Array(analyser.frequencyBinCount);
}, false);
/////________________________________________________________
function clear(){
    ctx.clearRect(0, 0, 800, 400);
}

function drawBar(x, y, i){
  ctx.beginPath();
  ctx.moveTo(x, 800);
  ctx.lineTo(x, y);
  ctx.lineWidth = 15;
  ctx.strokeStyle = `rgb(${i * 9},100, ${i * 10})`;
  ctx.stroke();
}

function drawMultipleBars(frequencyData){
  for (var i = 0; i < 30; i++) {
    var x = 30 * i;
    var y = 3 * frequencyData[i +20];
    drawBar(x, y, i);
  }
}
  /////________________________________________________________
  function renderFrame() {
     requestAnimationFrame(renderFrame);
     analyser.getByteFrequencyData(frequencyData);
     clear();
    drawMultipleBars(frequencyData)
  }

  renderFrame();
