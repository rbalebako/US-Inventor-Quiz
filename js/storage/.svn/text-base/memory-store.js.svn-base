var MemoryStore = function(successCallback, errorCallback) {

   this.findQuestionById = function(id) {
        var questions = this.questions;
        var a = null;
        var l = questions.length;
       console.log("will look for " + id);
        for (var i=0; i < l; i++) {
            if (questions[i].id === id) {
                a = questions[i];
                console.log('found question at ' + i + a);
                break;
            }
        }
        return a;
    }
   
   this.shuffle = function (array) {
      var currentIndex = array.length
        , temporaryValue
        , randomIndex
        ;
    
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    }

    
    this.findAnswersByQuestion = function(qid, callback) {
        var answers = this.answers.filter(function(element) {
            return element.qid == qid;
        });
        return this.shuffle(answers);
    }

    
    this.addCorrectAnswer = function() {
        this.correctAnswers++;
    }
    
    this.totalQuestions= function() {
        return this.questions.length;
    }
    
    this.findAnswerById = function(id) {
        var answers = this.answers.filter(function(element) {
            return element.id == id;
        });
        return answers[0];
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

    this.questions = [
            {"id": 1, "qtext": "Elijah McCoy (1843-1929) was credited for over 50 inventions during his productive career.   One was:", "qimage": "quiz-EJMcCoy-th.jpg", "answer":1},
            {"id": 2, "qtext": "Granville T. Woods (1856-1910) registered more than 60 patents in his lifetime. One of his most famous inventions was:", "qimage": "quiz-GranvilleTWoods-th.jpg", "answer":2},
            {"id": 3, "qtext": " Lewis Latimer (1848-1928). Co-working with science greats Alexander Graham Bell and Thomas Edison in their laboratories, Latimer's famous contribution was: ", "qimage": "quiz-Lewis-Howard-Latimer-th.jpg", "answer":3},
            {"id": 4, "qtext": "George Washington Carver (1860-1943)", "qimage": "quiz-George-Washington-Carver-th.jpg", "answer":4},
            {"id": 5, "qtext": "Garrett Morgan (1877-1963) created a safety hood to protect firefighters from the smoke they inhaled.  Additionally he invented and patented the first:", "qimage": "quiz-Garrett-A-Morgan-th.jpg", "answer":5},  
            {"id": 7, "qtext": "Patricia E Bath (1949-Present) is an opthamologist and inventor, as well as the founder of the American Institute for the Prevention of Blindness", "qimage": "quiz-patriciaebath-th.jpg", "answer":7},
            {"id": 8, "qtext": "Charles R Drew (1904-1950) had a lengthy research and teaching career and became a chief surgeon. He invented: ", "qimage": "quiz-Charles-Drew-th.png", "answer":8},
            {"id": 9, "qtext": "Lonnie G. Johnson (1949-Present) was part of Strategic Air Command in the Air Force. He was a systems engineer for the Galileo mission to Jupiter and the Cassini mission to Saturn. His famous invention, which he developed in his spare time was: ", "qimage": "quiz-Lonnie-G-Johnson-th.jpg", "answer":9},
            {"id": 10, "qtext": "Madame C. J. Walker (1867-1919) was the first African-American female millionaire. Her business included products she invented such as:", "qimage": "quiz-Madame-CJ-Walker-th.png", "answer":10},
            {"id": 11, "qtext": "Otis Boykin (1920-1982) invented more than 25 electronic devices before he died of a heart failure. One of the most devices was famous was:", "qimage": "quiz-otisboykin1-th.jpg", "answer":11},
            {"id": 6, "qtext": "Valerie L. Thomas was a mathematician and data analyst for NASA.  Among her other contributions, she", "qimage": "quiz-ValerieLThomas-th.gif", "answer":11}
        
        ];

        this.answers = [
        {"id": 1, "atext": "a cup that feeds lubricating oil onto moving parts of steam engines - vital in avoiding sticking to the track", "qid": 1, "correct":1},   
        {"id": 101, "atext": "the first steam locomotive", "qid": 1, "correct": 0},   
        {"id": 102, "atext": "self-cleaning windows", "qid": 1, "correct": 0},   
        {"id": 103, "atext": "bottled beer", "qid": 1, "correct": 0},   
        {"id": 2, "atext": "a system for letting the engineer of a train know how close his train was to others.", "qid": 2, "correct":1},        
        {"id": 201, "atext": "the stethocope.", "qid": 2, "correct": 0}, 
        {"id": 202, "atext": "the first computer compiler", "qid": 2, "correct": 0},  
        {"id": 203, "atext": "the iPhone", "qid": 2, "correct": 0},  
        {"id": 3, "atext": "the carbon filament. A vital component of the light bulb, this piece of metal features in many modern day filament lamps.", "qid": 3, "correct":1},   
        {"id": 301, "atext": "braille printing for the blind", "qid": 3, "correct": 0},    
        {"id": 302, "atext": "Nailless horseshoe", "qid": 3, "correct": 0},    
        {"id": 303, "atext": "chocolate milk", "qid": 3, "correct": 0},    
        {"id": 4, "atext": "peanut butter", "qid":4, "correct":1},     
        {"id": 401, "atext": "the mercury thermometer.", "qid":4, "correct": 0}, 
        {"id": 402, "atext": "the air conditioner", "qid":4, "correct": 0}, 
        {"id": 403, "atext": "Java Log: a log for your fireplace made from used coffee grinds", "qid":4, "correct": 0}, 
        {"id": 5, "atext": "traffic signal", "qid": 5, "correct":1}, 
        {"id": 501, "atext": "fire extinguisher", "qid":5, "correct": 0}, 
        {"id": 502, "atext": "manned airplane", "qid":5, "correct": 0}, 
        {"id": 503, "atext": "sewing machine", "qid":5, "correct": 0}, 
                 
      
        {"id": 7, "atext": "a device for cataract surgery known as the Laserphaco Probe.", "qid":7, "correct":1},    
        {"id": 701, "atext": "flush toilet", "qid":7, "correct": 0}, 
       {"id": 702, "atext": "windshield wipers", "qid":7, "correct": 0}, 
        {"id": 703, "atext": "microwave oven", "qid":7, "correct": 0}, 
        {"id": 8, "atext": "developed ways to process and store blood plasma in 'blood banks.'", "qid":8, "correct":1},       
        {"id": 801, "atext": "bi-focal eyeglasses", "qid":8, "correct": 0}, 
        {"id": 802, "atext": "cornflakes", "qid":8, "correct": 0}, 
        {"id": 803, "atext": "the car radio", "qid":8, "correct": 0}, 
        {"id": 9, "atext": "Super Soaker water gun toy", "qid": 9, "correct":1}, 
        {"id": 901, "atext": "submarine", "qid":9, "correct": 0}, 
        {"id": 902, "atext": "tattoo machine", "qid":9, "correct": 0}, 
        {"id": 903, "atext": "printing press", "qid":9, "correct": 0}, 
        {"id": 10, "atext": "hair-growing lotion", "qid": 10, "correct":1}, 
        {"id": 1001, "atext": "parachute", "qid": 10, "correct": 0}, 
       {"id": 1002, "atext": "bifocals", "qid": 10, "correct": 0}, 
        {"id": 1003, "atext": "lightening rod", "qid": 10, "correct": 0}, 
        {"id": 11, "atext": "a control unit for the artificial heart pacemaker", "qid": 11, "correct":1},
        {"id": 1101, "atext": "smallpox vaccination", "qid": 11, "correct": 0}, 
           {"id": 1102, "atext": "Acceleglove, a glove that can translate sign language into speech", "qid": 11, "correct": 0},
               {"id": 1103, "atext": "the yo-yo", "qid": 11, "correct": 0},         
        {"id": 6, "atext": "received a patent for an illusion transmitter, which uses a concave mirror to produce optical illusion images.", "qid": 6, "correct":1},
        {"id": 601, "atext": "devised a method of using punchcards to calculate Bernoulli numbers", "qid": 6, "correct": 0}, 
        {"id": 602, "atext": "guillotine", "qid": 6, "correct": 0}, 
            {"id": 603, "atext": "an odometer for postal service carriages", "qid": 6, "correct": 0}, 
    ];
            
 /*             {"id": 6, "atext": "TODO", "qid": 6, "correct":1},  
        {"id": 601, "atext": "the piano", "qid": 6, "correct": 0}, 
        {"id": 602, "atext": "neon light", "qid": 6, "correct": 0}, 
        {"id": 603, "atext": "notebooks with spiral binding", "qid": 6, "correct": 0}, */
        
    this.bib = [
        { "id": 1, "url": "http://www.teach-nology.com/teachers/lesson_plans/history/us_history/blackhistory/10inventors.html", "title": "teach-nology.com"},
        {"id": 2, "url": "http://www.teach-nology.com/teachers/lesson_plans/history/us_history/blackhistory/10inventors.html", "title": "teach-nology.com"}    
    ];
    
    this.correctAnswers = 0;
    callLater(successCallback);

}