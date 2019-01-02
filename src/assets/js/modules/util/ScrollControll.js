'use strict';
const checkPassive = require('../event/CheckPassive');
class Singleton {
  constructor(){
    if(!Singleton.instance){
      Singleton.instance = this;
    }
    this.keys = {37: 1, 38: 1, 39: 1, 40: 1};
    this.eventOpt = checkPassive?{passive:false}:false;
  }

  preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;  // ie
  }

  preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      this.preventDefault(e);
      return false;
    }
  }

  disable(){
    if (window.addEventListener) // older FF
    window.addEventListener('DOMMouseScroll', this.preventDefault, false);
    window.onwheel = this.preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
    // window.ontouchmove  = preventDefault; // mobile
    document.addEventListener('touchmove', this.preventDefault, this.eventOpt);
    document.onkeydown  = this.preventDefaultForScrollKeys;
  }

  enable(){
    if (window.removeEventListener)window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    // window.ontouchmove = null;  
    document.onkeydown = null; 
    document.removeEventListener('touchmove', this.preventDefault, this.eventOpt);
  }
}

const instance = new Singleton();
// Object.freeze(instance);
export default instance;
