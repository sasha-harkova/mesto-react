function ImagePopup({card, onClose}) {
  return(
    <div className={`popup popup_type_for-image ${card ? "popup_opened" : ''}`}>
    <figure className="popup__container-image">
      <img
        className="popup__image"
        src={card ? card.link : ''}
        alt={card ? `${card.name}. Иллюстрация` : ''}
      />
      <figcaption className="popup__place-name">{card ? card.name : ''}</figcaption>
      <button
        className="popup__close-button"
        aria-label="Закрыть"
        type="button"
        onClick={onClose}
      ></button>
    </figure>
  </div>
  )
}

export default ImagePopup;