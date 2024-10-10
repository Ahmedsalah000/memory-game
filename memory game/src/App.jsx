import { useState, useEffect } from 'react'
import './App.css'

// استيراد الصور
import img1 from './assets/1.jpg'
import img2 from './assets/2.jpg'
import img3 from './assets/3.jpg'
import img4 from './assets/4.jpg'
import img5 from './assets/5.jpg'
import img6 from './assets/6.jpg'
import img7 from './assets/7.jpg'
import img8 from './assets/8.jpg'

// ... استمر في استيراد باقي الصور

function App() {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])

  useEffect(() => {
    // توليد البطاقات باستخدام الصور
    const cardImages = [img1, img2, img3, img4,img5,img6,img7,img8 /* ... باقي الصور */]
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({ id: index, image, isFlipped: false }))
    setCards(shuffledCards)
  }, [])

  const handleCardClick = (id) => {
    if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id)) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      if (firstCard.image === secondCard.image) {
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