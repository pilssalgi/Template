(function(){
  var Util = require('../Util').Util;
  var LoadingAnimation = {
    initialized : false,
    progress:0,
    wrap:null,
    line:null,
    logo:null,
    number:null,
    paths:[],
    lines:[],
    init : function(){
      if(this.initialized)return;
      this.wrap   = $('.chr-loading');
      this.line   = this.wrap.find('.line').remove();
      this.logo   = this.wrap.find('.loading-logo img');
      this.number = this.wrap.find('.loading-number');
      // this.number.hide();
      // TweenLite.set(this.logo,{y:'-100%'});

      var _this = this;
      this.wrap.find('.mask-shape').each(function(i){
        _this.paths[i] = $(this);
        TweenLite.set($(this),{transformOrigin:'50% 50%',transformPerspective:1000});
      });

      this.wrap.find('.mask-line').each(function(i){
        var linePath = $(this),
            length = linePath[0].getTotalLength();
        var line = {
          path        : linePath,
          length      : length,
          dashOffset  : i%2==0?length:-length,
          dashArray   : length,
          progress    : 0,
          update:function(){
            var _this = this;
            TweenLite.set(this.path,{
              strokeDashoffset:this.dashOffset.toFixed(3)*_this.progress+'px',
              strokeDasharray:this.dashArray.toFixed(3)+'px ' + this.dashArray.toFixed(3)+'px'
            });
          },
          fromTo:function(from,to,dur,delay){
            var _this = this;
            this.progress = from;
            TweenLite.to(this,dur,{delay:delay,progress:to,ease:Expo.easeInOut,onUpdate:function(){
              _this.update();
            }});
          }
        }

        _this.lines[i] = line;

        line.progress = 0;
        line.update();
      });

      TweenLite.set(this.line,{width:0,x:0});
      Util.Css.addWillChange(this.wrap,'transform');
      Util.Css.addWillChange(this.line,'transform');
    },
    start : function(callBack){
      TweenLite.set([this.logo,this.number],{delay:0.1,opacity:1});
      // for(var i=0,n=this.lines.length; i<n; i++){
      //   var l = this.lines[i];
      //   l.fromTo(1,0.5,0.8,(n-1-i)*0.05);
      // }
    },
    loading : function(p){
      // for(var i=0,n=this.lines.length; i<n; i++){
      //   var l = this.lines[i];
      //   l.progress = 1-p*0.5;
      //   l.update();
      //   l.path.css({opacity:p})
      // }
      this.number.text(Math.floor(p*100)+'%');
    },

    loaded : function(callBack){
      TweenLite.set([this.logo,this.number],{delay:0.1,opacity:0});
      this.number.text('100%');

      var h = [253,254,253,282,593]
      for(var i=0,n=this.paths.length; i<n; i++){
        var p = this.paths[i],
            r = p[0].getBoundingClientRect(),
            delay = i*0.05+0.5;
        var op = {delay:delay,scale:1,z:100,opacity:0,transformOrigin:'50% 50%',ease:Quart.easeOut};
        TweenLite.to(p,0.5,op);
      }

      setTimeout(function(){
        callBack();
      },delay*1000);
      setTimeout(function(){
        // $('.chr-loading').remove();
      },delay*1000+2000);

      for(var i=0,n=this.lines.length; i<n; i++){
        var l = this.lines[i];
        l.fromTo(0,-1,0.8,(n-1-i)*0.1);
      }
    }
  };
  module.exports = LoadingAnimation;
}).call(this);