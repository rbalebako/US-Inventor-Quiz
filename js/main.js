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
              
    myLog : function(description, event) {
	 send =  "id="+this.userID +
	         "&d="+description +
	         "&e="+event;

	 $.post('https://saucers.cups.cs.cmu.edu/~rahunt/warnings/input.php', send);
	 console.log(this.userID + ", " + description
                    +", " +event +  
		     +  Math.round(new Date().getTime() / 1000) ) ;


    },
    
    getLocalPath: function(pageName)
    {
	var location = document.location.href;
	location = location.split('index.html').join(pageName);
	location = location.split(' ').join('%20');
	return location;
    },
    
    showAlert: function (message, title) {
        this.alertShown++;
	$.fancybox.open([{href: 'img/privacynotice.jpg'}], {padding: 0});

	/*        if  (navigator.notification) {
	    navigator.notification.alert(message, null, title, 'OK');
	}
	else {
	    alert(title ? (title + ": " + message) : message);
	    }*/
	this.myLog("warning shown", "warning");


    },
    
    getCondition: function(){
        var min =1;
        var max=3;       
        this.condition = Math.floor(Math.random() * (max - min + 1) + min);
        this.myLog("getCondition set " + this.condition, "Condition set");
    },
    
    checkCondition: function(currentPlace) {
	this.myLog("at " + currentPlace, "paged reached");
        if (this.alertShown>0) {
            return;
        }
        if ((this.condition==1 && currentPlace=='begin') ||
            (this.condition==2 && currentPlace=='middle') ||
            (this.condition==3 && currentPlace=='end')
           ) {
           
            this.showAlert("Privacy notice:", "This app will share your browser history with ad networks. ");
	    //            this.myLog("checkCondition", "condition" + this.condition, "currentPlace " + currentPlace );
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
	console.log("hash is " + hash);
       var match = hash.match(qidMatch);
       
        if (match && match.length>1 ) {
            console.log("match is "+ match[1]);
            var p = Number(match[1]);
            this.qid=p+1;
            if (p==0){
                // if we are on first qustion, store email and continue
                this.userID=  $('#emailid').val();
		this.myLog
                this.checkCondition('middle');
            }
            
            this.myLog("on question " + this.qid + " of "  + this.store.totalQuestions(), "questionMatch" );
       
            // if we are on last question, we should go to thank you page
            if (this.qid > this.store.totalQuestions()) {
                this.checkCondition('end');
		this.myLog("reached page", "finished");
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
	//	this.privacyTpl=	 Handlebars.compile($("#privacynotice-tpl").html());
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



