
onload=function() {
  var field=new Field();
  field.setPoint(500);
  let t=setInterval(move,20);  
  function move() {
    field.movePoints();
  }
}
