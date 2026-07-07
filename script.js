const welcomeScreen = document.getElementById("welcome-screen");
const nameInput = document.getElementById("name-input");
const continueBtn = document.getElementById("continue-btn");

let playerName = localStorage.getItem("playerName");

let currentDifficulty = "easy";

let isDailyChallenge = false;

let hintsUsed = 0;

let totalXP = Number(localStorage.getItem("totalXP")) || 0;

let gamesPlayed = Number(localStorage.getItem("gamesPlayed")) || 0;

let streak = Number(localStorage.getItem("streak")) || 0;

let totalHints = Number(localStorage.getItem("totalHints")) || 0;

let bestTime = localStorage.getItem("bestTime") || "--:--";

let gamesWon = Number(localStorage.getItem("gamesWon")) || 0;

// ===========================
// SPLASH SCREEN
// ===========================

const loadingText =
document.getElementById("loading-text");

let percent = 0;

const loadingInterval = setInterval(() => {

    percent++;

    loadingText.innerHTML = percent + "%";

    if(percent >= 100){

        clearInterval(loadingInterval);

    }

},30);

const splash =
document.getElementById(
"splash-screen"
);

const home =
document.getElementById(
"home-screen"
);


// Automatically switch after 3 seconds

setTimeout(() => {

splash.style.opacity="0";


setTimeout(() => {

    splash.style.display = "none";

    if(!playerName){

        welcomeScreen.style.display = "flex";

    }

    else{

        home.classList.remove("hidden");

        home.style.animation = "fadeHome .7s";

    }

},600);

},3000);


// ===========================
// SETTINGS PANEL
// ===========================

const settingsBtn =
document.getElementById(
"settings-btn"
);

const settingsPanel =
document.getElementById(
"settings-panel"
);

const closeSettings =
document.getElementById(
"close-settings"
);

const resetPopup =
document.getElementById("reset-popup");

document.getElementById("settings-reset").onclick = function () {
    settingsPanel.classList.remove("active");
    resetPopup.classList.add("active");
};

document.getElementById("cancel-reset").onclick=function(){

    resetPopup.classList.remove("active");

}

document.getElementById("confirm-reset").onclick=function(){

    totalXP = 0;

    gamesPlayed = 0;

    streak = 0;

    localStorage.setItem("totalXP",0);

    localStorage.setItem("gamesPlayed",0);

    localStorage.setItem("streak",0);

    document.getElementById("xp-value").innerHTML=0;

    document.getElementById("games-value").innerHTML=0;

    document.getElementById("streak-value").innerHTML=0;

    resetPopup.classList.remove("active");

}

document.getElementById("settings-themes").onclick=function(){

    document.getElementById("message-title").innerHTML="🎨 Choose Theme";

    document.getElementById("message-text").style.display="none";

    document.getElementById("theme-options").style.display="block";

    document.getElementById("message-popup").classList.add("show");

}

document.getElementById("settings-about").onclick = function () {

    showMessage(

        "🧩 About SudokuVerse",

        "Version 1.0\n\n" +

        "SudokuVerse is an intelligent Sudoku application built to enhance logical thinking, concentration, and problem-solving through an interactive and user-friendly experience.\n\n" +

        "It offers AI-assisted solving, multiple game modes, performance tracking, and modern customization features in one seamless platform.\n\n" +

        "Created by Sanika Gite\n\n" +

        "© 2026 SudokuVerse"

    );

    const text = document.getElementById("message-text");
const arrow = document.getElementById("scroll-indicator");

setTimeout(() => {

    if(text.scrollHeight > text.clientHeight){

        arrow.style.display = "block";

    }else{

        arrow.style.display = "none";

    }

},0);

};

let soundOn=true;

let musicOn=true;

let darkMode =
localStorage.getItem("darkMode") === "true";


settingsBtn.onclick = function () {

    settingsPanel.classList.add("active");

}

closeSettings.onclick = function () {

    settingsPanel.classList.remove("active");

}

const guidePopup =
document.getElementById("guide-popup");

const closeGuide =
document.getElementById("close-guide");

document.getElementById("settings-guide").onclick = function(){

    settingsPanel.classList.remove("active");

    guidePopup.classList.add("show");

}

