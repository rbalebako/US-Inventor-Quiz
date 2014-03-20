var PrivacyView = function(app) {
    this.initialize = function() {
	this.qid = app.nextPage;
        this.el = $('<div/>');
	/* this.el.on('click', '#exit', function(){		
	       		app.myLog("Exit", "Privacy Notice");

		if(navigator.app){
		    navigator.app.exitApp();
		}else if(navigator.device){
		    navigator.device.exitApp();
		}
		});*/

    },
     
    this.render=function() {
        var self=this;
        this.el.html(PrivacyView.privacyTpl(self)); 
        return this;
    },
        
    this.initialize();
 
}
 
PrivacyView.privacyTpl = Handlebars.compile($("#privacynotice-tpl").html());
