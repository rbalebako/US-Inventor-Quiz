var TextView = function(app) {
    this.initialize = function() {
	this.app = app;
	document.addEventListener("deviceready", this.onDeviceReady, false);
	this.curPage = app.curPage;
	this.nextPage = app.nextPage;
        this.el = $('<div/>');
        var self = this;
	if (this.curPage == 'email') {
	    this.el.on('keyup', '#emailid', function(){
		    email =  $('#emailid').val();
		    if (self.validateEmail(email) ) {
			app.emailID=  $('#emailid').val();
			$('#response').html("Looks good!") ;
			$('#emailbutton').addClass("bigbutton");
			$('#emailbutton').removeClass("hidebutton");
		    }
		    else {
			$('#response').html("That doesn't seem to be a valid email address yet.") ;
		    }
		    
		});
	    this.el.on('click', '#emailbutton', function() {
		    app.myLog("email", app.emailID);
		});
	    
	}
    },
     
    this.render=function() {
        var self=this;
	var contentHTML = 'ERROR';
        this.el.html(TextView.textTpl(self)); 
        this.content = this.el.find("#content");

	if (this.curPage == 'instruction') {
	    contentHTML = '<p>You are about to show off how much you know about inventors in US History! You will read a super-short biography of an inventor, and then select from a list of inventions.  You can use your knowledge of the inventor, of of history in general, to make your selection.</p><p>Good Luck</p> <a href="#qid/'+this.nextPage+ '"  id="nextbutton" class="halfbutton">Continue</a>';
	} 
	else if (this.curPage == 'email') {
	    contentHTML = '<p>Before we begin, please enter the your email.</p><input type="text" name="emailid" id="emailid"/><div id="responsebox"><div id="response"></div><a href="#qid/'+this.nextPage+ '" id="emailbutton" class="bigbutton hidebutton">Continue</a>';
	}
	else if (this.curPage == 'thankyou') {
	    this.correctText = app.correctText;
	    contentHTML = '<p>You got '+this.correctText +' questions correct.</p><p>Tomorrow you will recieve an email with a link to a short survey about this app.  To complete this study and receive payment, you must fill out the survey within one day of receiving the email, so fill the survey out as soon as possible.  Thank you! </p>';
	}
		this.content.html(contentHTML);
	//	self.contentHTML = contentHTML;

        return this;
    },

    // PhoneGap is ready
    //
    this.onDeviceReady = function() {
	console.log("TextViewdeviceready", "deviceready");
        deviceinfo= ' Device Name: '     + device.name     +  
		       ', Device PhoneGap: ' + device.phonegap + 
		       ', Device Platform: ' + device.platform + 
		       ', Device Version: '  + device.version, 
		       "deviceinfo" ;

	this.app.myLog(deviceinfo);
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



    this.initialize();
 
}
 
TextView.textTpl = Handlebars.compile($("#text-tpl").html());