closeGuide.onclick = function(){

    guidePopup.classList.remove("show");

}

const darkToggle =
document.getElementById("dark-toggle");

darkToggle.checked = darkMode;

darkToggle.onchange=function(){

    darkMode=this.checked;

    localStorage.setItem(

        "darkMode",

        darkMode

    );

    applyDarkMode();

}


// ===========================
// BUTTON ANIMATION
// ===========================

const playButton = document.getElementById("play-game");
const dailyPlay = document.getElementById("daily-play");
const buttons =
document.querySelectorAll(".game-card");

buttons.forEach(button=>{

button.addEventListener(

"mouseenter",

()=>{

button.style.transform=
"scale(1.04)";

}

);

button.addEventListener(

"mouseleave",

()=>{

button.style.transform=
"scale(1)";

}

);

});

// ===========================
// PLAYER PROFILE
// ===========================

function getLevel(xp){

    if(xp < 100) return 1;
    if(xp < 250) return 2;
    if(xp < 500) return 3;
    if(xp < 800) return 4;
    if(xp < 1200) return 5;

    return 6;

}

function updateLevel(){

    let text = "";

    if(totalXP < 100){

        text = "Level 1 • Beginner";

    }

    else if(totalXP < 250){

        text = "Level 2 • Learner";

    }

    else if(totalXP < 500){

        text = "Level 3 • Skilled";

    }

    else if(totalXP < 800){

        text = "Level 4 • Advanced";

    }

    else if(totalXP < 1200){

        text = "Level 5 • Expert";

    }

    else{

        text = "Level 6 • Sudoku Master";

    }

    document.getElementById("player-level").innerHTML = text;

}

function showLevelUp(level){

    const popup = document.getElementById("levelup-popup");

    const icon = document.getElementById("level-icon");

    const text = document.getElementById("levelup-text");


    switch(level){

        case 2:
    icon.innerHTML = "⭐";
    text.innerHTML = "Level 2 • Learner";
    break;

case 3:
    icon.innerHTML = "🚀";
    text.innerHTML = "Level 3 • Skilled";
    break;

case 4:
    icon.innerHTML = "🔥";
    text.innerHTML = "Level 4 • Advanced";
    break;

case 5:
    icon.innerHTML = "👑";
    text.innerHTML = "Level 5 • Expert";
    break;

case 6:
    icon.innerHTML = "🏆";
    text.innerHTML = "Level 6 • Sudoku Master";
    break;

    }

    popup.classList.add("show");

    setTimeout(()=>{

        popup.classList.remove("show");

    },2500);

}

function updateProfile(name){

    document.getElementById("player-name").textContent = name;

    const initials = name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();

    document.getElementById("profile-circle").textContent = initials;

    document.getElementById("xp-value").innerHTML = totalXP;

    document.getElementById("games-value").innerHTML = gamesPlayed;

    document.getElementById("streak-value").innerHTML = streak;
    
    updateLevel();
}

// First time user

if(playerName == null){

    home.classList.add("hidden");

    welcomeScreen.style.display = "flex";

}
else{

    updateProfile(playerName);

}

// Continue button

continueBtn.onclick = function(){

    if(nameInput.value.trim() == ""){

        alert("Please enter your name.");

        return;

    }

    playerName = nameInput.value.trim();

    localStorage.setItem("playerName", playerName);

    updateProfile(playerName);

    welcomeScreen.style.opacity = "0";

setTimeout(()=>{

    welcomeScreen.style.display = "none";

    home.classList.remove("hidden");

    home.style.animation = "fadeHome .7s";

},400);

};

// ===========================
// EDIT PROFILE
// ===========================

const editPopup =
document.getElementById("edit-popup");

const editNameInput =
document.getElementById("edit-name-input");

const saveEdit =
document.getElementById("save-edit");

const cancelEdit =
document.getElementById("cancel-edit");

document.getElementById("edit-profile").onclick = function(){

    settingsPanel.classList.remove("active");

    editPopup.style.display = "flex";

    editNameInput.value = playerName;

}

cancelEdit.onclick = function(){

    editPopup.style.display="none";

}

