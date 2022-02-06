import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

const cards = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false }
];

function App() {
  const [gameCards, setGameCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setGameCards((prevGameCards) => {
          return prevGameCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
      }
      setTimeout(() => resetChoice(), 1000);
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffledCards = [...cards, ...cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setGameCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    console.log({ card });
  };

  const resetChoice = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="cards-grid">
        {gameCards.map((card) => (
          <Card
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={choiceOne === card || choiceTwo === card || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Number of turns: {turns}</p>
    </div>
  );
}

export default App;
