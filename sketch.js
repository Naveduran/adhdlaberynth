
/* TODO:
- Show score on screen
- When touching a border change direction
- Count the times walls are touched
- Suggest a direction (usability)
*/

// Save the previous mouse position
var lastX;
var lastY;

// Save the drawn path
var lastRectangle;

// Path settings
var isDrawing = false;
var laberynthHeight = 20;

var buttonMargin = laberynthHeight;
var buttonWidth = 100;
var buttonHeight = 20;

var sizesByDifficulty = {
    low : [110,120,130,170,180],
    medium : [70,80,90,100],
    hard : [20,30,40,50] //this looks more interesting
}

// Colors
var laberytnthColor = 'rgb(255,255,255)'; //blanco
var backgroundColor = 'rgb(0,0,0)'; // negro
var textColor = backgroundColor;
var drawColor = 'rgb(255,0,0)';

// Should be seen by the user
var score = 0;

// Could be set by user
var difficulty = 'hard';

// Draw background and start button
function setup() {
	createCanvas(windowWidth, windowHeight);
    background(backgroundColor);
    drawButton("Start", 0, 0);
}

// Save mouse position to use it later
function updateMouse() {
    lastX = mouseX;
    lastY = mouseY;
}

// Check if the mouse is inside the start button
function isMouseInButton() {
    if (mouseX < 100 && mouseY < 30) { return true }
    return false;
}

// Check if the mouse is inside the last drawn rectangle
function inTheLastRect() {
    if (lastRectangle.topX < mouseX  && mouseX < lastRectangle.bottomX &&
        lastRectangle.topY < mouseY  && mouseY < lastRectangle.bottomY) {
            return true;
    };
    return false;
}

// Check if the mouse is for the first time inside the last drawn rectangle
function isFirstVisit() {
    if (lastRectangle.visited){
        return false;
    };
    return true;
}

// Create a path as long as the mouse keeps moving inside the labyrinth
function mouseMoved() {
    var inTheLastRectangle = inTheLastRect();
    var isMyfirstVisit = isFirstVisit();
    if (inTheLastRectangle && isMyfirstVisit) {
        lastRectangle.visited = true;
        drawPath();
        isDrawing = true;
    }
    if (hasTouchedBorder){
        //change drawing pattern
    }
}

//TODO
function hasTouchedBorder(){
}

// Draw the start button and save as the last rectangle
function drawButton(string, x_pos, y_pos) {
    noStroke();
    fill(laberytnthColor);
    rect(x_pos + buttonMargin,
        y_pos + buttonMargin,
        buttonWidth,
        buttonHeight
    );
    
    fill(textColor);
    text(string, (x_pos + 12 + buttonMargin), (y_pos + 14 + buttonMargin));
    
    lastRectangle = {
        topX : x_pos + buttonMargin,
        topY: y_pos + buttonMargin,
        bottomX: x_pos + buttonWidth  + buttonMargin,
        bottomY: y_pos + buttonHeight + buttonMargin,
        visited: false,
        sizeX: buttonWidth,
        sizeY: buttonHeight
    };
}

// Draw the user movement on the screen
function draw() {
    if (isDrawing){
        stroke(drawColor);
        line(mouseX, mouseY, lastX, lastY);
        updateMouse();
    }
}

// Generate a random size for the next portion of the path
function getRandomSize() {
    var randomSize = random(sizesByDifficulty[difficulty]);
    /* Negative numbers should be added to open path in other 
    /  directions in the screen different to right and down.
    */
    return  randomSize;
}

// Define the direction and size of the upcoming path
function getSizes() {
    randomNumber = getRandomSize();
    if (random([0,1,1])){
        return {x: randomNumber, y: laberynthHeight};
    } else {
        return {x: laberynthHeight, y: randomNumber};
    };
}

// Draws a rectangle to create a new path
function drawPath() {
    score = score + 1;
    sizes = getSizes();
    stroke(laberytnthColor);
    fill(laberytnthColor);
    rect(
        lastRectangle.topX + lastRectangle.sizeX - laberynthHeight,
        lastRectangle.bottomY,
        sizes.x,
        sizes.y
    );
    lastRectangle = {
        topX : lastRectangle.topX + lastRectangle.sizeX - laberynthHeight,
        topY : lastRectangle.bottomY,
        bottomX: lastRectangle.topX + lastRectangle.sizeX - laberynthHeight + sizes.x,
        bottomY: lastRectangle.bottomY + sizes.y,
        sizeX: sizes.x,
        sizeY: sizes.y,
        visited: false
    };
}