saveEdit.onclick = function(){

    const newName = editNameInput.value.trim();

    if(newName==""){

        alert("Please enter your name.");

        return;

    }

    playerName = newName;

    localStorage.setItem("playerName",playerName);

    updateProfile(playerName);

    editPopup.style.display="none";

}

// ===========================
// PLAY GAME
// ===========================

const gameScreen =
document.getElementById("game-screen");

let seconds = 0;

let timer;

const backHome =
document.getElementById("back-home");

// ===========================
// DAILY CHALLENGE
// ===========================

const today = new Date().getDay();

const dailyChallenges = [
    { level: "Easy", reward: 25 },
    { level: "Medium", reward: 50 },
    { level: "Hard", reward: 75 },
    { level: "Expert", reward: 100 },
    { level: "Medium", reward: 50 },
    { level: "Hard", reward: 75 },
    { level: "Easy", reward: 25 }
];

const challenge = dailyChallenges[today];

document.getElementById("daily-difficulty").innerHTML =
`Today's Challenge: <b>${challenge.level}</b>`;

document.getElementById("daily-reward").innerHTML =
`Reward: +${challenge.reward} XP`;

function openGame(){
    hintsUsed = 0;

    home.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    clearInterval(timer);

seconds = 0;

document.getElementById("timer").innerHTML = "00:00";

    document.querySelector(".difficulty-box").style.display = "block";

    const sudoku = document.getElementById("sudoku-container");

    sudoku.classList.add("hidden");
    sudoku.style.display = "none";

}

playButton.onclick = function(){

    isDailyChallenge = false;

    openGame();

}
dailyPlay.onclick = function () {

    openGame();

    isDailyChallenge = true;

    setTimeout(() => {

        document.querySelector(".difficulty-box").style.display = "none";

        const sudoku = document.getElementById("sudoku-container");

        sudoku.classList.remove("hidden");
        sudoku.style.display = "flex";

        document.getElementById("game-level").innerHTML =
        challenge.level;

        currentDifficulty =
        challenge.level.toLowerCase();

        loadPuzzle(currentDifficulty);

        clearInterval(timer);

        timer = setInterval(updateTimer,1000);

    },200);

};

backHome.onclick = function(){

    clearInterval(timer);

    resetGame();

    gameScreen.classList.add("hidden");

    home.classList.remove("hidden");

}

const difficulties =
document.querySelectorAll(".difficulty");

difficulties.forEach(button=>{

    button.onclick=function(){

        document.querySelector(".difficulty-box").style.display="none";

        const sudoku = document.getElementById("sudoku-container");

        sudoku.classList.remove("hidden");
        sudoku.style.display = "flex";

        document.getElementById("game-level").innerHTML = this.innerHTML;

const level = this.innerHTML.toLowerCase();

currentDifficulty = level;

loadPuzzle(level);

        clearInterval(timer);

        timer = setInterval(updateTimer,1000);

    }

});

// ===========================
// CREATE BOARD
// ===========================

const board = document.getElementById("sudoku-board");

let selectedCell = null;

for(let i = 0; i < 81; i++){

    const cell = document.createElement("div");

    cell.classList.add("cell");

    cell.dataset.index = i;

    cell.dataset.previous = "";

    cell.dataset.previous = "";

    cell.onclick = function(){

    document.querySelectorAll(".cell").forEach(c=>{

        c.classList.remove("selected");

    });

    // Don't allow selecting fixed cells
    if(cell.classList.contains("prefilled")){

        selectedCell = null;

        return;

    }

    cell.classList.add("selected");

    selectedCell = cell;

};

    board.appendChild(cell);

}

const numberButtons = document.querySelectorAll(".num-btn");

numberButtons.forEach(button=>{

    button.onclick=function(){
           
        if(selectedCell &&
!selectedCell.classList.contains("prefilled")){

    selectedCell.dataset.previous =
    selectedCell.innerHTML;

    selectedCell.innerHTML =
    this.innerHTML;

    selectedCell.classList.add("user");

    checkBoardComplete();

}

    }

});

// ===========================
// ERASE BUTTON
// ===========================

const eraseBtn =
document.getElementById("erase-btn");

