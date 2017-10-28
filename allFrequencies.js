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
var currentFrequency = document.querySelector('#currentInput');

var osc = audioCtx.createOscillator();
osc.frequency.value = 523;

osc.connect(analyser);
// osc.start();

/////________________________________________________________
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
/////________________________________________________________
window.addEventListener('load', function(e) {
  var source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  // frequencyData = new Uint8Array(analyser.frequencyBinCount);
  frequencyData = new Uint8Array(1000);
}, false);
/////________________________________________________________
function clear(){
    ctx.clearRect(0, 0, 800, 800);
}

function drawBar(x, y, i){
  var color = Math.floor((y/800)*255);
  ctx.beginPath();
  ctx.moveTo(x, 800);
  ctx.lineTo(x, y);
  ctx.lineWidth = 1;
  ctx.strokeStyle = `rgba(${color}, 233, 45, 1)`;
  ctx.stroke();
}

function drawMultipleBars(frequencyData){
  for (var i = 0; i < frequencyData.length; i++) {
    var x = 2*i;
    var y = 800 - frequencyData[i]*3;
    drawBar(x, y, i);
  }
  // console.log(frequencyData);
}

  /////________________________________________________________
function renderFrame() {
     requestAnimationFrame(renderFrame);
     analyser.getByteFrequencyData(frequencyData);
     clear();
     drawMultipleBars(frequencyData);
}

function start(){
  renderFrame();
}


function rangeChange(e){
  // console.log(e.value);
  var value = e.value;
  osc.frequency.value = value;
  currentFrequency.innerHTML = value;
  console.log(value);

}
