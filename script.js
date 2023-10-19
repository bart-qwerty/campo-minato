/*-------------------
FASE DI PREPARAZIONE
-------------------*/

//Recuperare dalla pagina tutti gli elementi di interesse
const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text')
const winGameScreen = document.querySelector('.win-game-screen');
const winGameText = document.querySelector('.win-game-text')
const playAgainButton = document.querySelector('.play-again')

// Preparo delle informazioni utili alla logica di gioco
const totalCells = 100;
const totalBombs = 16;
const maxScore = totalCells - totalBombs;
const bombsList = [];
let score = 0;

// Generare n bombe casuali
while (bombsList.length < totalBombs) {
    const number = (Math.floor(Math.random() * totalCells) + 1);
    //Math.floor toglie la virgola dai numeri
    // +1 e' per avere numeri tra 1 e 100 e non tra 0 e 99
    if (!bombsList.includes(number)) { //se la bombsList non contiene il numero generato, allora aggiungilo
        bombsList.push(number);
    }
}

/*-------------------
MUSICA DI SOTTOFONDO
-------------------*/

var bgaudio = new Audio('sounds/Joshua McLean - Mountain Trials ♫ NO COPYRIGHT 8-bit Music.mp3');
bgaudio.play();



/*------------------------
GRIGLIA E LOGICA DI GIOCO
------------------------*/
let isCellEven = false;
let isRowEven = false;

for (let i = 1; i <= totalCells; i++) {

    const cell = document.createElement('div');

    cell.classList.add('cell');
    // Lo inserisco nella griglia
    //cell.innerText = i; //inserisco il numero della casella

    isCellEven = i % 2 == 0;
    // se la riga e la casella sono pari: cell-dark
    if (isRowEven && isCellEven) {
        cell.classList.add('cell-dark');
    }
    // se la riga e la casella sono dispari: cell-dark
    else if (!isRowEven && !isCellEven) {
        cell.classList.add('cell-dark');
    }
    // verifico se sono alla fine della riga
    if (i % 10 == 0) {
        isRowEven = !isRowEven;
    }

    // GESTIAMO IL CLICK DELLA CELLA
    cell.addEventListener('click', function () {
        //CONTROLLO CHE LA CELLA NON SIA GIA STATA CLICCATA
        if (cell.classList.contains('cell-clicked')) {
            console.log('GIA CLICKED')
            return; //uso return per sospendere la funzione
        }


        if (bombsList.includes(i)) {
            cell.classList.add('cell-bomb')
            endGame(false);
        }
        else {
            var clickAudio = new Audio('sounds/8 Bit Pop Sound Effect.mp3');
            clickAudio.play();
            cell.classList.add('cell-clicked')
            updateScore();
        }

        console.log('cliccata la cella', i)
    }); //aggiunge un event "ascoltatore",listener


    grid.appendChild(cell); // aggiungo un child alla classe genitore, in questo caso grid
}

/*----------------
FUNZIONI
----------------*/

function updateScore() {
    score++;
    console.log('aggiorno il punteggio', score)
    scoreCounter.innerText = String(score).padStart(5, 0); //padStart mi permette di formattare lo score mantenendo gli zeri(funziona solo con stringhe)
    if (score == maxScore) {
        endGame(true);
    }
}

function endGame(isVictory) {
    console.log('fine del gioco')
    if (isVictory == true) {
        // coloriamo di verde il background
        endGameScreen.classList.add('win')
        endGameText.innerText = 'YOU\nWIN'
    }
    else {
        // riveliamo le bombe
        bgaudio.pause();
        var audio = new Audio('sounds/Explosion-Sound.mp3');
        audio.play();
        revealAllBombs()
    }
    // mostriamo la schermata rimuovendo la classe
    endGameScreen.classList.remove('hidden')
}

/*----------------------------
RIVELAZIONE BOMBE NON ESPLOSE
----------------------------*/
function revealAllBombs() {
    // recupero tutte le celle 
    const cells = document.querySelectorAll('.cell');
    for (let i = 1; i <= cells.length; i++) {
        //controllo se la cella e' una bomba
        if (bombsList.includes(i)) {
            const cellToReveal = cells[i - 1];
            cellToReveal.classList.add('cell-bomb');
        }
    }
}

/*---------------
EVENTI
---------------*/

playAgainButton.addEventListener('click', function () {
    location.reload();
})