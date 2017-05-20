var baseCatHeight;
var baseCatLeft; //cat image css left attribute before changes made
var baseCatTopShirt; //cat image css top attribute for shirt
var baseCatTopTote; //cat image css top attribute for tote

var catImg=document.getElementById('cat-image'); //Cat image
var catType=document.getElementById('cat-select'); //Cat type (option select)
var itemImg=document.getElementById('item-image');
var itemType=document.getElementById('item-select');
var color=document.getElementById('color-select'); //item color
var xSlider=document.getElementById('cat-x-offset'); //Cat x-offset
var ySlider=document.getElementById('cat-y-offset'); //Cat y-offset
var sizeSlider=document.getElementById('cat-size'); //Cat size


/*
 * Reset form on page reload
 */
$( document ).ready(function() {

  $("#view-cat-option").click(function(){
    $("#cat-option-container").slideToggle();
  });

  xSlider.value="0";
  ySlider.value="0";
  sizeSlider.value="0";
  color.value="White";
  catImg.value="cat1";
  itemType.value="Shirt";
  setBaseCatAttributes();
});

/*
* Get dimensions of browser window
*/
function getWindowDimensions() {
  var w = window,
  d = document,
  e = d.documentElement,
  g = d.getElementsByTagName('body')[0],
  x = w.innerWidth || e.clientWidth || g.clientWidth,
  y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  return [x,y];
}

/*
* Store starting cat image position values so they can be used as a starting
* point for later transformations
*/
function setBaseCatAttributes() {
  //Calculate top, left, and height attributes of cat-image as percentages of item-img
  baseCatHeight=Math.round(catImg.height/itemImg.height*100);
  baseCatTopShirt=Math.round(parseInt($("#cat-image").css("top"))/itemImg.height*100);
  //console.log(baseCatTopShirt);
  baseCatTopTote=baseCatTopShirt+15;
  baseCatLeft=Math.round(parseInt($("#cat-image").css("left"))/itemImg.width*100);

}

/*
* Change item type
*/
function itemChange() {
  var itemImgPath = itemType.value.toLowerCase()+"s";
  itemImg.src = "img/"+itemImgPath+"/"+color.value+itemType.value+".png";
  if (itemType.value=="Tote") {
    catImg.style.top=baseCatTopTote+"%";
  }
  else if (itemType.value=="Shirt"){
    catImg.style.top=baseCatTopShirt+"%";
  }
}

/*
* Change item's color
*/
function colorChange() {
  var pos = itemImg.src.lastIndexOf("/");
  itemImg.src = itemImg.src.substring(0, pos+1)+color.value+itemType.value+".png";
}

/*
* Change cat image shown on item
*/
function catChange() {
  var pos = catImg.src.lastIndexOf("/");
  catImg.src = catImg.src.substring(0, pos+1)+catType.value+".png";
}

/*
* Resize and translate cat image
*/
function catImageUpdate(updateType)
{
  //get baseline css top value for current item type
  var baseCatTop = itemType.value=="Shirt"?baseCatTopShirt:baseCatTopTote;
  if (updateType=='s'){ //Resize
    catImg.style.height=baseCatHeight+parseInt(sizeSlider.value)+"%";
    catImg.style.top=parseInt(baseCatTop-parseInt(ySlider.value)-sizeSlider.value/2)+"%";
    catImg.style.left=parseInt(baseCatLeft+parseInt(xSlider.value)-sizeSlider.value/3)+"%";
  } else if (updateType=='y') { //vertical shift
    catImg.style.top=(baseCatTop-parseInt(ySlider.value))+"%";
  } else if (updateType=='x') { //horizontal shift
    catImg.style.left=(baseCatLeft+parseInt(xSlider.value))+"%";
  }
}
