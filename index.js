const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame(){
    const board = new Board();
    const player1 = new Player1(board);
    const player2 = new Player2(board);
    let turn = 0;

    //reset button

    function reset(){
        window.location.reload();
    }
    document.getElementById('reset-button').addEventListener('click', reset);


    this.start = function(){
        // I am using Mutation Observer which means that I can observe if there is any changes in the DOM

        const config = {childList: true}; // whenever child of my DIV changes, I will notice that with the observer
        const observer = new MutationObserver(() => takeTurn()); // whenever there is a change, I will call a function takeTurn
        board.positions.forEach((el) => observer.observe(el,config)); // this says that I am observing the el element using the config above
        takeTurn();
    }


    function takeTurn(){
        if(board.determineWhoWon()){
            return;
        }
        if (turn % 2 === 0){
            player1.takeTurn();
           alert("Player 1 take your turn");
        }
        else{
            player2.takeTurn();
            alert("Player 2 take your turn");
        }
        turn++;
    }
}

function Board(){
    this.positions = Array.from(document.getElementsByClassName('box'));
    console.log(this.positions);

    this.determineWhoWon = function(){
        let winner = false;
        const winCombos = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        const positions = this.positions;
        // Now I am checking if it satisfies any of the winning combos
        winCombos.forEach((winningCombo) => {
            const pos0InnerText = positions[winningCombo[0]].innerText;
            const pos1InnerText = positions[winningCombo[1]].innerText;
            const pos2InnerText = positions[winningCombo[2]].innerText;
            const isWinningCombo = pos0InnerText !== '' &&  //So this is a winning combo if the position is not empty and equal to other two 
                pos0InnerText === pos1InnerText && 
                pos1InnerText === pos2InnerText;


                if(isWinningCombo){
                   winner = true;
                   winningCombo.forEach((index) => {
                   positions[index].classList.add('winner');
                   })
                   alert('CONGRATULATIONS YOU WON!!');
                   console.log("YOU WON!");
                }

        });
        const availableBoxes = positions.filter((p) => p.innerText ==='');
        if(availableBoxes.length == 0 && winner === false){
                
            alert("IT'S A DRAW");
            console.log('Draw');    
            // positions.forEach((index) => {
            //     positions[index].classList.add('draw');
            // })
        }
        return winner;
    }
}

function Player1(board){
    this.takeTurn = function(){
        const availableBoxes = board.positions.filter((p) => p.innerText === '');
        availableBoxes.forEach(el => el.addEventListener('click', playerTookTheTurn)); // for each box I am adding an event listener; whenever player takes a turn and clicks a box, this will activate the function "playerTookTheTurn"
    }
    function playerTookTheTurn(event){
        event.target.innerText = "X";
        board.positions.forEach(el => el.removeEventListener('click', playerTookTheTurn));// this removes the event listener from the box since I already took the turn
    
    }

}

function Player2(board){
    this.takeTurn = function(){
        const availableBoxes = board.positions.filter((p) => p.innerText === '');
        availableBoxes.forEach(el => el.addEventListener('click', playerTookTheTurn));
        
    }
    
    function playerTookTheTurn(event){
        event.target.innerText = "O";
        board.positions.forEach(el => el.removeEventListener('click', playerTookTheTurn));// this removes the event listener from the box since I already took the turn
        
    }
    function soundClick(){
        var sound = document.getElementById('beep');
        sound.play();
        
    }
    
}


