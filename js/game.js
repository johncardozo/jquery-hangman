$(document).ready(function(){

    // Global variables
    let lettersGuessed = new Set();
    let lettersToBeGuessed = new Set();
    let errorNumber = 0;
    let movie = null;

    /* Get a random movie for the game */
    const getMovie = () => {
        // Generate the movie index
        let index = Math.floor(Math.random() * movies.length);
        // Get the movie
        movie = movies[index].split("");
        // Get letters to be guessed
        movie.forEach(element => {
            // Add the current letter
            if(element !== ' '){
                lettersToBeGuessed.add(element);
            }
        });
    };

    /* Show current state of the game */
    const showCurrentState = () => {
        // Clear all blanks
        $("#blanksArea").empty();
        // Loop the movie letters
        movie.forEach(element => {
            // Check if current letter is an space
            if(element === ' '){
                $("#blanksArea").append(`<div class="space">&nbsp;</div>`);
            }else
            // Check whether it has to show the letter or not
            if(lettersGuessed.has(element)){
                $("#blanksArea").append(`<div class="blank">${element}</div>`);
            }else{
                $("#blanksArea").append(`<div class="blank">&nbsp;</div>`);
            }
        });        
    };

    /* Show the message for the winner */
    const showWinner = () => {
        // Show the winner message
        $('#winner-message').show();
    };

    /* Show the message for the loser */
    const showLoser = () => {
        // Generate the loser message
        let message = `<strong>Such a loser!!!</strong><br>The correct movie is ${movie.join('')}`;
        // Show the loser message
        $('#loser-message').html(message);
        $('#loser-message').show();
    };

    /* Click on guessing button */
    $("#guessButton").click(function(){
        // Get the value typed by the user
        let userGuess = $("#guessText").val().toUpperCase();
        
        // Check if the guessing is equal to the movie
        if(movie.join('') === userGuess){
            // Get all the letters to be guessed
            lettersGuessed = lettersToBeGuessed;
            // Show current state of the game
            showCurrentState();
            // Show winner message
            showWinner();
        }else{
            // Show the loser message
            showLoser();
        }
    });

    /* Click on letter button */
    $("#letterButton").click(function(){
        // Get the value typed by the user
        let letter = $("#letterText").val().toUpperCase();

        // Check if the letter is in the movie
        if(movie.includes(letter)){
            // Add the new guessed letter
            lettersGuessed.add(letter);            
            // Show current state of the game
            showCurrentState();
            // Check if there's a winner
            if(lettersGuessed.size == lettersToBeGuessed.size){
                showWinner();
            }
        }else{
            // Increment error number
            errorNumber++;
            // Draw the error
            if(drawError(errorNumber)){
                // Show the loser message
                showLoser();
            }
        }
        // Clean the text input
        $("#letterText").val('');
        $("#letterText").focus();
    });

    // Hide messages
    $('#winner-message').hide();
    $('#loser-message').hide();

    // Initialize the canvas
    initializeCanvas();

    // Get a random movie for the game
    getMovie();
    
    // Show current state of the game
    showCurrentState();

    // Show the movie in console (just for testing purposes)
    console.log(movie.join(''));
});