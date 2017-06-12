var windowSize  = require('../util/WindowSize');
var Bind        = require('../util/Bind');
var SelfPosition = function(target){
  this.target       = target;
  this.progress     = 0;
  this.progressOld  = 0;
  this.isStageIn    = true;
  this.stageSize    = { width:0, height:0 };
  this.offset       = {left:0,top:0,width:0,height:0};
}


SelfPosition.prototype._setup = function(){
  this._resize = Bind(this._resize,this);
  $(window).on('_resize',this._resize);
  this._resize();
  return this;
}
SelfPosition.prototype._resize = function(){
  this._update();
}

SelfPosition.prototype._update = function(){
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