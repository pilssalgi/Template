const UA = require('./modules/info/UA')();
import ImageLoader from './modules/loader/ImageLoader';
import LoadManager from './modules/loader/LoadManager';
(function () {
	let imageLoader = new ImageLoader();
	let loadManager = new LoadManager();

  document.addEventListener("DOMContentLoaded", function(event) {
  	loadManager.load([imageLoader.load(document.body)]);

  	loadManager.onLoading = function(p){
  		console.log("p", p);
  	}
  	loadManager.onLoaded = function(){
  		console.log('loaded');
  	}
  });

  function setup(){
  }

}).call(this);