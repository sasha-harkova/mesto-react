function PopupWithForm(props) {

    return (
    <div className={`popup popup_type_${props.name} ${props.isOpen}`}>
        <div className="popup__container">
          <form className="popup__form" name={props.name} noValidate>
            <h2 className="popup__title">{props.title}</h2>
            <fieldset className="popup__inputs">
              {props.children}
            </fieldset>            
            <button className="popup__save-button" type="submit">{props.button}</button>
          </form>
          <button
            className="popup__close-button"
            aria-label="Закрыть"
            type="button"
            onClick={props.onClose}
          ></button>
        </div>
      </div>
  )
}

export default PopupWithForm;