var $ = require('jQuery');
module.exports = {
	eventName:'CustomerEvent',
	dispatch : function(data){
		$('body').trigger(this.eventName,data);
	},
	add : function(fn){
		$('body').on(this.eventName,function(e,data){
			fn(e,data);
		});
	}
}