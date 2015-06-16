var pubnub = PUBNUB.init({ 
		publish_key: 'pub-c-6cc4f53c-edcc-41dc-96a5-976244127335', 
		subscribe_key: 'sub-c-a6f5a5ee-0bbe-11e5-8990-02ee2ddab7fe' // Ain't much to do with these keys
});

var channel = 'my-draw-demo';

pubnub.subscribe({ 
	channel: channel,
	callback: drawFromStream
});

var canvas = document.getElementById('drawCanvas');
var ctx = canvas.getContext('2d');

ctx.lineWidth = '3';
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

canvas.addEventListener('mousedown', startDraw, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', endDraw, false);

var isActive = false;
var plots = [];

function draw(e){
	if(!isActive) return;
	
	var x = e.offsetX || e.layerX - canvas.offsetLeft;
	var y = e.offsetY || e.layerY - canvas.offsetTop;
	
	plots.push({x: x, y: y});
	
	drawOnCanvas(plots);
}

function drawOnCanvas(color, plots) {
	ctx.beginPath();
	ctx.moveTo(plots[0].x, plots[0].y);
	
	for(var i = 1; i < plots.length; i++){
		ctx.lineTo(plots[i].x, plots[i].y);
	}
	ctx.stroke();
}

function startDraw(e) {
	isActive = true;
}

function endDraw(e) {
	isActive = false;
	pubnub.publish({ 
		channel: channel,
		message: { 
			plots: plots 
		} 
	});
	plots = [];
}

function drawFromStream(message) { 
	if(!message) return;
	ctx.beginPath();
	drawOnCanvas(message.plots);
}
