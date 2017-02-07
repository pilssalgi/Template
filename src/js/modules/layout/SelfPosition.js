var windowSize  = require('../WindowSize');
var Bind        = require('../util/Bind');
var throttle    = require('throttle-debounce/throttle');
var SelfPosition = function($dom){
  this.target     = null;
  this.targetDom  = null;
  this.isFar      = false;
  this.progress   = 0;
  this.progressOld = 0;
  this.stageSize  = { width:0, height:0 };
  this.isStageIn  = true;
  this.offset     = {left:0,top:0,width:0,height:0};
  this.option = {
    margin        : 0,
    marginTop     : 0,
    marginBottom  : 0,
    scale         : 1,
    mouseMoveInfo : null
  }

  function setup(){
  }
}


SelfPosition.prototype._setup = function($dom){
  this.target = $dom;
  this.targetDom = this.target[0];
  this.resize = Bind(this.resize,this);
  // $(window).on('resize',throttle(10,this.resize,false));
  $(window).on('resize',this.resize);
  this.resize();  
  return this;
}
SelfPosition.prototype.resize = function(){
  this.stageSize      = windowSize();
  this.offset.height  = this.target.height();
  this.offset.left    = this.target.offset().left;
  this.offset.top     = this.target.offset().top;
  // this.offset.top     = this.targetDom.clientTop;
  this._update(document.body.scrollTop || document.documentElement.scrollTop);
}

SelfPosition.prototype._update = function(scrollY){
  // if(typeof scrollY == 'undefined')scrollY = document.body.scrollTop || document.documentElement.scrollTop;
  var top     = this.targetDom.getBoundingClientRect().top,//this.offset.top-scrollY,//this.targetDom.getBoundingClientRect().top,
      height  = this.offset.height,
      dis     = Math.abs(top);
  
  if(dis < this.stageSize.height*1.5){
    // top = this.target.offset().top;
    // top = this.offset.top-scrollY;
    this.isFar = false;
  }else{
    this.isFar = true;
  }
  // console.log(this.isFar);
  // this.progress = (scrollY-top+this.stageSize.height)/(this.stageSize.height+height);
  this.progress = 1-(top+height)/(this.stageSize.height+height);
  this.progressOld = this.progress;
}

SelfPosition.prototype.constructor = SelfPosition;
module.exports = SelfPosition;