var app = {

    registerEvents: function () {
	$(window).on('hashchange', $.proxy(this.getQId, this));           
	//	document.addEventListener("menubutton", onMenuKeyDown, false);
	$( "#exit" ).click(function() {
		navigator.app.exitApp();
	   });

	$( "#exitpriv" ).click(function() {
		this.myLog("Exit", "Privacy Notice");
		navigator.app.exitApp();
	   });


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
    showNotice: function(currentPlace) {
	console.log("Checking whether to show notice at "+currentPlace+ " with condition "+ this.condition);
        if (this.alertShown>0) {
            return 0;
        }
	this.myLog(currentPlace, "check condition at place");
        if ((this.condition==1 && currentPlace=='begin') ||
            (this.condition==2 && currentPlace=='middle') ||
            (this.condition==3 && currentPlace=='end')
           ) { 
	    this.alertShown++;
	    this.myLog("warning shown", "warning");
	    var self = this;
	    $('body').html(new PrivacyView(self).render().el);
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
      getQId: function() {
        var self = this;
        var qidMatch = /^#qid\/(\d{1,})/;
        var hash = window.location.hash;          
	var p=-1;

       var match = hash.match(qidMatch);
       
	if (!hash) {
	    this.qid=p;
	}
        else if (match && match.length>1 ) {
            p = Number(match[1]);
            this.qid=p+1;
            this.myLog("on question " + this.qid + " of "  + this.store.totalQuestions(), "questionMatch" );                     }
        else {
            this.myLog("error with hash not matching match: " + match + ", hash: " + hash, "error");
        }

	if (p==-1) {
	   if (!this.showNotice('begin') ) {
	       $('body').html(new WelcomeView(self).render().el);
	       return;
	   }
	} else if (p==0) {
	    this.myLog("email", this.emailID);
	    if ( this.showNotice('middle') ) {
		return;
	    }
	} else if (p>= this.store.totalQuestions()) {
	    this.myLog(this.qid, "finished");
	    if(!this.showNotice('end') ) {
		$('body').html(new ThankYouView(this.store).render().el);
	    }
	    return;
	}
	$('body').html(new HomeView(self.store, self.qid).render().el);
        
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
            self.getQId();
        });

    }

};



app.initialize();




