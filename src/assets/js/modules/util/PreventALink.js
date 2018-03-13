var $ = require('jQuery');
module.exports = {
  add:function(className,next){
    $(className).on('click',function(e){
      let link = $(this).attr('href');
      e.preventDefault();
      if(typeof next == 'function'){
        next(function(){
          window.location = link;
        });
      }else{
        window.location = link;
      }
      
    });
  }
}