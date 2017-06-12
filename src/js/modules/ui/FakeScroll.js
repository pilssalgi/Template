var Bind = require('../util/Bind');
var FakeScroll = function(target,wrap,speed,option){
  var windowSize  = require('../util/WindowSize');
  this.name     = 'FakeScroll';
  this.height   = 0;
  this.position = {x:0,y:0,oldX:0,oldY:0};
  this.speed    = typeof speed == 'undefined'?0.1:speed;
  this.target   = target;
  var $fakeDom  = $('<figure></figure>');
  var screenSize = windowSize();
  var _this = this;
  var config = {isTop:true};
  var scroll = {y:0,power:0};
  var ticking = false;
  if(option)$.extend(config,option);
  /* ************************************************************
    Setup  
  ************************************************************ */
  function setup(){
    // $(wrap).css({height:target.style.clientHeight});
    // }else{
    // }
    $(window).on('scroll',onScroll);
    target.style.position = 'fixed';
    update = Bind(update,this);

    $(window).on('resize',function(){
      screenSize = windowSize();
      _this.sizeUpdate();
    });
    _this.sizeUpdate();
  }

  function onScroll(){
    scroll.power += 100;
    scroll.y = window.pageYOffset || document.documentElement.scrollTop;
    if(!ticking){
      requestAnimationFrame(update);
    }
    ticking = true;
  }

  
  /* ************************************************************
    Rendering
  ************************************************************ */
  function update(){
    this.position.y += (scroll.y-this.position.y)*this.speed;
    this.position.y = Number(this.position.y.toFixed(1));
    // scroll.power *= 0.9;
    var dis = (scroll.y-this.position.y);
    if(dis < 1 && dis > -1){
      // this.position.y = Math.floor(this.position.y);
      this.positionUpdate();
      // scroll.power = 0;
      ticking = false;
    }else{
      requestAnimationFrame(update);
    }
    // if(this.position.y != this.position.oldY)this.positionUpdate();

    this.positionUpdate();
    this.position.oldY = this.position.y;
  }

  this.sizeUpdate = function(){
    this.height = $(this.target).height();
    $('body').css({height:this.height});
    _this.positionUpdate();
  }

  this.positionUpdate = function(){
    this.target.style.transform ="translate3d(0px,"+(-this.position.y)+"px,0)";//this.translate3d(0,-this.position.y+'px',0);
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
