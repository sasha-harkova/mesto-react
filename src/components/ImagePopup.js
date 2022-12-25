function ImagePopup(props) {
  return(
    <div className={`popup popup_type_for-image ${props.isOpen}`}>
    <figure className="popup__container-image">
      <img
        className="popup__image"
        src={props.card.link}
        alt={`${props.card.name}. Иллюстрация`}
      />
      <figcaption className="popup__place-name">{props.card.name}</figcaption>
      <button
        className="popup__close-button"
        aria-label="Закрыть"
        type="button"
        onClick={props.onClose}
      ></button>
    </figure>
  </div>
  )
}

export default ImagePopup;