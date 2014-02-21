var app = {

    registerEvents: function() {
    var self = this;
       $(window).on('hashchange', $.proxy(this.getQId, this));
       
       // $("#welcome").submit, $.proxy(this.setID($( "input:first" ).val(), this));

           
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
    myLog : function(description, event) {
	 send =  "id="+this.userID +
	         "&d="+description +
	         "&e="+event;

	 $.post('https://saucers.cups.cs.cmu.edu/~rahunt/warnings/input.php', send);
	 console.log(this.userID + ", " + description
                    +", " +event +  
		     +  Math.round(new Date().getTime() / 1000) ) ;


    },


    // may be needed to access url of a differnt page
    getLocalPath: function(pageName)
    {
	var location = document.location.href;
	location = location.split('index.html').join(pageName);
	location = location.split(' ').join('%20');
	return location;
    },
    
    // regex to validate email
    validateEmail: function (email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if( !emailReg.test( email ) ) {
	    return false;
	} else {
	    return true;
	}
    },

    // show the privacy alert using fancybox tool
    showAlert: function (message, title) {
        this.alertShown++;
	//	$.fancybox.open([{href: 'img/privacynotice.png'}], {padding: 0});

	/*        if  (navigator.notification) {
	    navigator.notification.alert(message, null, title, 'OK');
	}
	else {
	    alert(title ? (title + ": " + message) : message);
	    }*/
	this.myLog("warning shown", "warning");
    },
    
    // randomly assign a condition
    getCondition: function(){
        var min =1;
        var max=3;       
        this.condition = Math.floor(Math.random() * (max - min + 1) + min);
        this.myLog(this.condition, "condition");
    },
    
    // if we are at beginning middle or end, check whether they should get a privacy notification based on their condition
    checkCondition: function(currentPlace) {
	this.myLog(currentPlace, "place");
        if (this.alertShown>0) {
            return;
        }
        if ((this.condition==1 && currentPlace=='begin') ||
            (this.condition==2 && currentPlace=='middle') ||
            (this.condition==3 && currentPlace=='end')
           ) {
           
            this.showAlert("Privacy notice:", "This app will share your browser history with ad networks. ");

        }

        
    },
    
    // get information about their phone for debugging
    getPhoneInfo: function() {
	this.userID= device.uuid; 
	this.myLog('Device Name: '     + device.name     +  
		   'Device PhoneGap: ' + device.phonegap + 
		   'Device Platform: ' + device.platform + 
		   'Device UUID: '     + device.uuid     + 
		   'Device Version: '  + device.version, 
		   "deviceinfo" ;

    }

    // based on the QId determine which page and question to show
      getQId: function() {
        var self = this;
        var qidMatch = /^#qid\/(\d{1,})/;
        var hash = window.location.hash;
          
       if (!hash) {
	   this.getPhoneInfo();
	   this.checkCondition('begin');
            // if we haven't clicked next, we should be on the welcome page
            $('body').html(self.welcomeTpl());
            return;
      }
       var match = hash.match(qidMatch);
       
        if (match && match.length>1 ) {
            var p = Number(match[1]);
            this.qid=p+1;
            if (p==0){
                // if we are on first qustion, store email and continue
		email =  $('#emailid').val();
		if (this.validateEmail(email) ) {
                   this.emailID=  $('#emailid').val();
		   this.myLog("email", this.emailID);
		 }
		else {
		   $('#response').html("Oops!!  That doesn't seem to be a valid email address.  Without a valid email, you won't be able to finish the study.") ;
		}
                this.checkCondition('middle');
            }
            
            this.myLog("on question " + this.qid + " of "  + this.store.totalQuestions(), "questionMatch" );
       
            // if we are on last question, we should go to thank you page
            if (this.qid > this.store.totalQuestions()) {
                this.checkCondition('end');
		this.myLog(this.qid, "finished");
                $('body').html(new ThankYouView(this.store).render().el);
                return;
            }              
             
        }
        else {
            this.myLog("error with hash not matching match: " + match + ", hash: " + hash, "error");
        }
          
        $('body').html(new HomeView(self.store, self.qid).render().el);
        
    },
    
   
    initialize: function() {
        this.alertShown=0;
        this.welcomeTpl = Handlebars.compile($("#welcome-tpl").html());
	$("a#privacynotice").fancybox();
        this.getCondition();
        this.registerEvents();
        var self = this;
        this.store = new MemoryStore(function() {
            self.getQId();
        });
        this.thankYouTpl = Handlebars.compile($("#thankyou-tpl").html());
    }

};

app.initialize();



