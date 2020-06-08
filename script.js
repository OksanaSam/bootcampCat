/*-----------Namespacing-----------------------*/ 
const myApp = {};

/*-----------Bootcamp Cat Object---------------*/ 
myApp.bootcampCat = {};

/*-----------System Parameters----------------*/ 
// default game time is set to 5 minutes (1 tick is equal to approx. 1 second)
myApp.ticks = 300;
// system variables 
myApp.isGameRunning = false;
// variable defining if it is the first game
myApp.isFirstGame = true;
// variable defining if messages are updating
myApp.isMessageFrozen = false;

// text to be gradually appended to the welcome page 
myApp.prehistory = 'Months of struggling, reading books and forums, solving tech challenges, passing a personality test, overcoming self-doubt and crying next to the fridge in the middle of the night, and a long-awaited email from Juno lands in the inbox. Its contents will be life-changing.';
// cancel code for clearing interval for appearing text on welcome page  
myApp.cancelPrehistoryCode;

// create an array of funny keywords related to our cohort to be randomly dispayed on screen
myApp.keywords = ['ThreatenedSwan', 'calc(30 - 3)', 'orbitz', 'Marley', 'Riley', 'pineappleJuice', 'dank', 'survivor', 'cookies', 'gityourselvesabreak', 'sonOfJson', 'zoominplz', 'JS = magic', 'undefined', 'keepitdry', 'pizza+sushi',  'projectprojectproject', 'curlyboys', 'gridouttahere', 'gitoffyourlaptop', 'conCATenation', 'horizontaloverscroll', 'flexYESfloatNO'];

/*-----------Helper Functions----------------*/ 
// a function to reset bootcamp cat object every time user starts a new game in order to keep the default property values 
myApp.resetBootcampCat = () => {
    myApp.bootcampCat = {
        energyLevel: 100,
        hungerLevel: 0,
        sleepLevel: 100,
    };
};

// making the text gradually appear on the welcome screen
myApp.showPrehistory = () => {
    // myApp.prehistory
    const prehistoryText = $('#prehistory').text();
    if (prehistoryText.length + 1 <= myApp.prehistory.length) {
        const newParticle = myApp.prehistory.slice(0, prehistoryText.length + 1);
        $('#prehistory').text(newParticle);
    } else {
        clearInterval(myApp.cancelPrehistoryCode);
    }
}

// creating a function to format time from numbers to strings allowing for zeros to appear before digits
myApp.formatTime = (int) => {
    const tempString = String(int);
    return tempString.length !== 1 ? tempString : `0${tempString}`;
};

// taking a random item from the keywords array and displaying it on screen (this function will be called in init with setinterval and will run every 4 seconds)
myApp.getRandomKeyword = () => {
    if (!myApp.isGameRunning) return;
    const randomKeyword = myApp.keywords[Math.floor(Math.random() * myApp.keywords.length)];
    $('.randomKeyword').text(`#${randomKeyword}`);
};

/*-----------Status Updates----------------*/ 
// calculating time out of ticks and updating UI
myApp.updateTime = () => {
    const seconds = myApp.ticks % 60;
    const minutes = (myApp.ticks - seconds) / 60;
    // formatting seconds and minutes and displaying them on screen 
    const strSeconds = myApp.formatTime(seconds);
    const strMinutes = myApp.formatTime(minutes);
    $('.minutes').html(strMinutes);
    $('.seconds').html(strSeconds);
};

// updating ticks only if isGameRunning variable is set to true (it is set to true once the user clicks to start or restart the game)
myApp.updateTicks = () => {
    if (myApp.isGameRunning) {
       myApp.ticks -= 1;
    };
    // if ticks run below zero, game ends automatically
    if (myApp.ticks <= 0) {
        myApp.endGame();
    };
};

// a function to update energy and display it on the screen
myApp.updateEnergy = () => {
    // energy is automatically decreasing by 10 points every 5 seconds 
    if (myApp.ticks % 5 === 0 && myApp.ticks !== 300) {
        myApp.bootcampCat.energyLevel -= 10;
        myApp.bootcampCat.sleepLevel += 5;
    }
    // once the energy level is hitting zero, set it to equal zero   
    if (myApp.bootcampCat.energyLevel < 0) {
        myApp.bootcampCat.energyLevel = 0;
    };
    // displaying the energy level on screen  
    $('.energyNumber').html(`${myApp.bootcampCat.energyLevel}`);
};

