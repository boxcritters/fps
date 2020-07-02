// ==UserScript==
// @name         FPS
// @namespace    http://tampermonkey.net/
// @version      0.1.1.11
// @description  try to take over the world!
// @author       TumbleGamer
// @match        https://boxcritters.com/play/
// @match        https://boxcritters.com/play/?*
// @match        https://boxcritters.com/play/#*
// @match        https://boxcritters.com/play/index.html
// @match        https://boxcritters.com/play/index.html?*
// @match        https://boxcritters.com/play/index.html#*
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

console.info("-----------------------------------");
console.info("[FPS]");
console.info("A mod created by TumbleGamer");
console.info("-----------------------------------");

window = unsafeWindow || window;

function getTime() {
	//return new Date().getTime()/1000;
	return performance.now()/1000
}
var stage = document.getElementById('stage')
var counter = document.createElement('p');
counter.className = "text-right";
stage.parentElement.appendChild(counter);
var last = getTime();
var now,dt,fps;
now = dt = fps = 0;
var lastFPS = [];
var buffer = 10;
var roundBy = 1;

window.fps = fps;

function update() {
	now = getTime();
	dt = now-last;
	fps = 1/dt;
	last = now;
}

window.addEventListener('load', function () {
	console.log("load")
createjs.Ticker.on("tick", function(t) {
	update();
	lastFPS.unshift(fps);
	if(lastFPS.length>buffer)lastFPS.length = buffer;
	var averageFPS = lastFPS.reduce((a, b) => a + b, 0)/lastFPS.length;
	counter.innerText = "FPS: " + Math.round(averageFPS/roundBy)*roundBy;
});
})