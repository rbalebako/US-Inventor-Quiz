var PrivacyView = function(app) {
    this.initialize = function() {
	this.qid = app.qid;
	console.log("this qid is " + this.qid + " and app qid is " + app.qid);
        this.el = $('<div/>');
    },
     
    this.render=function() {
        var self=this;
	console.log("qid is " + self.qid);
        this.el.html(PrivacyView.privacyTpl(self)); 
        return this;
    },
        
    this.initialize();
 
}
 
PrivacyView.privacyTpl = Handlebars.compile($("#privacynotice-tpl").html());
