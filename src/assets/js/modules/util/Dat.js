const dat = require('dat.gui');
'use strict';
class Dat {
	constructor(){
		this.gui = new dat.GUI({});
		this.gui.domElement.id = 'gui';
		// this.gui.domElement.style.display = 'none';
		this.gui.close();
		if(!Dat.instance){
			Dat.instance = this;
   	}

   	return Dat.instance.gui;
	}
}

const instance = new Dat();
// Object.freeze(instance);
export default instance;
