'use strict';

const EventEmitter = require('events');
// class EventEmitter extends EventEmitter {} 
class Emmiter {
	constructor(){
		this.emmiter = new EventEmitter();
		this.emmiter.setMaxListeners(0);

		// this.__load_start 			= "loadStart";
		// this.__load_done 			= "loadDone";
		// this.__loading 				= "loading";
	}

	on(eventName = 'eventName',fn){
		this.emmiter.on(eventName,fn);
		return {eventName:eventName,fn:fn};
	}

	emit(eventName = 'eventName',data){
		this.emmiter.emit(eventName,data);
	}

	once(eventName = 'eventName',fn){
		this.emmiter.once(eventName,fn);
	}

	off(eventName = 'eventName',fn){
		this.emmiter.removeListener(eventName,fn);
	}
}

module.exports = new Emmiter();