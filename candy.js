var candies = ["Green", "Blue", "Red", "Orange", "Yellow", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
score = 0;

var currentTile;
var otherTile; 

window.onload = function() {
    startGame();

    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);
}

function randomCandy(){
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame(){
    for(let r = 0; r < 9; r++ )
    {
        let row = [];
        for(let c = 0; c < 9; c++){
            // creates the img tags for the board div (ex: <img id="1-0" src="./images/red.png">)
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";
            
            //DRAG & DROP functionality
            tile.addEventListener("dragstart", dragStart); //click on a candy, initialize the process
            tile.addEventListener("dragover", dragOver); //move the candy with the mouse clicked
            tile.addEventListener("dragenter", dragEnter); //drag the candy over another candy
            tile.addEventListener("dragleave", dragLeave); //leave the candy over another candy
            tile.addEventListener("drop", dragDrop); //drop the candy, release the mouse click
            tile.addEventListener("dragend", dragEnd); //terminate the process, swap candies

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

function dragStart(){
    currentTile = this;
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){
}

function dragDrop(){
    otherTile = this;
}

function dragEnd(){

    if(currentTile.src.includes("blank") || otherTile.src.includes("blank")){
        return;
    }
    //verifying if the tiles are adjacent
    let currentCoords = currentTile.id.split("-")
    let r = parseInt(currentCoords[0]);
    let c = parseInt(currentCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let or = parseInt(otherCoords[0]);
    let oc = parseInt(otherCoords[1]);

    let moveLeft = c - 1 == oc && r == or;
    let moveRight = c + 1 == oc && r == or;
    let moveUp = c == oc && r - 1 == or;
    let moveDown = c == oc && r + 1 == or;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    //swap if adjacent
    if (isAdjacent){
        let currentImg = currentTile.src;
        let otherImg = otherTile.src;
        currentTile.src = otherImg;
        otherTile.src = currentImg;

        validMove = checkValid();
        if(!validMove)
        {
            let currentImg = currentTile.src;
            let otherImg = otherTile.src;
            currentTile.src = otherImg;
            otherTile.src = currentImg;
        }
    }
}

function crushCandy(){
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushThree(){
    //check columns
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns - 2; c++){
            let candyOne = board[r][c];
            let candyTwo = board[r][c+1];
            let candyThree = board[r][c+2];
    
            if(candyOne.src == candyTwo.src && candyTwo.src == candyThree.src && !candyOne.src.includes("blank")){
                candyOne.src = "./images/blank.png";
                candyTwo.src = "./images/blank.png";
                candyThree.src = "./images/blank.png";

                score += 30;
            }
        }
    }

    //check rows
    for (let c = 0; c < columns; c++){
        for (let r = 0; r < rows - 2; r++){
            let candyOne = board[r][c];
            let candyTwo = board[r+1][c];
            let candyThree = board[r+2][c];

            if(candyOne.src == candyTwo.src && candyTwo.src == candyThree.src && !candyOne.src.includes("blank")){
                candyOne.src = "./images/blank.png";
                candyTwo.src = "./images/blank.png";
                candyThree.src = "./images/blank.png";

                score += 30;
            }
        }
    }
}

function checkValid(){
    //check columns
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns - 2; c++){
            let candyOne = board[r][c];
            let candyTwo = board[r][c+1];
            let candyThree = board[r][c+2];

            if(candyOne.src == candyTwo.src && candyTwo.src == candyThree.src && !candyOne.src.includes("blank")){
                return true;
            }
        }
    }

    //check rows
    for (let c = 0; c < columns; c++){
        for (let r = 0; r < rows - 2; r++){
            let candyOne = board[r][c];
            let candyTwo = board[r+1][c];
            let candyThree = board[r+2][c];

            if(candyOne.src == candyTwo.src && candyTwo.src == candyThree.src && !candyOne.src.includes("blank")){
                return true;
            }
        }
    }
    return false;
}

function slideCandy(){
    for (let c = 0; c < columns; c++)
    {
        let ind = rows - 1;
        for (let r = columns - 1; r >= 0; r--)
        {
            if(!board[r][c].src.includes("blank")){
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }
        for (let r = ind; r >= 0; r--){
            board[r][c].src = "./images/blank.png"
        }
    }
}

function generateCandy(){
    for (let c = 0; c < columns; c++){
        if(board[0][c].src.includes("blank")){
            board[0][c].src = "./images/" +randomCandy() + ".png";
        }
    }
}