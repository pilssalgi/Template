module.exports = {
	main:null,
	name:'Transition',
	initialize:false,
	init:function(){
		if(this.initialize)return this.main;
		this.initialize = true;
		this.main = new Main();
		return this.main;
	}
}

function Main(){
	// setup call once
	function setup(){

	}

	// add events
	function addEvent(){

	}


	this.init = function(){

	}

	setup.call(this);
}
Main.prototype.constructor = Main;