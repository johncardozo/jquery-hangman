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

    /* Generate blanks in page based in the movie */
    const generateBlanks = () => {
        // Loop movies array
        movie.forEach(element => {
            if(element === ' '){
                $("#blanksArea").append(`<div class="space">&nbsp;</div>`);
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
            showWinner();
        }else{
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

            // Check if there's a winner
            if(lettersGuessed.size == lettersToBeGuessed.size){
                showWinner();
            }

        }else{
            // Increment error number
            errorNumber++;
            // Draw an error
            drawError();
        }
        // Clean the text input
        $("#letterText").val('')
    });

    const drawError = () => {
        // Get the canvas
        var canvas = document.getElementById("hangmanDrawing");
        var context = canvas.getContext("2d");

        // Reset the current path
        context.beginPath(); 
        
        // Draw each part of the hangman
        switch (errorNumber) {
            case 1: // Head
                // Draw a circle
                context.arc(100, 50, 15, 0, 2*Math.PI);      
                break;
            case 2: // Body
                // Draw a vertical line
                context.moveTo(100, 65);
                context.lineTo(100, 110);
                break;
            case 3: // Left leg  
                // Draw the line
                context.moveTo(100, 110);
                context.lineTo(100-25, 110+25);
                break;                         
            case 4: // Right leg  
                // Draw the line
                context.moveTo(100, 110);
                context.lineTo(100+25, 110+25);
                break;       
            case 5: // Arms
                // Draw an horizontal line
                context.moveTo(100-25, 80);
                context.lineTo(100+25, 80);
                break;
            case 6: // Tree
                // Draw an horizontal line
                context.moveTo(100-80, 10);
                context.lineTo(100+85, 10);
                // Draw a vertical line
                context.moveTo(100+70, 10);
                context.lineTo(100+70, 150);
                break;
            case 7: // Rope
                // Draw a vertical line
                context.moveTo(100, 10);
                context.lineTo(100, 36);
                // Show the loser message
                showLoser();
                break;
            default:
                break;
        }

        // Make the line visible
        context.stroke();
    };

    // Hide messages
    $('#winner-message').hide();
    $('#loser-message').hide();

    // Get the movie for the game
    getMovie();
    
    // Generate blanks in page based in the movie
    generateBlanks();

    // Show the movie (just for educational purposes)
    console.log(movie);
});