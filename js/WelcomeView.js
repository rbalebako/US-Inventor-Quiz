var WelcomeView = function(app) {
    this.initialize = function() {
        var self = this;

        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
	//this.el.trigger('click', "#privacynotice");
        this.el.on('keyup', '#emailid', function(){
		email =  $('#emailid').val();
		if (self.validateEmail(email) ) {
		    app.emailID=  $('#emailid').val();
		    $('#response').html("Looks good!") ;
		    $('#emailbutton').addClass("ui-shadow ui-btn ui-corner-all");
		    $('#emailbutton').removeClass("hidebutton");
		}
		else {
		    $('#response').html("That doesn't seem to be a valid email address yet.") ;
		}

	    });
    },

    
    // regex to validate email
    this.validateEmail = function(email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if( !emailReg.test( email ) ) {
	    return false;
	} else {
	    return true;
	}
    },

     
    this.render=function() {
	var self=this;
        this.el.html(WelcomeView.welcomeTpl(self)); 
        return this;
    },
    
 
        
    this.initialize();
 
}
 
WelcomeView.welcomeTpl = Handlebars.compile($("#welcome-tpl").html());