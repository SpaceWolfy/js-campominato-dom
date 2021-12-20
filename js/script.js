//Creo una funzione permetta la generazione casuale di mine rosse all'interno della griglia di gioco
function getNum(min, max) {
    return Math.floor(Math.random() * (max - min + min) + min);
};

let arrayNum = [];

function randomMine (minGridNum, maxGridNum) {
    arrayNum = [];
    while(arrayNum.length < 16) {
        const randomNumber = getNum(minGridNum, maxGridNum);
        if(!arrayNum.includes (randomNumber)) {
            arrayNum.push(randomNumber);
        };
    };
    console.log(arrayNum.sort(function(a, b){return a-b}));
};

//Creo una funzione che andrò a richiamare nelle funzioni sottostanti,
//questa funzione mi permette di definire le caratteristiche dei quadrati prima di andarli a creare
function defineSquare(elementBox, num, boxcontainer, gridnumWin){
    elementBox.innerHTML = num;
    boxcontainer.append(elementBox);
    gridnumWin;
    colorSquare(elementBox, num, gridnumWin);
};

/* 
Tale funzione permette non solo di definire il colore dei "pezzi di campo" cliccati dall'utente, ma
anche di determinare le condizioni di vittoria o sconfitta in base a tali colori
*/
let winCond = document.getElementsByClassName("azure");

function colorSquare(element, arrNumber, GridNum) {
    element.addEventListener('click', function() {
        console.log(this); 
        this.classList.add('azure'); 
        let boolValue = false;
        //se la griglia condivide con l'array un numero, l'if sottostante permette di colorare il quadrato relativo al numero specifico di rosso
        if(arrayNum.includes(arrNumber)) {
            this.classList.remove('azure');
            this.classList.add('red');
            boolValue = true
            if(boolValue) {
                if (confirm("Hai perso, hai scoperto un totale di " + winCond.length + " zone sicure, clicca 'Ok' per tornare al menù principale")) {
                    outputHtml.innerHTML = ''
                } else {
                    alert('Hai cliccato "annulla", continua la tua partita fino a vincerla o seleziona un livello per far ripartire il gioco');
                };
            };
        };

        //win condition:
        if (winCond.length === GridNum) {
            if (confirm("Hai vinto! Hai scoperto tutte le zone sicure(" + winCond.length + "), vuoi tornare al menù di scelta della difficoltà?")) {
            outputHtml.innerHTML = ''
            } else {
                alert('Hai cliccato "annulla", analizza la tua partita o seleziona un livello per far ripartire il gioco');
            };
        };
    });
}

//le tre funzioni sottostanti racchiudono quelle soprastanti,
//queste tre funzioni si occupano di definire come i quadrati verranno stampati
function createNewSquareNoob(container, number) {
    const square = document.createElement('div');
    square.className = 'pezzo-di-campo';
    defineSquare(square, number, container, 84);

};

function createNewSquarePro(container, number) {
    const square = document.createElement('div');
    square.className = 'pezzo-di-campo-pro';
    defineSquare(square, number, container, 65);
};

function createNewSquareHacker(container, number) {
    const square = document.createElement('div');
    square.className = 'pezzo-di-campo-hacker';
    defineSquare(square, number, container, 33);
};
/* -------------------------------------------- */

let outputHtml = document.querySelector('.campominato-container');

let btnNoob = document.querySelector('.diff-lvl-1');
let btnPro = document.querySelector('.diff-lvl-2');
let btnHacker = document.querySelector('.diff-lvl-3');

//gli addEventListener si occupano di stampare i quadrati definiti nelle tre funzioni superiori.
//ogni addEventListener è collegato ad un pulsante del DOM.
/* 
al click di ogni pulsante verrà aggiunta la classe display-flex accanto 
a campionato-container, rendendolo visibile.
 */
btnNoob.addEventListener('click', function(){
    outputHtml.classList.add('display-flex');
    outputHtml.innerHTML = '' //serve a resettare la griglia quando si passa da un pulsante all'altro
    for(let i = 0; i < 100; i++) { 
        //permette di stampare i quadrati e dei numeri rappresentativi della casella al loro interno
        createNewSquareNoob(outputHtml, i+1);
    };
    randomMine(1, 100);
});

btnPro.addEventListener('click', function(){
    outputHtml.innerHTML = ''
    outputHtml.classList.add('display-flex');
    for(let i = 0; i < 81; i++) {
        createNewSquarePro(outputHtml, i+1);
    };
    randomMine(1, 81);
});

btnHacker.addEventListener('click', function(){
    outputHtml.innerHTML = ''
    outputHtml.classList.add('display-flex');
    for(let i = 0; i < 49; i++) {
        createNewSquareHacker(outputHtml, i+1);
    };
    randomMine(1, 49);
});
