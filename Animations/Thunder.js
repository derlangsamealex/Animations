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
        this.worms.push(new Thunder(this.ctx,event.clientX,event.clientY,1,180));
        this.timer?null:this.timer=setInterval(this.animation.bind(this),2);
      break;
    }      
  }
   this.canvas.addEventListener("click",this);
  this.animation=function() {
    if(this.worms.length!=0)
      for(let worm of this.worms) {
        worm.move();
        if(Math.ceil(Math.random()*worm.w)==worm.w) {
          this.worms.push(new Thunder(this.ctx,worm.pos[0][0],worm.pos[0][1],1,400));
        }
        if(worm.pos[0][1]>=this.height-5) {          
          this.worms=[];
         // clearInterval(this.timer);
           this.ctx.clearRect(0,0,this.width,this.height);
        }        
    }
  }
}
function Thunder(ctx,x,y,r,w) {
  this.w=w;
  this.timer;
  this.pos=[[x,y]];
  this.setWorm=function() {
  
    ctx.beginPath();
    ctx.lineWidth = r;
    ctx.strokeStyle = "yellow";  
    for(let i=0;i<50;i++) {
      ctx.lineTo(this.pos[i][0], this.pos[i][1]);
      this.pos[i+1]=[this.pos[i][0]+Math.ceil(Math.random()*15-8),this.pos[i][1]+Math.ceil(Math.random()*7-3)];
      if(this.pos[i+1][0]<=0||this.pos[i+1][0]>=innerWidth||this.pos[i+1][1]<=0||this.pos[i+1][1]>=innerHeight) {
        this.pos[i+1][0]=this.pos[i][0];
        this.pos[i+1][1]=this.pos[i][1];
      }
      ctx.lineTo(this.pos[i+1][0],this.pos[i+1][1]);
      ctx.stroke();   
    }   
  }   
  this.noise=function() {
    this.audio=new AudioContext();
    let os=[],gain=[];
    for(let i=0;i<=3;i++) {
      os[i]=this.audio.createOscillator();  
      gain[i]=this.audio.createGain();
      os[i].connect(gain[i]);
      gain[i].connect(this.audio.destination);         
      gain[i].gain.value=0.5; 
      os[i].type="sawtooth";
      os[i].frequency.value=i*20+100;
      os[i].start();      
       gain[i].gain.linearRampToValueAtTime(0.01,this.audio.currentTime+0.5)
    }
    this.timer=setTimeout(this.stopAudio.bind(this),500);
  }  
  this.stopAudio=function() {
    this.audio.close();    
  }
  this.noise();
  this.move=function(x,y) {
    this.pos.shift();
    this.pos.push([this.pos[this.pos.length-1][0]+Math.ceil(Math.random()*9-5),this.pos[this.pos.length-1][1]+Math.ceil(Math.random()*7-3)]);
    if(this.pos[this.pos.length-1][0]<=0||this.pos[this.pos.length-1][0]>=innerWidth||this.pos[this.pos.length-1][1]<=0||this.pos[this.pos.length-1][1]>=innerHeight) {
        this.pos[this.pos.length-1][0]=this.pos[this.pos.length-2][0];
        this.pos[this.pos.length-1][1]=this.pos[this.pos.length-2][1];
    }
    ctx.beginPath();
    ctx.lineWidth = r;
    ctx.strokeStyle = "yellow";
    for(let i=0;i<50;i++) {
      ctx.lineTo(this.pos[i][0], this.pos[i][1]);
      ctx.lineTo(this.pos[i+1][0],this.pos[i+1][1]);
      ctx.stroke(); 
    }
  }
  this.setWorm();
}