eraseBtn.onclick=function(){

    if(selectedCell){

        selectedCell.dataset.previous =
        selectedCell.innerHTML;

        selectedCell.innerHTML="";

    }

}

// ===========================
// UNDO BUTTON
// ===========================

const undoBtn =
document.getElementById("undo-btn");

undoBtn.onclick=function(){

    if(selectedCell){

        const temp =
        selectedCell.innerHTML;

        selectedCell.innerHTML =
        selectedCell.dataset.previous;

        selectedCell.dataset.previous =
        temp;

    }

}

/*for(let i=1;i<=9;i++){

    const btn =
    document.createElement("button");

    btn.classList.add("number-btn");

    btn.innerHTML=i;

    numberPad.appendChild(btn);

}*/

// ===========================
// TIMER
// ===========================

function updateTimer(){

    seconds++;

    let minutes = Math.floor(seconds / 60);

    let secs = seconds % 60;

    if(minutes < 10){

        minutes = "0" + minutes;

    }

    if(secs < 10){

        secs = "0" + secs;

    }

    document.getElementById("timer").innerHTML =
    minutes + ":" + secs;

}

// ===========================
// SUDOKU PUZZLES
// ===========================

const puzzles = {

easy: [

"530070000",
"600195000",
"098000060",
"800060003",
"400803001",
"700020006",
"060000280",
"000419005",
"000080079"

],

medium: [

"000260701",
"680070090",
"190004500",
"820100040",
"004602900",
"050003028",
"009300074",
"040050036",
"703018000"

],

hard: [

"000000907",
"000420180",
"000705026",
"100904000",
"050000040",
"000507009",
"920108000",
"034059000",
"507000000"

],

expert: [

"000000000",
"000003085",
"001020000",
"000507000",
"004000100",
"090000000",
"500000073",
"002010000",
"000040009"

]

};

const solutions = {

easy: [

"534678912",
"672195348",
"198342567",
"859761423",
"426853791",
"713924856",
"961537284",
"287419635",
"345286179"

],

medium: [

"435269781",
"682571493",
"197834562",
"826195347",
"374682915",
"951743628",
"519326874",
"248957136",
"763418259"

],

hard: [

"462831957",
"795426183",
"381795426",
"173984265",
"659312748",
"248567319",
"926178534",
"834259671",
"517643892"

],

expert: [

"987654321",
"246193785",
"351827694",
"168537942",
"724986153",
"593412867",
"519268473",
"432719586",
"876345219"

]

};

// ===========================
// LOAD PUZZLE
// ===========================

function loadPuzzle(level){

    const puzzle = puzzles[level];

    const cells = document.querySelectorAll(".cell");

    let index = 0;

    puzzle.forEach(row=>{

        row.split("").forEach(value=>{

            if(value==="0"){

                cells[index].innerHTML="";

                cells[index].classList.remove("user");

                cells[index].classList.remove("prefilled");

            }

            else{

                cells[index].innerHTML=value;

                cells[index].classList.remove("user");

                cells[index].classList.add("prefilled");

            }

            index++;

        });

    });

}

// ===========================
// CHECK IF BOARD IS COMPLETE
// ===========================

function checkBoardComplete(){

    const cells =
    document.querySelectorAll(".cell");

    let complete = true;

    cells.forEach(cell=>{

        if(cell.innerHTML==""){

            complete = false;

        }

    });

    return complete;

}

// ===========================
// VERIFY SOLUTION
// ===========================

function checkSolution(){

    const cells =
    document.querySelectorAll(".cell");

    let correct = true;

    cells.forEach(cell=>{

        const index =
        parseInt(cell.dataset.index);

        const row =
        Math.floor(index/9);

        const col =
        index%9;

        const answer =
        solutions[currentDifficulty][row][col];

        if(cell.innerHTML!=answer){

            correct = false;

        }

    });

    if(correct){

        showWinPopup();

    }

    else{

     showMessage(

"❌ Incorrect Solution",

"Some numbers are incorrect. Keep trying!"

);

    }

}

