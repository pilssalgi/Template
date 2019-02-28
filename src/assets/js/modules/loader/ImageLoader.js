'use strict';

var imagesLoaded  = require('imagesLoaded');
export default class ClassName {
	constructor(){

	}

	load(loadDom){
		let loader 				= imagesLoaded(loadDom); // {background:true}
		let loadingStatus = {progress:0};
		let imageTotal 		= loader.images.length;
		let imgLoaded 		= 0;

		if(loader.images.length > 0){
			loader.on('progress',()=>{
				imgLoaded++;
				loadingStatus.progress = imgLoaded/imageTotal;
			});	
		}else{
			loadingStatus.progress = 1;
		}
		
		return loadingStatus;
	}
}