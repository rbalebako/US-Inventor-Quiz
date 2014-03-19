var InstructionView = function(app) {
    this.initialize = function() {
	this.qid = app.qid;

    },
     
    this.render=function() {
        var self=this;
        this.el.html(InstructionView.instructionTpl(self)); 
        return this;
    },
        
    this.initialize();
 
}
 
InstructionView.privacyTpl = Handlebars.compile($("#instruction-tpl").html());
