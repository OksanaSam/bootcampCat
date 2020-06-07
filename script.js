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

//
myApp.prehistory = 'After several months of struggling, reading books and forums, solving tech challenges, passing personality test, overcoming self-doubt and crying next to the fridge in the middle of the night, the long-awaited email from Juno appeared in the inbox. The contents of it will seal your fate.';
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
    if (myApp.bootcampCat.energyLevel >= 150) {
        myApp.bootcampCat.energyLevel = 150;
    };
    // display energy level on the screen
    $('.energyNumber').html(`${myApp.bootcampCat.energyLevel}`);
    // call the function to check energy thresholds after user input and alert user once thresholds are met
    myApp.reactToEnergyLevel();
};

/*-----------Start / Restart / End Game----------------*/ 
myApp.startNewGame = () => {
    // add event listeners on click on respective buttons 
    if (myApp.isFirstGame) {
        $('.boost').on('click', myApp.handleBoost);
        $('.feed').on('click', myApp.handleFeed);
        $('.praise').on('click', myApp.handlePraise);
        myApp.isFirstGame = false;
        // start picking random keywords
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

// a function to end the game, which is called once the set amount of ticks elapses, isGameRunning is set to false to prevent ticks from updating
myApp.endGame = () => {
    myApp.isGameRunning = false;
    setTimeout(() => myApp.updateTime(), 1000);
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