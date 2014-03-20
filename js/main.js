var app = {

    registerEvents: function () {
	$(window).on('hashchange', $.proxy(this.getPage, this));           
	//	document.addEventListener("menubutton", onMenuKeyDown, false);


    // Check of browser supports touch events...
	if (document.documentElement.hasOwnProperty('ontouchstart')) {
	    // ... if yes: register touch event listener to change the "selected" state of the item
	    $('body').on('touchstart', 'a', function(event) {
		    $(event.target).addClass('tappable-active');
	    });
	    $('body').on('touchend', 'a', function(event) {
		    $(event.target).removeClass('tappable-active');
	    });
	} else {
	    // ... if not: register mouse events instead
	    $('body').on('mousedown', 'a', function(event) {
		    $(event.target).addClass('tappable-active');
	    });
	    $('body').on('mouseup', 'a', function(event) {
		    $(event.target).removeClass('tappable-active');
	    });
	}	
    },


    // send a log message to php script on saucers 
    // that stores it in database          
    myLog : function (description, event) {
	var send =  "id=" + this.userID +
	"&d=" + description +
	"&e=" + event;
	var ts =  Math.round(new Date().getTime() / 1000); 

	 $.post('https://saucers.cups.cs.cmu.edu/~rahunt/warnings/input.php', send);
	 console.log(this.userID + ", " + description
		     + ", " + event + ", " +  
		     + ts );
    },

    // may be needed to access url of a differnt page
    getLocalPath: function(pageName)
    {
	var location = document.location.href;
	location = location.split('index.html').join(pageName);
	location = location.split(' ').join('%20');
	return location;
    },

    // randomly assign a condition
    getCondition: function(){
        var min =1;
        var max=3;       
	this.condition = Math.floor(Math.random() * (max - min + 1) + min);
	//	this.condition=3;
        this.myLog(this.condition, "condition");
    },
    
    // if we are at beginning middle or end, check whether they should get a privacy notification based on their condition
    showNotice: function() {
	console.log("Checking whether to show notice at "+this.curPage+ " with condition "+ this.condition);
        if (this.alertShown>0) {
            return 0;
        }
	this.myLog(this.curPage, "check condition at place");
        if ((this.condition==1 && this.curPage=='instructions') ||
            (this.condition==2 && this.curPage=='0') ||
            (this.condition==3 && this.curPage=='thankyou')
           ) { 
	    this.alertShown++;
	    this.nextPage = this.curPage;
	    this.myLog("warning shown", "warning");
	    var self = this;
	    $('body').html(new PrivacyView(self).render().el);
	    window.open('http://apache.org', '_blank', 'location=yes');
	    return 1;
        }        
	return 0;
    },
    
    // get information about their phone for debugging
    getPhoneInfo: function() {
	if (window.device) {
	    this.myLog(' Device Name: '     + device.name     +  
		       ', Device PhoneGap: ' + device.phonegap + 
		       ', Device Platform: ' + device.platform + 
		       ', Device Version: '  + device.version, 
		       "deviceinfo" );
	} 
    },

    //create a 15 variable long id which we hope will uniquely identify user
    makeid:function()    {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 15; i++ )
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
    },



    // based on the QId determine which page and question to show
    // so QId should be the page to show
    // it can be a word or digit.
    // we set QId before loading page to what we want the *next* page to be
      getPage: function() {
        var self = this;
        var hash = window.location.hash;
	var patternString = /^#qid\/(\w{1,})/;     
	var patternDigit = /(\d{1,})/;
       
	// if no hash we are just starting
	if (!hash) {
	    this.nextPage='email';
	    this.curPage = 'instructions';
	    this.showTextPage();
	    return;
	}
	var wordmatchArray = hash.match(patternString);

	// is there a hashmatch?
        if (wordmatchArray && wordmatchArray.length>1 ) {
	    var wordmatch = wordmatchArray[1];	 
	    var digitmatchArray =  wordmatch.match(patternDigit);

	    this.curPage = wordmatch;

	    // is it a digit, indicating a page number
	    if (digitmatchArray && digitmatchArray.length>1) {
		this.curPage =  Number(digitmatchArray[1]);
		this.nextPage = this.curPage + 1; // add one to symbolize next page
		this.myLog("on question " + this.nextPage + " of "  + this.store.totalQuestions(),
			   "questionMatch" );         
		if (this.curPage == 0 ) {
		    // just got email, store it 
		    this.myLog("email", this.emailID);
		}
		if (this.curPage>= this.store.totalQuestions()) {
		    // at the end of the questions
		    this.curPage='thankyou';
		    this.nextPage='thankyou';
		    this.correctText = this.store.correctAnswers + ' out of '+ this.store.totalQuestions();  // I know I'm hardcoding English into my code
		    this.totalQuest
		    this.myLog(this.curPage, "finished");
		    this.showTextPage();
		    return;
		}
		$('body').html(new HomeView(self.store, self.nextPage).render().el);
	    }
 
 	    else {
		 if (this.curPage=='instruction') {
		     this.nextPage='email'; 
		 } 
		else if (this.curPage=='email') {
		    this.nextPage=0; // go to first question after this
		}		
		else {
		    this.myLog("error with hash not matching match: " + wordmatch + ", hash: " + hash, "error");
		}
		this.showTextPage();
	    }
	}
	else {
	    console.log("hash but not hashmap found nothing matched " + hash);
	}

    },
    
    showTextPage: function() {
	console.log("show text page called with " + this.curPage );
	if (! this.showNotice() ) {
	    var self = this;
	    $('body').html(new TextView(self).render().el);	    
	}
	return;
    },
   
    initialize: function() {	
        this.alertShown=0;
	this.userID=this.makeid();
	this.myLog("Loading", "loading");
	this.getPhoneInfo();
        this.getCondition();
        this.registerEvents();
        var self = this;
        this.store = new MemoryStore(function() {
            self.getPage();
        });

    }

};



app.initialize();