function showWinPopup(){

    clearInterval(timer);
    

    document.getElementById("win-time").innerHTML =
    document.getElementById("timer").innerHTML;

    const currentTime =
document.getElementById("timer").innerHTML;

if(bestTime=="--:--" || currentTime<bestTime){

    bestTime=currentTime;

    localStorage.setItem("bestTime",bestTime);

}

    document.getElementById("win-difficulty").innerHTML =
    currentDifficulty.charAt(0).toUpperCase() +
    currentDifficulty.slice(1);
    
    let baseXP = 0;

switch(currentDifficulty){

    case "easy":
        baseXP = 25;
        break;

    case "medium":
        baseXP = 50;
        break;

    case "hard":
        baseXP = 75;
        break;

    case "expert":
        baseXP = 100;
        break;

}

if(isDailyChallenge){

    document.querySelector("#win-popup h1").innerHTML =
    "🔥 Daily Challenge Completed!";

}
else{

    document.querySelector("#win-popup h1").innerHTML =
    "🎉 Puzzle Completed!";

}

// Reduce base XP by 10% per hint
let multiplier = 1 - (hintsUsed * 0.10);

// Minimum 60%
if(multiplier < 0.60){

    multiplier = 0.60;

}

// Final puzzle XP
let earnedXP = Math.round(baseXP * multiplier);

// Daily Challenge Bonus
if(isDailyChallenge){

    earnedXP += challenge.reward;

}

document.getElementById("win-xp").innerHTML =
"+" + earnedXP + " XP";

document.getElementById("win-hints").innerHTML =
hintsUsed;

const oldLevel = getLevel(totalXP);

totalXP += earnedXP;

const newLevel = getLevel(totalXP);

updateLevel();

if(newLevel > oldLevel){

    showLevelUp(newLevel);

}

document.getElementById("win-totalxp").innerHTML =
totalXP + " XP";

document.getElementById("win-level").innerHTML =
document.getElementById("player-level").innerHTML;

gamesPlayed++;

gamesWon++;

localStorage.setItem("gamesWon",gamesWon);

streak++;

localStorage.setItem("totalXP", totalXP);

localStorage.setItem("gamesPlayed", gamesPlayed);

localStorage.setItem("streak", streak);

document.getElementById("xp-value").innerHTML = totalXP;

document.getElementById("games-value").innerHTML = gamesPlayed;

document.getElementById("streak-value").innerHTML = streak;

document.getElementById("win-popup").classList.add("show");

}

function showMessage(title,text){

    document.getElementById("message-title").innerHTML = title;

    document.getElementById("message-text").innerHTML = text;

    document.getElementById("message-popup").classList.add("show");

    // Hide theme options for normal popups
    document.getElementById("theme-options").style.display = "none";

}

document.getElementById("close-message").onclick=function(){

    if(document.getElementById("theme-options").style.display=="block"){

        setTheme(selectedTheme);

if(darkMode){
    applyDarkMode();
}

        document.getElementById("theme-options").style.display="none";

    }

    document.getElementById("message-popup").classList.remove("show");

}

document.getElementById("continue-home").onclick = function(){

    document.getElementById("win-popup").classList.remove("show");
    
    resetGame();

    gameScreen.classList.add("hidden");

    home.classList.remove("hidden");

}

// ===========================
// RESET GAME
// ===========================

function resetGame(){

    // Clear all cells
    document.querySelectorAll(".cell").forEach(cell=>{

        cell.innerHTML="";

        cell.classList.remove("prefilled");

        cell.classList.remove("user");

        cell.classList.remove("selected");

    });

    selectedCell = null;

    hintsUsed = 0;

    currentDifficulty = "";

    // Reset timer
    seconds = 0;

    document.getElementById("timer").innerHTML = "00:00";

    // Show difficulty selection again
    document.querySelector(".difficulty-box").style.display="block";

    document.getElementById("sudoku-container").style.display="none";

}

document.getElementById("play-again").onclick = function(){

    document.getElementById("win-popup").classList.remove("show");

    resetGame();

    gameScreen.classList.remove("hidden");

}

// ===========================
// HINT BUTTON
// ===========================

const hintBtn =
document.getElementById("hint-btn");


