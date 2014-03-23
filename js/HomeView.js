var HomeView = function(store, app) {
    this.initialize = function() {
        this.qid=app.curPage;
	this.nextPage = app.nextPage;
        var self = this;
        var correcta=store.findAnswerById(this.qid);
        //var label = $("label[for='"+correcta.id+"']");
    
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('change', 'input', function(){
                if (this.value==1 ){
                    $('#response').html("Correct!");
                    store.addCorrectAnswer();
                }
                else {
                    $('#response').html('Oops!!  The correct answer is "' +correcta.atext +'"') ;
                }
		$('#nextbutton').addClass("bigbutton");
                $('#nextbutton').removeClass("hidebutton");
        });
    },
     
    this.render=function() {
	var question = store.findQuestionById(this.qid);
	question.nextPage = this.nextPage;
        this.el.html(HomeView.homeTpl(question) ); 
        this.answers = this.el.find(".answer-list");
        this.answers.html( HomeView.answerLiTpl( store.findAnswersByQuestion(this.qid)));
        return this;
    }, 
        
    this.initialize();
 
}
 
HomeView.homeTpl = Handlebars.compile($("#home-tpl").html());
HomeView.answerLiTpl = Handlebars.compile($("#answer-li-tpl").html());