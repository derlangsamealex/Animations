function Field() {
  this.timer=0;
  this.worms=[];
  this.width=innerWidth;
  this.height=innerHeight; this.canvas=document.createElement("canvas");
  this.canvas.style.position="absolute";
  this.canvas.style.left=0;
  this.canvas.style.top=0;
  this.canvas.width=this.width;
  this.canvas.height=this.height;   
  document.body.appendChild(this.canvas);
  this.ctx=this.canvas.getContext("2d");
  this.handleEvent=function() {
    switch(event.type) {
      case "click":
        this.worms.push(new Worm(this.ctx,event.clientX,event.clientY));
        this.timer?null:this.timer=setInterval(this.animation.bind(this),20);
      break;
    }      
  }
  this.canvas.addEventListener("click",this);
  this.animation=function() {
    this.ctx.clearRect(0,0,this.width,this.height);
    for(let worm of this.worms) {
      worm.move();
    }
  }
}
function Worm(ctx,x,y) {
  this.pos=[[x,y]];

  this.setWorm=function() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";  
    for(let i=0;i<50;i++) {
      ctx.lineTo(this.pos[i][0], this.pos[i][1]);
      this.pos[i+1]=[this.pos[i][0]+Math.ceil(Math.random()*7-4),this.pos[i][1]+Math.ceil(Math.random()*7-4)];
      if(this.pos[i+1][0]<=0||this.pos[i+1][0]>=innerWidth||this.pos[i+1][1]<=0||this.pos[i+1][1]>=innerHeight) {
        this.pos[i+1][0]=this.pos[i][0];
        this.pos[i+1][1]=this.pos[i][1];
      }
      ctx.lineTo(this.pos[i+1][0],this.pos[i+1][1]);
      ctx.stroke();   
    }   
  }   
  this.move=function(x,y) {
   
    this.pos.shift();
    this.pos.push([this.pos[this.pos.length-1][0]+Math.ceil(Math.random()*7-4),this.pos[this.pos.length-1][1]+Math.ceil(Math.random()*7-4)]);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    for(let i=0;i<50;i++) {
      ctx.lineTo(this.pos[i][0], this.pos[i][1]);
      ctx.lineTo(this.pos[i+1][0],this.pos[i+1][1]);
      ctx.stroke(); 
    }
  }
  this.setWorm();
}