hintBtn.onclick = function(){

    const cells =
    document.querySelectorAll(".cell");

    // If a cell is selected, give hint there
    if(selectedCell &&
       !selectedCell.classList.contains("prefilled")){

        const index =
        [...cells].indexOf(selectedCell);

        const row = Math.floor(index / 9);

        const col = index % 9;

        selectedCell.innerHTML =
solutions[currentDifficulty][row][col];

selectedCell.classList.add("user");

// Count only successful hints
hintsUsed++;

totalHints++;

localStorage.setItem("totalHints", totalHints);

checkBoardComplete();

return;

    }

    // Otherwise fill the first empty cell
    for(let i=0;i<81;i++){

        if(cells[i].innerHTML==""){

            const row=Math.floor(i/9);

            const col=i%9;

            cells[i].innerHTML =
solutions[currentDifficulty][row][col];

cells[i].classList.add("user");

hintsUsed++; 

totalHints++;

localStorage.setItem("totalHints",totalHints);

checkBoardComplete();

break;

        }

    }

}

const finishBtn =
document.getElementById("finish-btn");

finishBtn.onclick=function(){

    if(!checkBoardComplete()){

        showMessage(

"⚠ Puzzle Incomplete",

"Please complete every cell before pressing Finish."

);

        return;

    }

    checkSolution();

}

const aiButton =
document.getElementById("ai-solver");

const leaderboardBtn =
document.getElementById("leaderboard-btn");

const statisticsBtn =
document.getElementById("statistics-btn");

const achievementBtn =
document.getElementById("achievement-btn");

const themesBtn =
document.getElementById("themes-btn");

const solverScreen =
document.getElementById("solver-screen");

const solverBack =
document.getElementById("solver-back");

aiButton.onclick=function(){

    home.classList.add("hidden");

    solverScreen.classList.remove("hidden");

}

solverBack.onclick=function(){

    solverScreen.classList.add("hidden");

    home.classList.remove("hidden");

}

// ===========================
// AI BOARD
// ===========================

const solverBoard =
document.getElementById("solver-board");

for(let i=0;i<81;i++){

    const input =
    document.createElement("input");

    input.type="text";

    input.maxLength=1;

    input.classList.add("solve-cell");

    input.onclick=function(){

    document
    .querySelectorAll(".solve-cell")
    .forEach(cell=>cell.classList.remove("selected"));

    input.classList.add("selected");

};

    input.oninput=function(){

        if(!/^[1-9]?$/.test(input.value))

            input.value="";

    };

    solverBoard.appendChild(input);

}

const solveAI =
document.getElementById("solve-ai");

const resetAI =
document.getElementById("reset-ai");


function isBoardValid(board){

    for(let row=0; row<9; row++){

        for(let col=0; col<9; col++){

            let num = board[row][col];

            if(num != 0){

                board[row][col] = 0;

                if(!isValid(board,row,col,num)){

                    board[row][col] = num;

                    return false;

                }

                board[row][col] = num;

            }

        }

    }

    return true;

}

solveAI.onclick = function(){

    const board = getBoard();

    if(!isBoardValid(board)){

    showMessage(

        "Invalid Sudoku",

        "The puzzle violates Sudoku rules. Please remove duplicate numbers."

    );

    return;

}

    let filled = 0;

    for(let row=0; row<9; row++){

        for(let col=0; col<9; col++){

            if(board[row][col] != 0){

                filled++;

            }

        }

    }

    if(filled == 0){

        showMessage(
            "Empty Puzzle",
            "Please enter a Sudoku puzzle before solving."
        );

        return;

    }

    if(solveSudoku(board)){

        displayBoard(board);

        document.getElementById("ai-status").innerHTML=
        "✅ Sudoku solved successfully!";

    }

    else{

        document.getElementById("ai-status").innerHTML=
        "❌ No valid solution exists.";

    }

}

resetAI.onclick = function(){

    const inputs =
    document.querySelectorAll(".solve-cell");

    inputs.forEach(input=>{

        input.value = "";

    });

    document.getElementById("ai-status").innerHTML = "";

}

// ===========================
// GET AI BOARD
// ===========================

function getBoard(){

    const board = [];

    const cells = document.querySelectorAll(".solve-cell");

    for(let i=0;i<9;i++){

        board[i]=[];

        for(let j=0;j<9;j++){

            const value =
            cells[i*9+j].value;

            if(value===""){

                board[i][j]=0;

            }

            else{

                board[i][j]=parseInt(value);

            }

        }

    }

    return board;

}

