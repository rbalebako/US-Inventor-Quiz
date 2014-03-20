var ThankYouView = function(store) {
    this.initialize = function() {
        this.totalQuestions = store.totalQuestions();
        this.correctAnswers = store.correctAnswers;
	//        this.el = $('<div/>');

	/*        this.el.on('click', '#exit', function(){
		if(navigator.app){
		    navigator.app.exitApp();
		}else if(navigator.device){
		    navigator.device.exitApp();
		}

		});*/

    
    },
     
    this.render=function() {
        var self=this;
        this.el.html(ThankYouView.thankyouTpl(self)); 
        return this;
    },
    
         
    this.initialize();
 
}
 
ThankYouView.thankyouTpl = Handlebars.compile($("#thankyou-tpl").html());
