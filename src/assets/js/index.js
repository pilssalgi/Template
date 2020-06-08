import {TweenLite,CSSPlugin,EasePack} from "gsap";

const UA = require('./modules/info/UA')();
import ImageLoader from '~/modules/loader/ImageLoader';
import LoadManager from '~/modules/loader/LoadManager';
(function () {
	let imageLoader = new ImageLoader();
	let loadManager = new LoadManager();

	loadManager.load([imageLoader.load(document.body),{progress:1}]);// load( [ load tasks ]) 
	// loadManager.onLoading = function(progress){
	// }
	loadManager.onLoaded = function(){
		setup();
	}

  function setup(){
  }
}).call(this);