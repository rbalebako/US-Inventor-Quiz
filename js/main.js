var app = {

    registerEvents: function () {
	document.addEventListener("deviceready", this.onDeviceReady, false);
	$(window).on('hashchange', $.proxy(this.getHash, this));           
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
        this.myLog(this.condition, "condition");
    },
    
    // if we are at beginning middle or end, check whether they should get a privacy notification based on their condition
    showNotice: function(pageDigit) {
        if (this.alertShown>0) {
            return 0;
        }
	//	this.myLog(this.curPage + " " + pageDigit, "showNotice check");
        if ((this.condition==1 && this.curPage=='instruction') ||
            (this.condition==2 && this.curPage=='question' && pageDigit==1) ||
            (this.condition==3 && this.curPage=='thankyou')
           ) { 
	    this.alertShown++;
	    this.nextPage = this.curPage; // remember where we want to go after notice
	    this.curPage = 'notice';  // this current page is the notice
	    var self = this;
	    this.myLog(this.curPage, "notice shown"); 
	    $('body').html(new PrivacyView(self).render().el);
	    return 1;
        }        
	return 0;
    },

    //create a 15 variable long id which we hope will uniquely identify user
    makeid:function()    {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 15; i++ )
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
    },

    getHash: function() {
	var pageString = 'instruction';
	var pageDigit = 1;
        var hash = window.location.hash;	

	// if no hash use defaults above
	if (hash) {
	    // get the string after qid
	    var patternString = /^#qid\/(\w{1,})/;     
	    var wordmatchArray = hash.match(patternString);
	    
	    // is there a hashmatch?
	    if (wordmatchArray && wordmatchArray.length>1 ) {
		var wordmatch = wordmatchArray[1];	 
		var patternDigit = /(\d{1,})/;
		var digitmatchArray =  wordmatch.match(patternDigit);	    
		pageString = wordmatch;
		
	    
		// is it a digit, indicating a page number
		if (digitmatchArray && digitmatchArray.length>1) {
		    pageDigit=Number(digitmatchArray[1]);
		    pageString = 'question';
		}
	    }
	    else {
		this.myLog("Error that nothing matched hash", 'ERROR');
	    }
	}
	this.getPage(pageString, pageDigit);
     
    },



    // curPage should be the page to show now
    // we set nextPage before loading page to what we want the *next* page to be
    getPage: function(pageString, pageDigit) {    
	var self = this;       
	this.curPage = pageString;
	var textPage=0;
	
	// check whether to show notice
	if (this.showNotice(pageDigit) ) {
	    return;
	}
	if (pageString == 'notice') {
	    // reset current page if we came from a notice
	    // we deliberatily changed hash to activate hashchange when we see a notice
	    this.curPage = this.nextPage;
	    pageString = 'question';
	}    
	// if no hash we are just starting
	if (this.curPage == 'instruction') {
	    this.getPhoneInfo();
	    this.nextPage='email';
	    textPage=1;
	} 
	else if (this.curPage=='thankyou') {
	    this.nextPage='thankyou'; 
	    textPage=1;
	    this.correctText = this.store.correctAnswers + ' out of '+ this.store.totalQuestions();  // I know I'm hardcoding English into my code
	    this.myLog(this.emailID, "finished");
	    this.myLog(this.store.correctAnswers, "correct");
	}		
	else if (this.curPage=='email') {
	    this.nextPage='1'; // go to first question after this
	    textPage=1;
	}	
	else if (this.curPage=='question') {
	    this.curPage=pageDigit;
	    this.nextPage = this.curPage + 1; // add one to symbolize next page
	    //	    this.myLog("on question " + this.curPage + " of "  + this.store.totalQuestions(), "questionMatch" );         
	    if (this.curPage>= this.store.totalQuestions()) {
		// at the end of the questions
		this.nextPage='thankyou';
	    }

	}
	else {
	    this.myLog("error with hash not matching match: " + pageString + ", digit " + pageDigit, "error");
	}

	if (textPage == 1 ){
	    this.showTextPage();
	}
	else {
	    $('body').html(new HomeView(self.store, self).render().el);
	}
    },
    
    showTextPage: function() {
	var self = this;
	$('body').html(new TextView(self).render().el);	           
	return;
    },
   
    // PhoneGap is ready
    //
    getPhoneInfo: function() {
	console.log("phoneinfo", "phoneinfo");
	var deviceinfo = "not a device";
	if ( window.device) {
	    deviceinfo= ' Device Name: '     + device.name     +  
		', Device PhoneGap: ' + device.phonegap + 
		', Device Platform: ' + device.platform + 
		', Device Version: '  + device.version;
	} 
	this.myLog(deviceinfo, "device info");
    },


    initialize: function() {	
	console.log("initilize called");
        this.registerEvents();
        this.alertShown=0;
	this.userID=this.makeid();
        this.getCondition();
        var self = this;
        this.store = new MemoryStore(function() {
            self.getHash();
        });
    }

};

app.initialize();



