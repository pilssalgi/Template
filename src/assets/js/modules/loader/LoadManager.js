const bind = require('lodash/Bind');
export default class ClassName {
	constructor(){
		this.isLoadOn = false;
		this.loadTasks = [];
		this.progress = 0;
		this.loadTotal = 0;
		this.loadSpeed = 0.2;
		this.loading = bind(this.loading,this);
	}

	load(_loadTasks = []){
		if(!this.isLoadOn){
			this.isLoadOn = true;
			this.loadTasks = _loadTasks;
			this.loadTotal = this.loadTasks.length;
			this.progress = 0;
			requestAnimationFrame(this.loading);
		}
	}

	loading(){
		let sumProgress = 0, totalLoaded = 0;
		for(var i=0; i<this.loadTasks.length; i++){
			sumProgress += this.loadTasks[i].progress;
		}

		totalLoaded = sumProgress / this.loadTotal;
		this.progress += (totalLoaded - this.progress) * this.loadSpeed;
		this.onLoading(this.progress);

		if(totalLoaded == 1 && this.progress > 0.99){
			this.progress = 1;
			this.isLoadOn = false;
			this.onLoading(this.progress);
			this.onLoaded();
		}

		if(this.isLoadOn){
			requestAnimationFrame(this.loading);
		}
	}


	onLoading(progress){
	}
	onLoaded(){
	}
}

// function load(loadTask=[]){
// 	return new Promise((resolve)=>{
// 		loadManager.load(loadTask);
// 		loadManager.onLoading = (p)=>{
// 			loadingUI.progress(p);
// 		}
// 		loadManager.onLoaded = ()=>{
// 			resolve();
// 		}
// 	});
// }