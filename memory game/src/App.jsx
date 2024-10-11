import { useState, useEffect, useCallback } from 'react'
import './App.css'

import img1 from './assets/1.jpg'
import img2 from './assets/2.jpg'
import img3 from './assets/3.jpg'
import img4 from './assets/4.jpg'
import img5 from './assets/5.jpg'
import img6 from './assets/6.jpg'
import img7 from './assets/7.jpg'
import img8 from './assets/8.jpg'
import img9 from './assets/9.jpg'
import img10 from './assets/10.jpg'

import cardBackImage from './assets/b.jpeg' 
import flipSound from './assets/good morning.mp3'     
import mismatchSound from './assets/b.mp3'     
import matchSound from './assets/515095-Computer_sound-Menu-Success.wav'
import startGameSound from './assets/start.mp3'
import successSound from './assets/success.mp3'
import failureSound from './assets/failure.mp3'

function App() {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [timer, setTimer] = useState(60)    
  const [gameOver, setGameOver] = useState(false)

  const flipAudio = new Audio(flipSound)
  const mismatchAudio = new Audio(mismatchSound)
  const matchAudio = new Audio(matchSound)
  const startAudio = new Audio(startGameSound)
  const successAudio = new Audio(successSound)
  const failureAudio = new Audio(failureSound)

  const shuffleCards = useCallback(() => {
    const cardData = [
      { image: img1 },
      { image: img2 },
      { image: img3 },
      { image: img4 },
      { image: img5 },
      { image: img6 },
      { image: img7 },
      { image: img8 },
      { image: img9 },
      { image: img10 },
    ]
    const shuffledCards = [...cardData, ...cardData]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ id: index, ...card, isFlipped: false }))
    setCards(shuffledCards)
  }, [])

  useEffect(() => {
    shuffleCards()
  }, [shuffleCards])

  useEffect(() => {
    let interval
    if (gameStarted && !gameOver && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0 && !gameOver) {
      setGameOver(true)
      failureAudio.play()
    }
    return () => clearInterval(interval)
  }, [gameStarted, gameOver, timer])

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameOver(true)
      successAudio.play()
    }
  }, [matchedCards, cards])

  const handleCardClick = (id) => {
    if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id) || gameOver) return;

    if (flippedCards.length === 0) {
      flipAudio.play()       
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      if (firstCard.image === secondCard.image) {
        matchAudio.play()  
        setMatchedCards([...matchedCards, firstCardId, secondCardId]);
      } else {
        setTimeout(() => {
          mismatchAudio.play()  
        }, 500)  
      }

      setTimeout(() => setFlippedCards([]), 1000);
    }
  }

  const startGame = () => {
    startAudio.play()
    setGameStarted(true)
    setTimer(60)
    setGameOver(false)
    setMatchedCards([])
    setFlippedCards([])
    shuffleCards() // إضافة هذا السطر
  }

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-center mb-8"> يا  مرحب  بالحكومة</h1>
        <button 
          onClick={startGame}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-110"
        >
          ابدأ اللعبة
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-2 sm:p-4">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-4 sm:mb-8">لعبة الذاكرة</h1>
      <div className="mb-4 text-xl font-bold">الوقت المتبقي: {timer} ثانية</div>
      {gameOver && (
        <div className="mb-4 text-xl font-bold">
          {matchedCards.length === cards.length ? "مبروك  يافالح " : "انتهى الوقت! جرب تاني يأخي أنت خسران حاجة."}
        </div>
      )}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl w-full">
        {cards.map(card => (
          <div
            key={card.id}
            className={`aspect-square flex items-center justify-center cursor-pointer rounded-lg shadow-md transition-all duration-300 overflow-hidden relative`}
            onClick={() => handleCardClick(card.id)}
          >
            <img 
              src={card.image}
              alt="صورة البطاقة"
              className={`w-full h-full object-cover transition-opacity duration-300
                ${(flippedCards.includes(card.id) || matchedCards.includes(card.id)) ? 'opacity-100' : 'opacity-0'}`}
            />
            <img 
              src={cardBackImage}
              alt="خلفية البطاقة"
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300
                ${(flippedCards.includes(card.id) || matchedCards.includes(card.id)) ? 'opacity-0' : 'opacity-70'}`}
            />
          </div>
        ))}
      </div>
      {gameOver && (
        <button 
          onClick={startGame}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-110"
        >
          العب كمان  مرة 
        </button>
      )}
    </div>
  )
}

export default App