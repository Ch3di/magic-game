import "./Card.css";
const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) handleChoice(card);
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front-card" src={card.src} alt="front of the card" />
        <img
          className="back-card"
          src="/img/cover.png"
          onClick={handleClick}
          alt="back of the card"
        />
      </div>
    </div>
  );
};

export default Card;
