var Bind = require('../util/Bind');
var FakeScroll = function($scrollTarget,scroll,speed,option){
  var windowSize  = require('../WindowSize');
  // var throttle    = require('throttle-debounce/throttle');
  this.name     = 'FakeScroll';
  this.isUpdate = true;
  this.height   = 0;
  this.position = {x:0,y:0,oldX:0,oldY:0};
  this.speed    = typeof speed == 'undefined'?0.1:speed;
  this.targetDom = $scrollTarget[0];
  var $fakeDom  = $('<figure></figure>');
  var screenSize = windowSize();
  var _this = this;
  var config = {
    isTop:true
  }
  var scroll = {y:0};
  if(option)$.extend(config,option);
  /* ************************************************************
    Setup  
  ************************************************************ */
  var contents = [];
  var ticking = false;
  function setup(){
    $('.section').each(function(){
      contents.push($(this));
    });
    
    // $fakeDom.appendTo($('body'));
    // $fakeDom.css({
      // position:'relative',
      // width:1,
      // height:$scrollTarget.outerHeight()
    // });
    // $scrollTarget.css({position:'fixed'});

    $(window).on('scroll',onScroll);
    $('body').css({height:$scrollTarget.outerHeight()});

    // this.update   = Bind(this.update,this);
    // this.update();

    $(window).on('resize',function(){
      screenSize = windowSize();
      _this.sizeUpdate();
    });
  }

  function onScroll(){
    if(!ticking){
      update();
    }
    ticking = true;
  }
  /* ************************************************************
    Rendering
  ************************************************************ */
  function update(){
    requestAnimationFrame(function(){
      scroll.y = window.pageYOffset || document.documentElement.scrollTop;
      _this.position.y += (scroll.y-_this.position.y)*_this.speed;
      _this.position.y = Number(_this.position.y.toFixed(2));
      var distance = Math.abs(_this.position.y-scroll.y);
      if(distance < .1){
        // _this.position.y = Math.floor(scroll.y);
        _this.positionUpdate();
        ticking = false;
      }else{
        update();
      }
      
      if(_this.position.y != _this.position.oldY){
        _this.positionUpdate();
      }

      _this.position.oldY = _this.position.y;
    });
  }

  this.sizeUpdate = function(){
    this.height = $scrollTarget.outerHeight();
    $('body').css({height:this.height});
    // if(config.isTop)this.height -= screenSize.height;
    // $fakeDom.css({height:this.height});
  }

  this.positionUpdate = function(){
    // $scrollTarget.css(this.translate3d(0,-this.position.y+'px',0));
    this.targetDom.style.transform ="translate3d(0px,"+(-this.position.y)+"px,0)";//this.translate3d(0,-this.position.y+'px',0);
    
    // for(var i=0; i<contents.length; i++){
    //   contents[i].css(this.translate3d(0,-this.position.y+'px',0));  
    // }
  }


  /* ************************************************************
      
  ************************************************************ */
  
  this.translate3d = function(x,y,z){
    var css3 = "translate3d("+x+","+y+","+z+")";
    return css3;
    // return {
    //   "-webkit-transform" : css3,
    //   "transform"         : css3
    // };
  }

  setup.call(this);
  return;
}
module.exports = FakeScroll;
