'use strict';

const _bind = require('lodash/bind');
const assignIn = require('lodash/assignIn');
const throttle  = require('lodash/throttle');
const UA = require('../modules/info/UA')();
const getTouchData = require('../util/GetTouchData');
import detectPassiveEvents from 'detect-passive-events';

var $ = require('jQuery');
require('jquery-mousewheel')($);

export default class ClassName {
	constructor(dom,option){
		this.config = {
			moveTarget:null,
			friction:0.9,
			speed:1,
			bounding:0.2,
			onUpdate:()=>{}
		}

		this.freeze = false;
		this.isJump = false;
		this.isTouch = false;

		this.lastJumpData = {domHeight:0,jumpY:null};
		this.moveOffset = {x:0,y:0};
		this.moveTargetPosition = {x:0,y:0,z:0,progress:0};
		this.touchData = {
			start:{},old:{},move:{},offset:{x:0,y:0}
		}

		assignIn(this.config,option);
		if(this.config.friction <= 0)this.config.friction = 0.1;

		this.dom = dom;
		this.ticking = false;
		this.moveOffset = {x:0,y:0};

		this.setup();

		if(this.config.moveTarget){
			this.moveTargetParent = this.config.moveTarget.parentElement;

			this.moveTargetParentHeight = this.moveTargetParent.offsetHeight;
			this.moveTargetRect = this.config.moveTarget.getBoundingClientRect();

			this.onResize = _bind(this.onResize,this);
			window.addEventListener('resize',this.onResize);
			// this.onResize();
		}
	}

	setup(){
		this.onTouchStart = _bind(this.onTouchStart,this);
		this.onTouchMove = _bind(this.onTouchMove,this);
		this.onTouchEnd = _bind(this.onTouchEnd,this);
		this.render = _bind(this.render,this);
		this.onWheel = _bind(this.onWheel,this);

		if(UA.isPC){
			$(this.dom).on('mousewheel', this.onWheel);
		}else{
			if(detectPassiveEvents.hasSupport){
				this.dom.addEventListener("touchstart", this.onTouchStart,{ capture: false, passive: true });
				this.dom.addEventListener("touchmove", this.onTouchMove,{ capture: false, passive: false });
				this.dom.addEventListener("touchend", this.onTouchEnd,{ capture: false, passive: true });
			}else{
				this.dom.addEventListener("touchstart", this.onTouchStart);
			}
		}
	}

	onWheel(e){
		this.onScroll(null,e.delta,e.deltaX,e.deltaY * this.config.speed);
	}

	destroy(){
		console.log("destroy");
		if(this.config.moveTarget){
			window.removeEventListener('resize',this.onResize);
		}

		if(UA.isPC){
			$(this.dom).off('mousewheel', this.onWheel);
		}else{
			if(detectPassiveEvents.hasSupport){
				this.dom.removeEventListener("touchstart", this.onTouchStart);
				this.dom.removeEventListener("touchmove", this.onTouchMove);
				this.dom.removeEventListener("touchend", this.onTouchEnd);
			}else{
				this.dom.removeEventListener("touchstart", this.onTouchStart);
			}
		}
	}

	onResize(){
		this.moveTargetParentHeight = this.moveTargetParent.offsetHeight;
		this.moveTargetRect = this.config.moveTarget.getBoundingClientRect();

		if(this.lastJumpData.jumpY != null && this.config.moveTarget){
			let aspectHeight = (this.moveTargetRect.height)/this.lastJumpData.domHeight;
			this.moveTargetPosition.y = this.lastJumpData.jumpY * aspectHeight;
			// console.log(this.lastJumpData.domHeight,this.moveTargetParentHeight,this.moveTargetParentHeight/this.lastJumpData.domHeight);
			// console.log(this.lastJumpData.jumpY);
		}
		this.update();
	}

	onTouchStart(e){
		if(this.freeze)return;
		e.preventDefault();
		this.touchData.start = getTouchData(e);
		this.touchData.old = getTouchData(e);

		this.isTouch = true;
		this.startRender();
	}

	onTouchMove(e){
		if(this.freeze)return;
		e.preventDefault();
		this.startRender();

		this.touchData.move = getTouchData(e);

		let vf = (this.touchData.old.y-this.touchData.move.y)*this.config.speed;

		this.touchData.old.x  = this.touchData.move.x;
		this.touchData.old.y  = this.touchData.move.y;

		this.moveOffset.y += -Math.round(vf);
	}

	onTouchEnd(e){
		this.isTouch = false;	
	}


	onScroll(e, delta, deltaX, deltaY){
		if(this.freeze)return;

		if(UA.isWin){
      this.moveOffset.y += deltaY * 25;//50;
    }else if(UA.isMozilla && !UA.isWebkit){
      this.moveOffset.y += deltaY * 5;//50;
    }else{
    	this.moveOffset.y += deltaY
    }

		this.startRender();
	}

	startRender(){
		if(!this.ticking){
      requestAnimationFrame(this.render);
    }
    this.ticking = true;
	}

	render(){
		this.moveOffset.y *= this.config.friction;
		if(Math.abs(this.moveOffset.y) < 0.1 && !this.isJump){
			this.ticking = false;
			this.moveOffset.y = 0;
		}else{
			requestAnimationFrame(this.render);
		}

		this.update();
	}

	update(){
		if(this.config.moveTarget){
			this.moveTarget();
		}
		this.config.onUpdate();
		// this.render();
	}

	moveTarget(){
		let p = this.moveTargetPosition;
		let max = this.moveTargetRect.height-this.moveTargetParentHeight;
		p.y += this.moveOffset.y;
		if(p.y > 0)p.y +=-p.y*this.config.bounding;
		if(p.y < -max)p.y += (-max-p.y)*this.config.bounding;
		this.translate3d(this.config.moveTarget,p.x+'px',p.y+'px',p.z);	
		p.progress = -p.y / max;
	}

	moveTo(y,option={duration:1,ease:Power4.easeInOut,onComplete:()=>{}}){
		TweenLite.to(this.moveTargetPosition,option.duration,{y:y,ease:option.ease,
			onStart:()=>{
				this.isJump = true;
				this.lastJumpData.jumpY = y;
				this.lastJumpData.domHeight = this.moveTargetRect.height;
				this.startRender();
			},
			onComplete:()=>{
				this.isJump = false;
				this.update();
				if(option.onComplete)option.onComplete();
			}
		});
	}

	translate3d(dom,x,y,z){
	  dom.style.transform = "translate3d("+x+","+y+","+z+"px)";
	}
}