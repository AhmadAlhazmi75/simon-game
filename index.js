let buttonColors = ["red", "blue", "green", "yellow"]; // initial 4 buttons on the screen
let gamePattern = []; // the correct pattern that should match userClickedPattern
let userClickedPattern = []; // user Pattern
let started = false; // checks if the game started or note
let level = 0; // initial level


//if the user pressed anything on the keyboard, the game starts, started variable is used to track the game.
$(document).keydown(function() {
	if (!started) {
		nextSequence();
		$("#level-title").text("level " + level); // change the title to the level
		started = true;
	}
})


//if the user clicked one of the buttons
$(".btn").click(function() {
	userChosenColor = $(this).attr("id"); // this refers to the current button pressed
	userClickedPattern.push(userChosenColor);

	checkAnswer(userClickedPattern.length - 1); // pass the length of the array -1 is the actual number of index.

	playSound(userChosenColor);
	animatePress(userChosenColor);
});



// main function to start the game
function nextSequence() {
	userClickedPattern = []; // initialize the user pattern and make it empty. 
	level++; // level 0 to 1
	$("#level-title").text("level " + level); // make the title level 1

	let randomNumber = Math.floor(Math.random() * 3 + 1);
	let randomChosenColor = buttonColors[randomNumber]; // random index from the buttonColors array
	gamePattern.push(randomChosenColor);

	$('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // it is an effect used when the button is clicked 

	playSound(randomChosenColor);
	animatePress(randomChosenColor);



}


// a function to play the sounds of the game
function playSound(name) {
	let audio = new Audio("/sounds/" + name + ".mp3"); //for example yellow.mp3
	audio.play();
}

// a function to make some animation when we click the button
function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");

	setTimeout(function() { //remove that animation and return to the normal design after 100ms.
		$("#" + currentColor).removeClass("pressed")
	}, 100)
}


//a function to set the rules for the game, and to make it run properly.
function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { // if the last button the user clicked = last button shows in game pattern, go to the second if.
		if (userClickedPattern.length === gamePattern.length) { // if the length of the arrays is equal to each other
			setTimeout(function() { //generate another level.
				nextSequence();
			}, 1000)
		}
	} else { // if the user clicked wrong button
		playSound("wrong");
		$("body").addClass('game-over'); // some effects like background-color : red;
		setTimeout(function() { // remove that effects after 200ms
			$("body").removeClass("game-over");
		}, 200)

		$("#level-title").text("Game Over, Press Any Key to Restart");
		startOver();
	}

}
// a function to reset everything to 0 and start over.
function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}