var PUBNUB_demo = PUBNUB.init({ 
	publish_key: 'pub-c-6cc4f53c-edcc-41dc-96a5-976244127335', 
	subscribe_key: 'sub-c-a6f5a5ee-0bbe-11e5-8990-02ee2ddab7fe' // Ain't much to do with these keys
}); 
		
var canvas = document.getElementById('drawCanvas');
var ctx = canvas.getContext('2d');

canvas.addEventListener('mousedown', startDraw, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', endDraw, false);