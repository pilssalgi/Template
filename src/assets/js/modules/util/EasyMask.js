/**
* 2016.05
* easemask ver 0.1.2
* Author : Heonwongeun
* FaceBook : https://www.facebook.com/heo.wongeun
* 
*/
const assignIn = require('lodash/assignIn');
(function(){
  var EasyMask = function(elem,options){
    var _this = this;
    var config = {
      align       : "L",
      x           : 0,
      y           : 0,
      width       : 0,
      height      : 0,
      delay       : 0,
      ease        : "easeInOutQuint",
      name        : ''
    };

    assignIn(config,options);
    config.align = config.align.toUpperCase();
    var size    = { w:0, h:0 },
        offset  = { w:0, h:0, x:0, y:0 },
        clip    = { top:0, right:0, bottom:0, left:0 };


    function init(){
      this.mask();
      this.addEvent();
    }

    function resize(){
      _this.mask();
    }

    function sizeUpadate(){
      size.w    = elem.offsetWidth;
      size.h    = elem.offsetHeight;
      offset.w  = sizeUnitChange(config.width, size.w);
      offset.h  = sizeUnitChange(config.height, size.h);
      offset.x  = sizeUnitChange(config.x, size.w);
      offset.y  = sizeUnitChange(config.y, size.h);
    }

    this.addEvent = function(){
      window.addEventListener('resize',resize);
    }

    this.remove = function(){
      window.removeEventListener('resize',resize);
    }

    this.update = function(option){
      this.mask(option);
    }

    this.mask = function(option){
      if(option)assignIn(config,option);
      sizeUpadate();
      clip.top    = offset.y;
      clip.right  = offset.w+offset.x;
      clip.bottom = offset.h+offset.y;
      clip.left   = offset.x;

      var rect = "rect("+ clip.top +"px "+ clip.right +"px "+ clip.bottom +'px ' + clip.left+'px)';
      elem.style.clip = rect;
    }

    /* ************************************************************
      Formula
    ************************************************************ */
    
    function sizeUnitChange(value,originalsize){
      var num = value;
      if(typeof value == "string"){
        if(value.indexOf("%") > -1){
          num = Number(value.replace("%",""));
          num = originalsize*num/100;
        }else{
          num = Number(value.replace("px",""));
        }
      }
      return num;
    }


    function clipApply(rect){
      elem.style.clip = rect;
    }

    function changeToRect(p){
      if(p.w > size.w)p.w = size.w;
      if(p.h > size.h)p.h = size.h;
      if(p.x < 0)p.x = 0;
      if(p.y < 0)p.y = 0;
      var rect = "rect("+
                Math.round(p.y) +"px "+ 
                Math.round(p.x+p.w)  +"px "+
                Math.round(p.y+p.h) +"px "+
                Math.round(p.x) +"px)";
      return rect;
    }

    function changeToPosition(rect){
      var newRect = rect.substring(5,rect.length-1),
          infos   = newRect.split(" ");
      if(infos.length < 4)infos = newRect.split(",")
      for(var i=0; i<4; i++){
          infos[i] = infos[i].replace(",","");
      }

      var p = {
          w : Number(infos[1].replace("px","")),
          h : Number(infos[2].replace("px","")),
          x : Number(infos[3].replace("px","")),
          y : Number(infos[0].replace("px",""))
      }
      p.w -= p.x; p.h -= p.y;

      return p;
    }   
    init.call(this);
    return this;
  }

  EasyMask.prototype.constructor = EasyMask;
  module.exports = EasyMask; 
}).call()

