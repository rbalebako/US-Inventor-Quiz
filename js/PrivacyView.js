var PrivacyView = function(store) {
    this.initialize = function() {
	this.qid = self.qid;
        this.el = $('<div/>');
    
    },
     
    this.render=function() {
        var self=this;
        this.el.html(PrivacyView.privacyTpl(self)); 
        return this;
    },
    
 
        
    this.initialize();
 
}
 
PrivacyView.privacyTpl = Handlebars.compile($("#privacynotice-tpl").html());