// ===========================
// DISPLAY BOARD
// ===========================

function displayBoard(board){

    const cells =
    document.querySelectorAll(".solve-cell");

    for(let i=0;i<9;i++){

        for(let j=0;j<9;j++){

            cells[i*9+j].value =
            board[i][j];

        }

    }

}

// ===========================
// CHECK VALID MOVE
// ===========================

function isValid(board,row,col,num){

    // Row
    for(let x=0;x<9;x++){

        if(board[row][x]==num){

            return false;

        }

    }

    // Column
    for(let x=0;x<9;x++){

        if(board[x][col]==num){

            return false;

        }

    }

    // 3x3 Box

    const startRow =
    row-row%3;

    const startCol =
    col-col%3;

    for(let i=0;i<3;i++){

        for(let j=0;j<3;j++){

            if(board[startRow+i][startCol+j]==num){

                return false;

            }

        }

    }

    return true;

}

// ===========================
// BACKTRACKING SOLVER
// ===========================

function solveSudoku(board){

    for(let row=0; row<9; row++){

        for(let col=0; col<9; col++){

            if(board[row][col]==0){

                for(let num=1; num<=9; num++){

                    if(isValid(board,row,col,num)){

                        board[row][col]=num;

                        if(solveSudoku(board)){

                            return true;

                        }

                        board[row][col]=0;

                    }

                }

                return false;

            }

        }

    }

    return true;

}

// ===========================
// LEADERBOARD
// ===========================

leaderboardBtn.onclick=function(){

    showMessage(

        "🏆 Leaderboard",

        "Online Leaderboard will be available in the next update.\n\nKeep earning XP to compete with players worldwide!"

    );

};

// ===========================
// STATISTICS
// ===========================

statisticsBtn.onclick=function(){

    let bestTime =
    localStorage.getItem("bestTime") || "--:--";

    showMessage(
"📊 Statistics",

`
⭐ XP Earned : ${totalXP}

🎮 Games Played : ${gamesPlayed}

🔥 Current Streak : ${streak}

💡 Hints Used : ${totalHints}

⏱ Best Time : ${bestTime}
`
);

};

// ===========================
// ACHIEVEMENTS
// ===========================

achievementBtn.onclick=function(){

    let text="";

    text += gamesPlayed>=1 ?
    "🏆 First Victory ✅\n\n" :
    "🏆 First Victory 🔒\n\n";

    text += gamesPlayed>=10 ?
    "🎮 10 Games Completed ✅\n\n" :
    "🎮 10 Games Completed 🔒\n\n";

    text += streak>=5 ?
    "🔥 5 Game Streak ✅\n\n" :
    "🔥 5 Game Streak 🔒\n\n";

    text += totalXP>=500 ?
    "⭐ 500 XP Master ✅\n\n" :
    "⭐ 500 XP Master 🔒\n\n";

    text += totalXP>=1000 ?
    "👑 Sudoku Champion ✅" :
    "👑 Sudoku Champion 🔒";

    showMessage(
"🏅 Achievements",

`
🏆 First Victory        ${gamesPlayed>=1?"✅":"🔒"}

🎮 10 Games Played      ${gamesPlayed>=10?"✅":"🔒"}

🔥 5 Game Streak        ${streak>=5?"✅":"🔒"}

⭐ 500 XP Master        ${totalXP>=500?"✅":"🔒"}

👑 Sudoku Champion      ${totalXP>=1000?"✅":"🔒"}

⚡ Speed Runner         ${bestTime!="--:--"?"✅":"🔒"}

💡 Hint Master          ${totalHints===0?"✅":"🔒"}
`
);

};

// ===========================
// THEMES
// ===========================

themesBtn.onclick=function(){

    showMessage(
        "🎨 Choose Theme",
        "Select your favourite theme."
    );

    document.getElementById("theme-options").style.display = "block";

};

// ===========================
// THEMES
// ===========================

