window.onload = function() {
	var x, y, color,dark=1;
	var t = setInterval(pixel,20);
	var c=document.getElementById("canvas");
	var canvas=c.getContext("2d");
	function pixel()
	{
		if(dark<=400)
		{
			for(i=0;i<=50;i++) {
				x=Math.floor(Math.random()*400);
				y=Math.floor(Math.random()*500); color="rgba("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*50)/100+")";   
				canvas.fillStyle=color;  
				canvas.fillRect(x,y,Math.floor(Math.random()*10),Math.floor(Math.random()*10));
			}
			dark++;
		}
		else
		{
			canvas.fillStyle=color;
			canvas.fillRect(0,0,350,500);
			dark=1;    
		}
	}
}