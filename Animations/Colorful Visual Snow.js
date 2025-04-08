var x, y, color,dark=1;
var c;
var t;
var canvas;
onload = function() {
	c = document.getElementById("canvas");
	canvas = c.getContext("2d");
	t = setInterval(pixel,50);
}
function pixel() {
	if(dark<=2) {
		for(i=0;i<=5e3;i++) {
			x=Math.floor(Math.random()*400);
			y=Math.floor(Math.random()*500); color="rgba("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*20)/50+")";   
			canvas.fillStyle=color;  
			canvas.fillRect(x,y,2,2);
		}
		dark++;
		clearInterval(t);
		t = setInterval(pixel,60);
	}
	else {
		canvas.fillStyle="black";
		canvas.fillRect(0,0,350,500);
		dark=1;    
		clearInterval(t);
		t = setInterval(pixel,30);
	}
}