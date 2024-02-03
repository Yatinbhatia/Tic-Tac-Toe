// Selecting DOM elements
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#Reset");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true;

// Audio elements for sound effects
const clickSound = new Audio("audio.mp3");
const winSound = new Audio("win2.wav");

// Winning patterns for Tic Tac Toe
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Function to reset the game
const resetgame = () => {
    turn0 = true;
    enableboxes();
    msgcontainer.classList.add("hide");

    // Remove the "winner" class from all boxes
    boxes.forEach((box) => {
        box.classList.remove("winner");
    });
};

// Event listener for each box click
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");

        // Update box content based on the current player
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }

        box.disabled = true;
        checkWinner(); // Check for a winner after each move
        document.querySelector('.game').classList.toggle('player-turn');
        clickSound.play(); // Play click sound effect
    });
});

// Function to disable all boxes
const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Function to enable all boxes and reset their content
const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Function to display the winner and play the winning sound effect
const showwinner = (winner) => {
    msg.innerText = `Congratulations.., Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
    winSound.play(); // Play the winning sound effect
};

// Function to check for a winner
const checkWinner = () => {
    // Remove the "winner" class from all boxes
    boxes.forEach((box) => {
        box.classList.remove("winner");
    });

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                // Add the "winner" class to the winning boxes
                boxes[pattern[0]].classList.add("winner");
                boxes[pattern[1]].classList.add("winner");
                boxes[pattern[2]].classList.add("winner");
                showwinner(pos1Val);
            }
        }
    }
};

// Event listeners for new game and reset buttons
newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
