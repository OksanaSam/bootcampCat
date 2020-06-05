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
    $('.energyNumber').html(`${myApp.bootcampCat.energyLevel}`);
}

myApp.reset = () => {
    if (myApp.ticks % 5 === 0) {
        myApp.bootcampCat.energyLevel -= 10;
        myApp.bootcampCat.sleepLevel += 5;
    }
}


myApp.update = () => {
    myApp.updateTicks();
    myApp.updateTime();
    myApp.updateEnergy();
}

myApp.init = () => {
    setInterval(myApp.update, 1000)
    // setInterval(myApp.ticksIncrease, 1000);
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