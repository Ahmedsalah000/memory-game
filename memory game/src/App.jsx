import { useState, useEffect } from 'react'
import './App.css'

import img1 from './assets/1.jpg'
import sound1 from './assets/f10.mp3'
import img2 from './assets/2.jpg'
import sound2 from './assets/f1.mp3'
import img3 from './assets/3.jpg'
import sound3 from './assets/f7.mp3'
import img4 from './assets/4.jpg'
import sound4 from './assets/f3.mp3'
import img5 from './assets/5.jpg'
import sound5 from './assets/f2.mp3'
import img6 from './assets/6.jpg'
import sound6 from './assets/f4.mp3'
import img7 from './assets/7.jpg'
import sound7 from './assets/f5.mp3'
import img8 from './assets/8.jpg'
import sound8 from './assets/f6.mp3'


import flipSound from './assets/flipcard-91468.mp3'
import matchSound from './assets/515095-Computer_sound-Menu-Success.wav'

function App() {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])


  const flipAudio = new Audio(flipSound)
  const matchAudio = new Audio(matchSound)

  useEffect(() => {

    const cardData = [
      { image: img1, sound: new Audio(sound1) },
      { image: img2, sound: new Audio(sound2) },
      { image: img3, sound: new Audio(sound3) },
      { image: img4, sound: new Audio(sound4) },
      { image: img5, sound: new Audio(sound5) },
      { image: img6, sound: new Audio(sound6) },
      { image: img7, sound: new Audio(sound7) },
      { image: img8, sound: new Audio(sound8) },

    ]
    const shuffledCards = [...cardData, ...cardData]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ id: index, ...card, isFlipped: false }))
    setCards(shuffledCards)
  }, [])

  const handleCardClick = (id) => {
    if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id)) return;

    flipAudio.play()    

    const clickedCard = cards.find(card => card.id === id)
    clickedCard.sound.play() 

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      if (firstCard.image === secondCard.image) {
        matchAudio.play()    
        setMatchedCards([...matchedCards, firstCardId, secondCardId]);
      }

      setTimeout(() => setFlippedCards([]), 1000);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-8">لعبة الذاكرة</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl w-full">
        {cards.map(card => (
          <div
            key={card.id}
            className={`aspect-square bg-blue-500 flex items-center justify-center cursor-pointer rounded-lg shadow-md transition-all duration-300 overflow-hidden
              ${(flippedCards.includes(card.id) || matchedCards.includes(card.id)) ? 'bg-white' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            {(flippedCards.includes(card.id) || matchedCards.includes(card.id)) && (
              <img src={card.image} alt="صورة البطاقة" className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App