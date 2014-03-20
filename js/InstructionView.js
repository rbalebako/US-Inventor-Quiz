var TextView = function(app) {
    this.initialize = function() {
	this.curPage = app.curPage;
	this.nextPage = app.nextPage;
    },
     
    this.render=function() {
        var self=this;
        this.el.html(TextView.textTpl(self)); 
        return this;
    },
        
    this.initialize();
 
}
 
TextView.textTpl = Handlebars.compile($("#text-tpl").html());
