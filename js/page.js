var P;
var len=27;
var fieldR = [];
var fieldA = [];
var fieldB = [];
var int;

window.onload = function () {
       P = Raphael(0, 0, document.width, document.height, "render");
       seed();
       field();
       resume();
};

function pause() {
  clearInterval(int);
}

function resume() {
  int = setInterval(function(){update()},10);  
}

function clear() {
  for(var x=0;x<len;x++) {
    for(var y=0;y<len;y++) {
      fieldA[x][y]=false;
      fieldR[x][y].attr({"fill":"#fff","r":"14"});
    }
  }
}

function field() {
  for(var x=0;x<len;x++) {
    var r = new Array();
    for(var y=0;y<len;y++) {
      b = P.circle(16+x*26,16+y*26,12).attr({"stroke-width":"0.1","stroke-color":"#eee"}).data("x",x).data("y",y);
      r.push(b);
    }
    fieldR[x]=r;
    for(var y=0;y<len;y++) {
      fieldR[x][y].mousedown(function() {
	this.attr({"fill":"#a00"});
	fieldA[this.data("x")-1][this.data("y")] = true;
	fieldA[this.data("x")+1][this.data("y")] = true;
	fieldA[this.data("x")][this.data("y")-1] = true;
	fieldA[this.data("x")][this.data("y")+1] = true;
      });
    }
  }   
}

function seed() {
  for(var x=0;x<len;x++) {
    var r = [];
    var f1 = [];
    var f2 = [];
    for(var y=0;y<len;y++) {
      f1.push(false);
      f2.push(false);
    }
    fieldA[x]=f1;
    fieldB[x]=f2;
  } 
}

function update() {
  var c;
    for(var x=0;x<len;x++) {
      for(var y=0;y<len;y++) {
	if(fieldA[x][y]==true){fieldB[x][y]=true;}else{fieldB[x][y]=false;};
      }
    }
    
    for(var x=0;x<len;x++) {
      for(var y=0;y<len;y++) {
	  c = 0;
	  for(var ix=x-1;ix<=x+1;ix++) {
	    for(var iy=y-1;iy<=y+1;iy++) {
	      try { // INDIA
		if(fieldB[ix][iy]==true) c++;
	      } catch(e) {continue;}
	    }
	  }
	  if(fieldB[x][y]==true) c--;
	  switch (c) {
	    case 2:
 	      if(fieldB[x][y]==true){fieldA[x][y]=true;fieldR[x][y].attr({"fill":"#666"});}else{fieldA[x][y]==false;fieldR[x][y].attr({"fill":"#efefef"});};
	      break;
	    case 3:
	      fieldA[x][y]=true;
	      fieldR[x][y].attr({"fill":"#333"});
	      break;
	    default:
	      fieldA[x][y]=false;
	      fieldR[x][y].attr({"fill":"#fafafa"});
	      break;
	  }
      }
    }
}