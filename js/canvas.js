const initializeCanvas = () => {
    // Get the canvas
    var canvas = document.getElementById("hangmanDrawing");
    var context = canvas.getContext("2d");
    // Background
    context.beginPath();
    context.rect(0, 0, 300, 150);
    context.fillStyle = "#F6ECB0";
    context.fill();
    
    // Horizontal lines
    context.beginPath(); 
    context.strokeStyle = "#CEDAAB";
    for (let index = 10; index < 150; index=index+20) {
        context.moveTo(0, index);
        context.lineTo(300, index);
    }
    context.stroke();
    
    // Vertical left margin
    context.beginPath(); 
    context.strokeStyle = "#CF886A";
    context.moveTo(35, 0);
    context.lineTo(35, 150); 
    context.moveTo(32, 0);
    context.lineTo(32, 150); 
    context.stroke();
};

const drawError = (errorNumber) => {

    let end = false;

    // Get the canvas
    var canvas = document.getElementById("hangmanDrawing");
    var context = canvas.getContext("2d");

    // Reset the current path
    context.beginPath(); 
    context.strokeStyle = "black";

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
            // The game has ended
            end = true;
            break;
        default:
            break;
    }

    // Make the line visible
    context.stroke();

    return end;
};

