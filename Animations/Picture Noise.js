window.onload = function() {
    let x, y, color;
    let c=document.getElementById("canvas");
    let canvas=c.getContext("2d");
    function pixel() {
        canvas.fillStyle="white";
        canvas.fillRect(0,0,c.width,c.height);
        for (i=0;i<=2e5;i++)
        {
            x=Math.floor(Math.random()*c.width);
            y=Math.floor(Math.random()*c.height);
            canvas.fillStyle="black";  
            canvas.fillRect(x,y,1,1);
        }
        requestAnimationFrame(pixel);
    }
    pixel();
}