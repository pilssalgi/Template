var SelfPosition = require('./SelfPosition');
var StageInOut = function($dom,option){
  // this.target = $dom[0];
  this.isIn = false;
  $dom.css({backgroundColor:"#ff0000"});
  var config = {
    offsetIn:0,
    offsetOut:0
  }

  $.extend(config,option);

  function setup(){
    this.__proto__ = new SelfPosition($dom[0]);
    return this;
  }

  this.update = function(){
    this._update();
    console.log(this.progress);
    // var rect = this.target.getBoundingClientRect();
    // console.log(1-(rect.top+rect.height)/(window.innerHeight+rect.height));

    if(this.progress > config.offsetIn && this.progress < 1-config.offsetIn){
      if(!this.isIn){
        this.in(this.direct<0?-1:1);
        this.isIn = true;
      }
    }

    if(this.progress < -config.offsetOut || this.progress > 1+config.offsetOut){
      if(this.isIn){
        this.out(this.direct<0?-1:1);
        this.isIn = false;
      }
    }

  }

  this.in = function(){
    console.log('in');
  }
  this.out = function(){
    console.log('out');
  }

  setup.call(this);
}
StageInOut.prototype.constructor = StageInOut;
module.exports = StageInOut;