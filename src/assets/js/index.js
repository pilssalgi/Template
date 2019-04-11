import TweenLite from "gsap/TweenLite";
import CSSPlugin from 'gsap/CSSPlugin';
import EasePack from 'gsap/EasePack';

const UA = require('./modules/info/UA')();
import ImageLoader from './modules/loader/ImageLoader';
import LoadManager from './modules/loader/LoadManager';
(function () {
	let imageLoader = new ImageLoader();
	let loadManager = new LoadManager();

  document.addEventListener("DOMContentLoaded", function(event) {
  	loadManager.load([imageLoader.load(document.body),{progress:1}]);// load( [ load tasks ]) 

    console.log(TweenLite,CSSPlugin);

  	loadManager.onLoading = function(p){
  		console.log("p", p);
  	}
  	loadManager.onLoaded = function(){
  		console.log('loaded');
      setup();
  	}
  });

  function setup(){
    
  }

}).call(this);