// a function to update video based on energy and hunger level
myApp.updateVideo = () => {
    if (!myApp.isGameRunning || myApp.isMessageFrozen) return;
    if (myApp.bootcampCat.energyLevel > 100) {
        $('.appendedMessage').html(`Coffee Junkie`);
    } else if (myApp.bootcampCat.energyLevel >= 80 && myApp.bootcampCat.hungerLevel <= 30) {
        $('.appendedMessage').html(`Cat is productive and efficient`);
    } else if (myApp.bootcampCat.energyLevel < 80 && myApp.bootcampCat.energyLevel >= 50) {
        $('.appendedMessage').html(`Cat might need some coffee to stay active`);
    } else if (myApp.bootcampCat.energyLevel > 20 ) {
        $('.appendedMessage').html('Cat really needs some boost of energy');
    } else {
        $('.appendedMessage').html(`Cat's energy is critically low, it cannot study`);
    }
};



// a function to update hunger level and display it on the screen
myApp.updateHunger = () => {
    // the hunger level is automatically increasing by 10 points every 10 seconds 
    if (myApp.ticks % 10 === 0 && myApp.ticks !== 300) {
        myApp.bootcampCat.hungerLevel += 10;
    }
    // once the hunger level is hitting 100, prevent it from going above 100   
    if (myApp.bootcampCat.hungerLevel >= 100) {
        myApp.bootcampCat.hungerLevel = 100;
    };
    // displaying the hunger level on screen  
    $('.hungerNumber').html(`${myApp.bootcampCat.hungerLevel}`);
};

// a function to check lower und upper energy thresholds and add relevant classes to alert user once thresholds are met
myApp.reactToEnergyLevel = () => {
    // once the energy level is hitting 20 or lower, make it blink on screen by adding a corresponding class
    if (myApp.bootcampCat.energyLevel <= 20) {
        $('.energyNumber').addClass('blinking');
    // if it does not meet the above condition, remove the added class
    } else {
        $('.energyNumber').removeClass('blinking');
    };
    // once the energy level is going above 100, make it red on screen by adding a corresponding class
    if (myApp.bootcampCat.energyLevel > 100) {
        $('.energyNumber').addClass('updatedEnergy');
    // if it does not meet the above condition, remove the added class
    } else {
        $('.energyNumber').removeClass('updatedEnergy');
    };
};

// a function to update time, ticks, and energy and react if energy thresholds are met
myApp.update = () => {
    // run the function only if the isGameRunning variable is set to true (it is set to true once the user clicks to start or restart the game), otherwise exit the function
    if (!myApp.isGameRunning) return;
    myApp.updateTime();
    myApp.updateEnergy();
    myApp.updateHunger();
    myApp.updateTicks();
    myApp.reactToEnergyLevel();
    myApp.updateVideo();
};

/*-----------Event Listeners on Buttons----------------*/
// a function to update energy level based on user interaction 
myApp.handleBoost = () => {
    if (!myApp.isGameRunning) return;

    // increse the energy level by 10 points based on user input
    myApp.bootcampCat.energyLevel += 10;
    // prevent the energy level from going above 150
    if (myApp.bootcampCat.energyLevel >= 150) {
        myApp.bootcampCat.energyLevel = 150;
    };
    // display energy level on the screen
    $('.energyNumber').html(`${myApp.bootcampCat.energyLevel}`);
    // call the function to check energy thresholds after user input and alert user once thresholds are met
    myApp.reactToEnergyLevel();
};

// a function to update hunger level based on user interaction 
myApp.handleFeed = () => {
    if (!myApp.isGameRunning) return;

    // decrese the hunger level by 10 points if user clicks the Feed button
    myApp.bootcampCat.hungerLevel -= 10;
    // prevent the hunger level from going below 0
    if (myApp.bootcampCat.hungerLevel <= 0) {
        myApp.bootcampCat.hungerLevel = 0;
    };
    // display hunger level on the screen
    $('.hungerNumber').html(`${myApp.bootcampCat.hungerLevel}`);
    // call the function to check hunger thresholds after user input and alert user once thresholds are met
};

