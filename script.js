// On form submit
// Prevent the default form submit functionality
// cry. It's cathartic.
// Get the values of our selected radio buttons
// create an options array
// enter into drink type that matches variable
// loop through array for our drink type variable and...
// while looping use if statements to check for price matches...
// when match is found, push to options array
// get a random store from options array
// append that store to results section
// 	$('form').on('submit', function(e){
// 		e.preventDefault();
// 		console.log("submitted");
// 		const userDrink = $('input[name="beverage"]:checked').val();
// 		const userPrice = $('input[name="price"]:checked').val();
// 		const options = [];
// 		const drinkSpecs = drinks[userDrink];
// 		for (let i = 0; i < drinkSpecs.length; i++) {
// 			const store = drinkSpecs[i];
// 			if(store.price === userPrice) {
// 				options.push(store);
// 			}
// 		}
// 	console.log(options);
// 	const finalStore = getRandomItem(options);
// 	console.log(finalStore);
// 	$('.results').append(`<h2 class="choice">${finalStore.title}</h2>`)
// 	});
// });



const myApp = {};

myApp.bootcampCat = {
    energyLevel: 100,
    hungerLevel: 0,
    coffeeLevel: 0,
    sleepLevel: 100,
}

/*-----------System-----------------------*/ 
myApp.system = {};


myApp.ticks = 0;
myApp.seconds = 0;
myApp.minutes = 0;

myApp.updateTicks = () => {
    myApp.ticks++;
    return myApp.ticks;
    // console.log(myApp.ticks);
}

myApp.updateTime = () => {
    // const formattedTime = 21 % 60 = 21
    // String(seconds).length < 2


    if (myApp.ticks % 60 === 0 && myApp.ticks) {
        myApp.minutes += 1;
        myApp.seconds = 0;
    } else {
        myApp.seconds += 1;
    }
    if (myApp.minutes < 10 && myApp.seconds < 10) {
        $('.minutes').html(`0${myApp.minutes}`);
        $('.seconds').html(`0${myApp.seconds}`);
    } else if (myApp.minutes >= 10 && myApp.seconds >= 10) {
        $('.minutes').html(`${myApp.minutes}`);
        $('.seconds').html(`${myApp.seconds}`);
    } else if (myApp.minutes >= 10 && myApp.seconds < 10) {
        $('.minutes').html(`${myApp.minutes}`);
        $('.seconds').html(`0${myApp.seconds}`);
    } else if (myApp.minutes < 10 && myApp.seconds >= 10) {
        $('.minutes').html(`0${myApp.minutes}`);
        $('.seconds').html(`${myApp.seconds}`);
    }
    console.log(myApp.seconds, myApp.minutes);
}




myApp.updateEnergy = () => {
    if (myApp.ticks % 5 === 0) {
        myApp.bootcampCat.energyLevel -= 10;
        myApp.bootcampCat.sleepLevel += 5;
    }
    if (myApp.bootcampCat.energyLevel > 100) {
        $('.energyNumber').addClass('updatedEnergy');
    } else {
        $('.energyNumber').removeClass('updatedEnergy');
    }
    $('.energyNumber').html(`${myApp.bootcampCat.energyLevel}`);
};

myApp.start = () => {
    $('.startButton').on('click', function(){
        $('.startSection').hide();
        $('.gameSection').show();
    })
};

myApp.reset = () => {
    $('.resetButton').on('click', function(){
        myApp.ticks = 0;
        myApp.bootcampCat.energyLevel = 100;
    })
};

myApp.userUpdate = () => {
    $('button').on('click', function() {
        myApp.bootcampCat.energyLevel += 10;
        $('.energyNumber').html(`${myApp.bootcampCat.energyLevel}`);
      });
};

myApp.keywords = ['ThreatenedSwan', 'calc(30 - 3)', 'orbitz', 'Marley', 'Riley', 'pineappleJuice', 'dank', 'survivor', 'cookies', 'gityourselvesabreak', 'sonOfJson', 'zoominplz', 'JS = magic', 'undefined', 'keepitdry', 'pizza+sushi',  'projectprojectproject', 'curlyboys', 'gridouttahere', 'gitoffyourlaptop', 'conCATenation', 'horizontaloverscroll', 'flexYESfloatNO'];



myApp.update = () => {
    myApp.updateTicks();
    myApp.updateTime();
    myApp.updateEnergy();
};

myApp.getRandomKeyword = () => {
    //take a random item from the keywords array and display it
    const randomKeyword = myApp.keywords[Math.floor(Math.random() * myApp.keywords.length)];
    $('.keyword').text(`#${randomKeyword}`);
};

myApp.init = () => {
    myApp.start();
    myApp.userUpdate();
    setInterval(myApp.update, 1000);
    myApp.reset();

    setInterval(myApp.getRandomKeyword, 4000);
    // setInterval(myApp.getTime, 1000);
    // setInterval(myApp.update, 1000);
};


// const cancelCode = setInterval(ticksIncrease, 1000);
// console.log('cancelCode', cancelCode);

// setTimeout(() => {
    //     clearInterval(cancelCode);
    // }, 30000)
    
    
    // $(document).ready(function(){
        //     setInterval(test, 1000);
        // });
        
        
        // let energyLevel = 100;
        // function test(){
            //     energyLevel--;
            //     console.log(energyLevel); 
            // }
            
            // const cancelCode = setInterval(test, 1000);
            // console.log('cancelCode', cancelCode);
            
            
            
            // let energy = 100;
            // function onTimerTick() {
                //     energy--;
                //     console.log(energy);
                // }
                
                // setInterval(onTimerTick, 3000);
                
                
                // setTimeout(function() {
                    //   console.log("1000 milliseconds have elapsed");
                    // }, 1000);
        $(function() {
		    myApp.init();
		})