function Field() {
  this.timer=0;
  this.something=[];
  this.width=innerWidth;
  this.height=innerHeight; this.canvas=document.createElement("canvas");
  this.canvas.style.position="absolute";
  this.canvas.style.left=0;
  this.canvas.style.top=0;
  this.canvas.width=this.width;
  this.canvas.height=this.height; 
console.log("test");  
  document.body.appendChild(this.canvas);
  this.ctx=this.canvas.getContext("2d");
  this.handleEvent=function() {
    switch(event.type) {
      case "touchstart":
        this.something.push(new Worm(this.ctx,event.touches[0].clientX,event.touches[0].clientY));
        this.timer?null:this.timer=setInterval(this.animation.bind(this),50);
      break;
      case "mousedown":
        this.something.push(new Worm(this.ctx,event.clientX,event.clientY));
        this.timer?null:this.timer=setInterval(this.animation.bind(this),50);
      break;
    }      
  }
  this.canvas.addEventListener("touchstart",this);
  this.canvas.addEventListener("mousedown",this);
  this.animation=function() {
    for(let thing of this.something) {
      thing.move();
    }
  }
}
function Worm(ctx,x,y) {
  this.pos=[[x,y]];
  let r = Math.round(Math.random() * 255);
  let g = Math.round(Math.random() * 255);
  let b = Math.round(Math.random() * 255);
  this.setWorm=function() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;  
    for(let i=0;i<20;i++) {
      ctx.lineTo(this.pos[i][0], this.pos[i][1]);
      this.pos[i+1]=[this.pos[i][0]+Math.ceil(Math.random()*3-2),this.pos[i][1]+Math.ceil(Math.random()*3-2)];
      ctx.lineTo(this.pos[i+1][0],this.pos[i+1][1]);
      ctx.stroke();   
    }   
  }   
  this.move=function(x,y) {
    this.pos.shift();
    this.pos.unshift([this.pos[this.pos.length-1][0]+Math.ceil(Math.random()*3-2),this.pos[this.pos.length-1][1]+Math.ceil(Math.random()*3-2)]);
    this.setWorm();
  }
  this.setWorm();
}