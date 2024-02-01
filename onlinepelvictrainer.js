// steps:
// 1. click start button - done
// 2. get squeezeTimer to start counting from the number of seconds written in squeeze input
// 3. get relaxTimer to start counting from teh umber of seconds wrriten in relax input
// 4. get squeeze timer and relax timer to continue to repeat for the number of reps written in repetition time
// 5. end with a prompt that says "Good work on completing your pelvic floor exercises! See you for the next round!"

// other things taht can be done - button for set time squeeze/ relax/ rept time


const startBtn = document.querySelector('.start-button');
const squeezeTime = document.querySelector('#squeeze-number')
const relaxTime = document.querySelector('#relax-number')
const repetitions = document.querySelector('#rep-number')
const squeezeBtn = document.querySelector('.squeeze-btn')
const relaxBtn = document.querySelector('.relax-btn')
const repetitionBtn = document.querySelector('.repetitions-btn')
const transitionBar = document.querySelector('.timer-bar')
const transitionBarProgress = document.querySelector('.timer-bar-progress')
const timeSpan = document.querySelector('.time')
const smallBookmark = document.querySelector('.small-bookmark')
const bookmarkDisplay = document.querySelector('.bookmark-content')
const clickAway = document.querySelector('body')
const modalDisplay = document.querySelector('.end-function-modal')
const closeRefreshPage = document.querySelector('.close-btn')
const overlay = document.querySelector('.overlay')

let currentIteration = 0;
let totalIterations;

// 1. press start to start the whole cycle
startBtn.addEventListener("click", startCycle); 

function startCycle() {
	RepeatTheSet();
}

function RepeatTheSet () {
	const repeatCounter = repetitions.value;
	console.log("repeat counter: " + repeatCounter)
	totalIterations = repeatCounter; 
	// changed to totalIterations - into a global variable
	runSequence();
}

let argumentFunction1 = function () {
	console.log("NumberUp callback");
	numbersUp(argumentFunction2);
};

let argumentFunction2 = function () {
	console.log("run the sequence callback");
	currentIteration++;
	runSequence();
};

function runSequence() {
	if (currentIteration >= totalIterations) {
		showModal();
		return;
	}
	numbersDown(argumentFunction1);
}

function numbersDown (argumentFunction1) {
	console.log('numbersDown function called');
	let intervalFirst = parseInt(squeezeTime.value, 10);
	const countDown = setInterval(() => {
		intervalFirst --;
		let transitionBarWidth = intervalFirst / squeezeTime.value * 100

		if (intervalFirst == 0) {
			clearInterval(countDown)
			transitionBar.style.width = "0%";
			timeSpan.innerHTML = "0s"
			argumentFunction1(); //once countdown is complete - it will callback on argumentFunction1 *line 36
		} else {if (intervalFirst >= 1) {
			transitionBar.style.width = transitionBarWidth + "%"
			timeSpan.innerHTML = intervalFirst + 's'
		}} 
}, 1000)}
;

function numbersUp (argumentFunction2) {
	console.log("numbersDown finished, numbersUp called")
	let intervalSecond = relaxTime.value;
	console.log(intervalSecond + " second interval")
	let count = 0;
	const countUp = setInterval(() => {
		console.log ("count: ", count)
		count++;
		let transitionBarWidth = count / relaxTime.value * 100
		if (count < intervalSecond) {
			transitionBar.style.width = transitionBarWidth + "%"
			timeSpan.innerHTML = count + 's'
		} else if (count >= relaxTime.value) { 
			clearInterval(countUp)
			transitionBar.style.width = "100%";
			timeSpan.innerHTML = count + 's';
			argumentFunction2(); // once numbersUp complete, callback here
		}
}, 1000);
}

squeezeBtn.addEventListener("click", addSqueezeTimeToSqueeze)

function addSqueezeTimeToSqueeze() {
	console.log('squeeze btn working')
	const squeezeDisplay = document.querySelector('#squeeze')
	squeezeDisplay.innerHTML = ''
	squeezeDisplay.innerHTML = '<li id="squeeze">' + 'Squeeze: ' + squeezeTime.value+ 's' + '</li>'
}

relaxBtn.addEventListener("click", addRelaxTimeToDisplay)

function addRelaxTimeToDisplay() {
	console.log('relax btn working')
	const relaxDisplay = document.querySelector('#relax')
	relaxDisplay.innerHTML = ''
	relaxDisplay.innerHTML = '<li id="relax">' + 'Relax: ' + relaxTime.value + 's' + '</li>'
}


repetitionBtn.addEventListener("click", addRepstoDisplay)

function addRepstoDisplay() {
	console.log("rep button working")
	const repDisplay = document.querySelector('#repeat')
	repDisplay.innerHTML = ''
	repDisplay.innerHTML = '<li id="repeat">' + 'Repeat: ' + repetitions.value + ' times' + '</li>'
}

smallBookmark.addEventListener('click', function() {
	console.log('working star')
	bookmarkDisplay.style.display = 'inline';
})


bookmarkDisplay.addEventListener('click', function() {
	console.log('working click');
	bookmarkDisplay.style.zIndex= '0';
	bookmarkDisplay.style.backgroundColor= 'rgba(0,0,0,0)'
	bookmarkDisplay.style.color='rgba(0,0,0,0)'
	bookmarkDisplay.style.border='none'
})

function showModal() {
	modalDisplay.style.display = "block";
	overlay.style.display = "block";
}

function closeModal() {
	modalDisplay.style.display = "none";
	overlay.style.display = "none";
	currentIteration = "0";
}

closeRefreshPage.addEventListener("click", closeModal)