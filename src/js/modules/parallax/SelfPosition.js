var windowSize  = require('../util/WindowSize');
var Bind        = require('../util/Bind');
var debounce    = require('lodash/debounce');

var SelfPosition = function(target){
  this.target       = target;
  this.progress     = 0;
  this.progressOld  = 0;
  this.isStageIn    = false;
  this.stageSize    = { width:0, height:0 };
  this.offset       = {left:0,top:0,width:0,height:0};
  this.rect         = {};
}


SelfPosition.prototype._setup = function(){
  this._resize = Bind(this._resize,this);
  $(window).on('resize',this._resize);
  // $(window).on('resize', debounce(this._resize, 0));
  this._resize();
  return this;
}
SelfPosition.prototype._resize = function(){
  // this.stageSize = windowSize();
  // this.rect = $(this.target).offset();//.getBoundingClientRect();
  // this.rect.height = $(this.target).height();
  // this._update();
}

SelfPosition.prototype._update = function(scrollY){
  // var y = scrollY == 'undefined'?window.pageYOffset || document.documentElement.scrollTop:scrollY;
  // var y = window.pageYOffset || document.documentElement;
  // var top = $(this.target).offset().top,
  //     h = $(this.target).height();
  // // this.progress = 1-(this.rect.top-y+this.rect.height)/(this.stageSize.height+this.rect.height);
  // this.progress = 1-(top-y+h)/(this.stageSize.height+h);
  // var dir = this.progress-this.progressOld;

  var rect = this.target.getBoundingClientRect();
  this.progress   = 1-(rect.top+rect.height)/(window.innerHeight+rect.height);
  var dir = this.progress-this.progressOld;
  if(this.progress >= 0 && this.progress <= 1){
    if(!this.isStageIn){
      this.in(dir);
    }
    this.isStageIn = true;
  }else{
    if(this.isStageIn){
      this.out(dir);
      // this._resize();
    }
    this.isStageIn = false;
  }

  this.progressOld = this.progress;
}

SelfPosition.prototype.in = function(dir){
}

SelfPosition.prototype.out = function(dir){
}

SelfPosition.prototype.constructor = SelfPosition;
module.exports = SelfPosition;
