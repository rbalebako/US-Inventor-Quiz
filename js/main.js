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
              
    myLog : function(functionname, message1, message2) {
	 console.log(this.userID + ", " + functionname 
                    +", " +message1, + ", " + message2 
                    +  Math.round(new Date().getTime() / 1000) );  
	/* this.jslogger.log("id="+this.ID+
                    ",functionname="+functionname+
                   ",message1="+message1+
                   ",message2="+message2);
	*/     
    },
    
    
    showAlert: function (message, title) {
        this.alertShown++;

	
	if (window.showModalDialog) {
	    window.showModalDialog("warning/warning.html","name",
				   "dialogWidth:255px;dialogHeight:250px");
	} 
	else (navigator.notification) {
	    navigator.notification.alert(message, null, title, 'OK');
	} else {
	    alert(title ? (title + ": " + message) : message);
	}


	    //	    window.open('xpopupex.htm','name', 'height=255,width=250,toolbar=no,directories=no,status=no, continued from previous linemenubar=no,scrollbars=no,resizable=no ,modal=yes');
//	window.open('warning/warning.html', '_blank', 'location=yes');
	//ref.addEventListener('loadstart', function() { alert(event.url); });


    },
    
    getCondition: function(){
        var min =1;
        var max=3;       
        this.condition = Math.floor(Math.random() * (max - min + 1) + min);
        this.myLog("getCondition set " + this.condition);
    },
    
    checkCondition: function(currentPlace) {
	this.myLog("Checking condition at " + this.condition+ " " + currentPlace);
        if (this.alertShown>0) {
            return;
        }
        if ((this.condition==1 && currentPlace=='begin') ||
            (this.condition==2 && currentPlace=='middle') ||
            (this.condition==3 && currentPlace=='end')
           ) {
           
            this.showAlert("This is a placeholder for a warning.", "Data will be shared");
            this.myLog("checkCondition", "condition" + this.condition, "currentPlace " + currentPlace );
        }

        
    },
    
      getQId: function() {
        var self = this;
        var qidMatch = /^#qid\/(\d{1,})/;
        var hash = window.location.hash;
          
       if (!hash) {
                this.checkCondition('begin');
            // if we haven't clicked next, we should be on the welcome page
            $('body').html(self.welcomeTpl());
            return;
      }
       var match = hash.match(qidMatch);
       
        if (match && match.length>1 ) {
            console.log("match is "+ match[1]);
            var p = Number(match[1]);
            this.qid=p+1;
            if (p==0){
                // if we are on first qustion, store email and continue
                this.userID=  $('#emailid').val();
                this.checkCondition('middle');
            }
            
            this.myLog("getQId", "on question " + this.qid, " total question " + this.store.totalQuestions() );
       
            // if we are on last question, we should go to thank you page
            if (this.qid > this.store.totalQuestions()) {
                this.checkCondition('end');
                $('body').html(new ThankYouView(this.store).render().el);
                return;
            }  
	    //          this.checkCondition('middle');
            
             
        }
        else {
            this.myLog("getQId", "error with hash not matching ", "match: " + match + ", hash: " + hash);
        }
          
        $('body').html(new HomeView(self.store, self.qid).render().el);
        
    },
    
   
    initialize: function() {
        this.jslogger = new JSLogger({apiKey: "52b09ffe9795454604000128"});
        this.alertShown=0;
        this.welcomeTpl = Handlebars.compile($("#welcome-tpl").html());
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



