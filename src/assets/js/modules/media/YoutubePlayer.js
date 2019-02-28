/*
  Require
  <script>
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  </script>
*/

const assignIn = require('lodash/assignIn');
(function(){

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.append(tag);

  // window.onYouTubeIframeAPIReady = () => {
  //   this.setup();
  //   window.onYouTubeIframeAPIReady = null
  // }
  
  var YoutubePlayer = function(youtubeID,domID,width,height,ready){
    var _this       = this;
    var initialized = false,
        isReady     = false;

    this.player;
    this.config = {
      height: '640',
      width: '480',
      videoId: '',
      playerVars:{},
      events:{
        onReady: (e)=>{this.onPlayerReady(e)},
        onStateChange: (e)=>{this.onPlayerStateChange(e)}
      }
    }

    assignIn(this.config,option);

    function setup(){
      if(initialized)return;
      initialized = true;
      this.player = new YT.Player(videoContainerID, this.config);
    }

    this.onPlayerReady = function(e){
    }

    this.onPlayerStateChange = function(e){
    }

    this.play = function(){
      this.player.playVideo();
    }

    this.remove = function(){
      this.player.destroy();
    }

    this.stop = function(){
      this.player.stopVideo();
    }

    setup.call(this);
    return this;
  };
  module.exports = YoutubePlayer;
}).call(this);