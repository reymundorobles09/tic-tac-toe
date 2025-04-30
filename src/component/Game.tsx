import { useEffect, useState } from 'react'
import Square from './Square';
import Player1 from '../assets/player1.png';
import Player2 from '../assets/player2.png';
import Fire from '../assets/fire.png';

type Score = {
  [key: string]: number
}
const INITIAL_GAME_STATE = ["","","","","","","","",""];
const INITIAL_SCORE: Score = { X: 0 , O: 0};
const WINNER_COMBO = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]

export default function Game() {

  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
  const [scores, setScores] = useState(INITIAL_SCORE);
  const resetBoard = () => setGameState(INITIAL_GAME_STATE)

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  const handleWon = () => {
    window.alert(`Congrats player ${currentPlayer}! You are the winner`)
    const newPlayerScore = scores[currentPlayer] + 1;
    const newScore = { ...scores};
    newScore[currentPlayer] = newPlayerScore;
    setScores(newScore)
    resetBoard();
  }

  const handleDraw = () => {
    window.alert(`The Game ended draw`)
    resetBoard();
  }

  const handleCellClick = (event: any) => {
    event.preventDefault();
    const cellIndex = Number(event.target.getAttribute("data-cell-index"))
    console.log('cellIndex',cellIndex)
    const currentValue = gameState[cellIndex];
    if(currentValue){
      return
    }

    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues)
  }

  const checkForWinner = () => {
    let roundWon = false

    for( let i = 0; i < WINNER_COMBO.length; i++){
      const winCombo = WINNER_COMBO[i];

      let a = gameState[winCombo[0]];
      let b = gameState[winCombo[1]];
      let c = gameState[winCombo[2]];
      
      if([a,b,c].includes("")){
        continue
      }
        

      if(a === b && b === c){
        roundWon = true
        break
      }
        
    }

    if(roundWon){
      setTimeout(()=>
        handleWon()
      ,100)
      return
    }
      

    if(!gameState.includes("")){
      setTimeout(()=>
        handleDraw()
      ,500)
      return
    }

    changePlayer()
      
  }
  
  const player1 = currentPlayer === "O" ? "opacity-75" : "";
  const player2 = currentPlayer === "X" ? "opacity-75" : "";

  useEffect(() => {
    checkForWinner();
  },[gameState])

  return (
    <div className={`h-screen bg-gradient-theme p-8 grid grid-cols-3 text-slate-800 `}>

      {/* <div className='content-center justify-items-center gap-2'>
        <img src={Player2} alt="" className='w-48' />

        <p className='text-2xl'>Next Player: <span>{currentPlayer}</span></p>
        <p className='text-1xl'>Player X wins <span>{scores["X"]}</span></p>
        <p className='text-1xl'>Player O wins <span>{scores["O"]}</span></p>
      </div> */}

      <div className={`content-center ${player1}  bg-gradient-primary justify-items-center gap-2`}>
        <div className='flex gap-2 -ms-5'>
        {scores["X"] >= 4 ? <img src={Fire} alt="" className='h-[3rem]' /> : ''}<p className='text-5xl mb-4'><span>{scores["X"]}</span></p>
        </div>
        <img src={Player2} alt="" className='w-48' />
        
        <p className='text-2xl mt-3'>Player X</p>
      </div>
      
      <div className={`content-center bg-gradient-theme border-y-4 `}>
        <h1 className="text-center text-5xl mb-4 text-display text-white">
          Tic Tac Toe
        </h1>
        <div className='grid grid-cols-3  mx-auto w-96'>
          { gameState.map((player, index) => (
            <Square 
            key={index} 
            onClick={handleCellClick}
            {...{index, player}}
            ></Square >
          )) }
        </div>
        
        <h1 className="text-center flex-row text-2xl mt-3 text-display text-white">
          Best of 5
        </h1>
        <div className='justify-self-center mt-3'>
          <button type="button" className='bg-primary text-lg rounded-xl p-1 w-24 transition duration-500 hover:scale-105 transform' onClick={() => { setScores(INITIAL_SCORE); resetBoard() }}>Reset</button>
        </div>
      </div>
      <div className={`content-center ${player2} bg-gradient-danger  justify-items-center gap-2`}>
        <div className='flex gap-2 -ms-5'>
        {scores["O"] >= 4 ? <img src={Fire} alt="" className='h-[3rem]' /> : ''}<p className='text-5xl mb-4'><span>{scores["O"]}</span></p>
        </div>
        <img src={Player1} alt="" className='w-48' />
        <p className='text-2xl mt-3'>Player O</p>
      </div>
    </div>
  )
}
