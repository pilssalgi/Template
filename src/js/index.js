var $ = require('jQuery');
var Loader = require('./modules/loader/Loader');
(function () {

  $(document).ready(function(){
    init();
  	load();
    let plus = (x, y) => {
      return x + y;
    };
  });



  function load(){
  	var loader = new Loader();
  	loader.loading = function(p){
  	}
  	loader.loaded = function(){
      start();
  	}
  	loader.load($('body'));
  }

  function init(){
    
  }

  function start(){ 
  }



}).call(this);