function setTheme(theme){

    if(theme=="purple"){

        document.documentElement.style.setProperty("--bg1","#5B21B6");
        document.documentElement.style.setProperty("--bg2","#312E81");
        document.documentElement.style.setProperty("--bg3","#0F172A");
        document.documentElement.style.setProperty("--primary","#6B2CFF");
        document.documentElement.style.setProperty("--card","rgba(255,255,255,.12)");

    }

    else if(theme=="ocean"){

        document.documentElement.style.setProperty("--bg1","#0EA5E9");
        document.documentElement.style.setProperty("--bg2","#0369A1");
        document.documentElement.style.setProperty("--bg3","#082F49");
        document.documentElement.style.setProperty("--primary","#38BDF8");
        document.documentElement.style.setProperty("--card","rgba(255,255,255,.10)");

    }

    else if(theme=="emerald"){

        document.documentElement.style.setProperty("--bg1","#10B981");
        document.documentElement.style.setProperty("--bg2","#047857");
        document.documentElement.style.setProperty("--bg3","#022C22");
        document.documentElement.style.setProperty("--primary","#34D399");
        document.documentElement.style.setProperty("--card","rgba(255,255,255,.10)");

    }

    else if(theme=="sunset"){

    document.documentElement.style.setProperty("--bg1","#FF7AA2");

    document.documentElement.style.setProperty("--bg2","#FF9A62");

    document.documentElement.style.setProperty("--bg3","#5B4BBA");

    document.documentElement.style.setProperty("--primary","#FFC857");

    document.documentElement.style.setProperty(
        "--card",
        "rgba(255,255,255,.12)"
    );

}
    localStorage.setItem("theme",theme);

}

const savedTheme =
localStorage.getItem("theme");

if(savedTheme){

    setTheme(savedTheme);

}

applyDarkMode();

let selectedTheme = "purple";

const themeButtons =
document.querySelectorAll(".theme-choice");

themeButtons.forEach(button=>{

    button.onclick=function(){

        themeButtons.forEach(btn=>
            btn.classList.remove("selected")
        );

        this.classList.add("selected");

        selectedTheme =
        this.dataset.theme;

    }

});

function applyDarkMode(){

    const currentTheme =
    localStorage.getItem("theme") || "purple";

    if(darkMode){

        if(currentTheme=="purple"){

            document.documentElement.style.setProperty("--bg1","#2E1065");
            document.documentElement.style.setProperty("--bg2","#1E1B4B");
            document.documentElement.style.setProperty("--bg3","#020617");
            document.documentElement.style.setProperty("--primary","#8B5CF6");
            document.documentElement.style.setProperty("--card","rgba(35,35,35,.88)");

        }

        else if(currentTheme=="ocean"){

            document.documentElement.style.setProperty("--bg1","#0C4A6E");
            document.documentElement.style.setProperty("--bg2","#082F49");
            document.documentElement.style.setProperty("--bg3","#041A2B");
            document.documentElement.style.setProperty("--primary","#38BDF8");
            document.documentElement.style.setProperty("--card","rgba(35,35,35,.88)");

        }

        else if(currentTheme=="emerald"){

            document.documentElement.style.setProperty("--bg1","#064E3B");
            document.documentElement.style.setProperty("--bg2","#022C22");
            document.documentElement.style.setProperty("--bg3","#011B16");
            document.documentElement.style.setProperty("--primary","#34D399");
            document.documentElement.style.setProperty("--card","rgba(35,35,35,.88)");

        }

        else if(currentTheme=="sunset"){

            document.documentElement.style.setProperty("--bg1","#7A284E");
            document.documentElement.style.setProperty("--bg2","#7A3F2A");
            document.documentElement.style.setProperty("--bg3","#2F225F");
            document.documentElement.style.setProperty("--primary","#FFC857");
            document.documentElement.style.setProperty("--card","rgba(35,35,35,.88)");

        }

    }

    else{

        setTheme(currentTheme);

    }

}

// ===========================
// AI NUMBER PAD
// ===========================

const solverButtons =
document.querySelectorAll(".solver-num-btn");

solverButtons.forEach(button=>{

    button.onclick=function(){

        const selected =
        document.querySelector(".solve-cell.selected");

        if(!selected) return;

        selected.value =
this.textContent.trim();

    };

});