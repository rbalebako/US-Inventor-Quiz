var HomeView = function(store, qid) {
    this.initialize = function() {
        this.qid=qid;
        var self = this;
        var correcta=store.findAnswerById(qid);
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
               // $('#footer:a').removeClass('hideButton');
                $('#nextbutton').addClass('button');
                    
        });
    },
     
    this.render=function() {
        this.el.html(HomeView.homeTpl(store.findQuestionById(this.qid))); 
        this.answers = this.el.find(".answer-list");
        this.answers.html( HomeView.answerLiTpl(            store.findAnswersByQuestion(this.qid)));
        return this;
    },
    
 
        
    this.initialize();
 
}
 
HomeView.homeTpl = Handlebars.compile($("#home-tpl").html());
HomeView.answerLiTpl = Handlebars.compile($("#answer-li-tpl").html());