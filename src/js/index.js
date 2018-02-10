var $ = require('jQuery');
var Loader = require('./modules/loader/Loader');
(function () {

  $(document).ready(function(){
    init();
  	load();
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