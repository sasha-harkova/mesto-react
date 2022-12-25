function Card(props) {

  function handleClick(card) {
    props.onCardClick(card);    
  }  

  return (
    <div className="content__card">
      <img
        className="content__photo"
        src={props.card.link}
        alt={`${props.card.name}. Иллюстрация`}
        onClick={() => handleClick(props.card)}
      />
      <div className="content__caption-container">
        <p className="content__place-name">{props.card.name}</p>
        <div className="content__like-container">
          <button
            className="content__like"
            aria-label="Поставить лайк на фото"
            type="button"
          ></button>
          <p className="content__like-sum">{props.card.likes.length}</p>
        </div>
      </div>
      <button
        className="content__delete"
        aria-label="Удалить фото"
        type="button"
      ></button>
    </div>
  );
}

export default Card