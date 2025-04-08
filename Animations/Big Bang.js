function SvgElement(str,obj) {
  let output=document.createElementNS("http://www.w3.org/2000/svg",str);
  for(prop in obj) {
    output.setAttribute(prop, obj[prop]);
  }
  return output;
}
//change resp. give properties to target Svgelement
function svgChgProp(target,obj) {
  for(prop in obj) {
    target.setAttribute(prop, obj[prop]);
  }
}    
function Field() {
  this.point=[];
  this.surface=document.createElement("div");
  this.surface.style.position="absolute";
  this.surface.style.left="0";
  this.surface.style.top="0"; 
  this.surface.style.height="100%";
  this.surface.style.width="100%";
  this.surface.style.backgroundColor="black";
  document.body.appendChild(this.surface);
  this.svg=new SvgElement("svg",{
    width: "100%",
    height: "100%",
    fill:"black",
    viewBox: "0 0 5000 8000"
  });
  this.surface.appendChild(this.svg);
  this.setPoint=function(amount=1) {
    for(let i=0;i<amount;i++) {
      this.point.push(new Point(Math.floor(Math.random()*1)+2500,Math.floor(Math.random()*1)+4000,4));
    this.svg.appendChild(this.point[this.point.length-1].point);
    }
  }
  this.movePoints=function() {
    this.point.forEach(element=>element.move());
  }
}   
function Point(x,y,r,mass=1) {
  this.x=x;
  this.y=y;
  this.r=r;
  this.vx=0;
  this.vy=0;
  this.vr=1;
  this.mass=mass;
  let color="";
  for(let i=0;i<=2;i++) {
    color+=Math.floor(Math.random()*255)+",";
  }
  this.point=new SvgElement("circle",{
    cx: x,
    cy: y,
    r: r,
    fill: 'rgba('+color+'1)'
  });
  this.move=function() {
    this.vx+=(Math.random()-0.5)/10;
    this.vy+=(Math.random()-0.5)/10;
    this.vr*=1+(Math.random()-0.5)/100000;
    this.x+this.vx>5000?this.x=0:this.x+this.vx<0?this.x=5000:this.x+=this.vx;
    this.y+this.vy>8000?this.y=0:this.y+this.vy<0?this.y=8000:this.y+=this.vy;
    this.r*=this.vr;
    svgChgProp(this.point,{
      cx: this.x,
      cy: this.y,
      r: this.r
    })
  }
}