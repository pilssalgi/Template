(function(){
  var Loader_Image = require('./Loader_Image');
  var Loader_Sequence = require('./Loader_Sequence');
  var LoadingAnimation = require('./LoadingAnimation');
  var UA          = require('../UA')();
  var SvgPathDraw = require('../SvgPathDraw');

  var LoadManager = function(option,frameRate,canvasNum,size){
    var _this = this;
    var LI,LS;  
    var LA = LoadingAnimation;

    var renderID = null;

    var loadNum = 3;
    var imgTotal = 907;
    var progress = 0,
        progress_step = 0;
    var isLoadedFirst = false,
        isLoadedSecond = false;

    var $loadingStatus;
    var $loadingCbg,$loadingCpg,$loadingNumber;
    var LCbg,LCpg;

    var divisionLoadCallBack;

    function setup(){
      $loadingStatus = $('#loadingStatus');
      $loadingCbg = $('#loadingCircleBg');
      $loadingCpg = $('#loadingCirclePg');
      $loadingNumber = $('.scroll-loading .loading-number');
      LCbg = new SvgPathDraw($loadingCbg);
      LCpg = new SvgPathDraw($loadingCpg);
      LA.init();
      return this;
    }

    this.start = function(){
      LA.start();
      setTimeout(function(){
        _this.load();
      },500);
    }

    this.load = function(){
      var config = {
        className:'sequence',
        firstLoadNum:1,
        total:Math.floor(imgTotal/frameRate),
        frameRate:frameRate,
        extension:'jpg',
        canvasNum:canvasNum
        ,onUpdate:function(progress){statsUpdate()}
        ,onFirstLoadComplete:function(){}
        ,onTotalLoadComplete:function(){
          TweenLite.to($loadingStatus,1,{delay:1,x:'120%',ease:Power4.easeInOut});
        }
        ,onFirstStepLoadComplete:function(){
          // console.log('firstDivision Loaded');
          LCpg.fromTo(0,1,1,0);
          LCbg.fromTo(0,1,1,.1);
          TweenLite.to($loadingNumber,1,{opacity:0});
          if(divisionLoadCallBack){
            setTimeout(function(){
              divisionLoadCallBack();
            },1000);
          }
        }
      }

      $.extend(config,option);
      LS = new Loader_Sequence($('.sequence-wrap-inner'),config,size);
      LI = new Loader_Image();
      LI.speed = 1;
      LI.load($('body'));

      renderID = requestAnimationFrame(loading);
    }

    this.divisionLoad = function(callBack){
      divisionLoadCallBack = callBack;
      LS.divisionLoad();
    }

    function loading(){
      // progress_total = LS.info.progress.total+LS.info.progress.first_step+LI.progress;
      // progress_total = LS.info.progress.first+LS.info.progress.first_step+LI.progress;

      progress = (LS.info.progress.first+LI.progress)/2;
      progress_step = LS.info.progress.first_step;

      if(progress>=1 && !isLoadedFirst){
        isLoadedFirst = true;
        LA.loaded(_this.loadAnimEnd);
        LA.loading(progress);
        LCbg.fromTo(-1,0,1,1);
        TweenLite.to($loadingNumber,1,{opacity:1,delay:1});
        _this.loaded();
      }else{
        LA.loading(progress);
      }

      if(progress_step <= 1 && !isLoadedSecond){
        $loadingNumber.text(Math.floor(progress_step*100)+'%');
        LCpg.update(progress_step-1);
        if(progress_step == 1){
          isLoadedSecond = true;
          cancelAnimationFrame(renderID);
          return;
        }
      }
      renderID = requestAnimationFrame(loading);
    }

    this.loaded = function(){}
    this.loadAnimEnd = function(){}

    this.getSequences = function(){
      return LS.images;
    }
    this.getCanvas = function(){
      return LS.canvas;
    }

    function statsUpdate(){
      $loadingStatus.html(
        'Sequence Loading Status <br>'+
        '<figure></figure>'+
        'total loaded : <span>'+LS.info.totalLoaded+' / '+Math.floor(imgTotal/frameRate)+'</span><br>'+
        'total loaded time : <span>' +LS.info.loadedTime.total+'/s </span><br>'+
        'total progress : <span>' +LS.info.progress.total+'</span><br>'+
        '<figure></figure>'+
        'first loaded : <span>'+LS.info.firstLoaded +' / '+LS.info.firstLoadNum+'</span><br>'+
        'first loaded time : <span>' +LS.info.loadedTime.first+'/s </span><br>'+
        'first progress : <span>' +LS.info.progress.first+'</span><br>'+
        '<figure></figure>'+
        'step loaded : <span>' + LS.info.stepsLoaded +'</span>'+
        '<figure></figure>'
        // 'body image + intro  : ' + progress +
        // '<figure></figure>'
      )
    }

    setup.call(this);
  }

  LoadManager.prototype.constructor = LoadManager;
  module.exports = LoadManager;
}).call(this);