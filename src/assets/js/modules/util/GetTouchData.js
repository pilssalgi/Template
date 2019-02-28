const UAParser  = require('ua-parser-js');
const UA        = new UAParser();
const isPC      = UA.getDevice().type == undefined?true:false;
const isMozilla = UA.getBrowser().name == 'Mozilla'?true:false;

module.exports = function(e){
  let info = {x:0, y:0}; 
  let supportTouch = 'ontouchstart' in window;
  let targetRect = {left:e.target.offsetLeft,top:e.target.offsetTop};
  if(isMozilla && isPC)supportTouch = false;
  if(supportTouch) {
    var touch;
    if (e.touches != null) {
      touch = e.touches[0];
    } else {
      touch = e.originalEvent.touches[0];
    }
    info.x = touch.clientX-targetRect.left;
    info.y = touch.clientY-targetRect.top;
  } else {
    info.x = e.clientX;
    info.y = e.clientY;
  }
  return info;
}
