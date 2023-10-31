//gameBoard array inside of gameBoard Object
const gameFlow = (function(){
    let cross = true

    const winCondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    let winner = ""
    const displayWinner = (mark) =>{
        const winMsg = document.querySelector('win-msg')
        document.querySelector('end-screen').computedStyleMap.display = 'block'
        winMsg.textContent = `${mark} Won`
    }
    const checkWinner = function(theGame){
        for(let i = 0; i < 8; i++){
            let count = 0
            for(let j = 0; j < 3; j++){
                if(theGame[winCondition[i][j]] === 'X')
                    count++
                else if(theGame[winCondition[i][j]] === 'O')
                    count--;
            }
            if(count === 3){
                gameFlow.winner = 'X'
            }
            
            else if(count === -3)
                gameFlow.winner = 'O';
        }
    }
    
    return {
        cross,
        checkWinner,
        winner,
    }
})()

const player = (function(){
    let marker
    
    const setMarker = () => {
        marker = document.querySelector('.playerMark').textContent
    }

    const getMarker = () => {
        return marker
    }
    return{
        getMarker,
        setMarker,
    }
})()

const gameboard = (function(){
    let theGame = ["","","","","","","","",""]
    const gameBoard = document.querySelector('.game-board')

    const displayBlock = (block) =>{
        if(gameFlow.cross){
            block.textContent = 'X'
            block.classList.add('X')
        } 
        else{
            block.textContent = 'O'
            block.classList.add('O')
        }

    }
    const swapTurns = function(){
        (gameFlow.cross) ? gameFlow.cross = false: gameFlow.cross = true
        console.log(gameFlow.cross)
    }
    const updateBlock = function(e){
        if(gameFlow.winner !== ""){
            console.log(`${gameFlow.winner} Won`)
            return
        }
        let parent = e.target.parentNode
        let index = Array.prototype.indexOf.call(parent.children, e.target);
        (gameFlow.cross) ? theGame[index] = 'X' : theGame[index] = 'O'
        displayBlock(e.target)
        console.log(theGame)
        swapTurns();
        gameFlow.checkWinner(theGame);
    }
    return{
        setGame: function(){
            let Div = gameBoard.children 
            for(let i = 0; i < 9; i++){
                Div[i].addEventListener('click', updateBlock, {once : true})
            }
            player.setMarker()
        },
        
    }
})()




gameboard.setGame()