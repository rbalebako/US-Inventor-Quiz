var PrivacyView = function(app) {
    this.initialize = function() {
	this.qid = app.qid;
        this.el = $('<div/>');
        this.el.on('click', '#exit', function(){		

		app.myLog("Exit", "Privacy Notice");
		navigator.app.exitApp();
	   });

    },
     
    this.render=function() {
        var self=this;
        this.el.html(PrivacyView.privacyTpl(self)); 
        return this;
    },
        
    this.initialize();
 
}
 
PrivacyView.privacyTpl = Handlebars.compile($("#privacynotice-tpl").html());