// a function to update the energy level based on user interaction 
myApp.handlePraise = () => {
    if (!myApp.isGameRunning) return;

    // increse the energy level by 10 points if user clicks the Praise button
    myApp.bootcampCat.energyLevel += 10;
    // prevent the energy level from going above 150
    if (myApp.bootcampCat.energyLevel >= 100) {
        myApp.bootcampCat.energyLevel = 100;
    };
    // display energy level on the screen
    $('.energyNumber').html(`${myApp.bootcampCat.energyLevel}`);
    // call the function to check energy thresholds after user input and alert user once thresholds are met
    myApp.reactToEnergyLevel();
};

/*-----------Start / Restart / End Game----------------*/ 
myApp.startNewGame = () => {
    $('.catImage').html(`<div class="tenor-gif-embed" data-postid="13203096" data-share-method="host" data-width="100%" data-aspect-ratio="1.4035087719298245"><a href="https://tenor.com/view/typing-cat-neko-lolyinthesky-gif-13203096">Typing Cat GIF</a> from <a href="https://tenor.com/search/typing-gifs">Typing GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>`);
    // add event listeners on click on respective buttons 
    if (myApp.isFirstGame) {
        $('.boost').on('click', myApp.handleBoost);
        $('.feed').on('click', myApp.handleFeed);
        $('.praise').on('click', myApp.handlePraise);
        $('.sleep').on('click', myApp.handleSleep);
        myApp.isFirstGame = false;
        // start picking random keywords every 4 seconds
        setInterval(myApp.getRandomKeyword, 4000);
    };
    // once the user clicks to start or restart the game, variable is set to true which is triggering the ticks update above)
    myApp.isGameRunning = true;
    // user is given 5 minutes to play
    myApp.ticks = 300;
    // reset bootcamp cat object every time user starts a new game 
    myApp.resetBootcampCat();
    // once user starts the game, the button text is changed from 'start' to 'restart' 
    $('.resetButton').text('Restart');
    myApp.updateTime();
    myApp.updateEnergy();
    myApp.updateHunger();
};

myApp.handleSleep = () => {
    if (!myApp.isGameRunning || $('.sleep').hasClass('disabled')) return;
    
    myApp.isMessageFrozen = true;
    $('.appendedMessage').html(`Are you kidding me? Is it even legal during the bootcamp?`);
    $('.sleep').addClass('disabled');
    setTimeout(() => {
        myApp.isMessageFrozen = false;
    }, 3000);
}

// a function to end the game, which is called once the set amount of ticks elapses, isGameRunning is set to false to prevent ticks from updating
myApp.endGame = () => {
    myApp.isGameRunning = false;
    setTimeout(() => myApp.updateTime(), 1000);
    $('.catImage').html(`<img src="assets/noun_Cat calculator_232259.png" alt="A cat typing on its laptop, a representation of a developer cat">`);
    $('.appendedMessage').html(`Congrats! You made it through! Assignment is finished and pushed to GitHub. Time for a celebratory cat treat and up to #bootcamp-help.`);
};

/*-----------Init Function----------------*/ 
myApp.init = () => {
    myApp.cancelPrehistoryCode = setInterval(myApp.showPrehistory, 30);
     // add an event listener to come to the game screen and enable the game start
    $('.buttonDown').on('click', function(){
        // clear interval for appearing text on welcome page with cancel code 
        clearInterval(myApp.cancelPrehistoryCode);
        // transition to game screen
        $('.welcomePage').slideUp('slow');
        $('.gamePage').show().slideDown('slow');
        // run the update function every second 
        setInterval(myApp.update, 1000);
        // add an event listener to the start button to start or restart the game
        $('.resetButton').on('click', myApp.startNewGame);
    });
};
 
// document ready: once the page has loaded, call the init function
$(function() {
    myApp.init();
})