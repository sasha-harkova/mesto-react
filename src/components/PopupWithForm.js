function PopupWithForm({name, title, button, isOpen, onClose, children}) {

    return (
    <div className={`popup popup_type_${name} ${isOpen}`}>
        <div className="popup__container">
          <form className="popup__form" name={name} noValidate>
            <h2 className="popup__title">{title}</h2>
            <fieldset className="popup__inputs">
              {children}
            </fieldset>            
            <button className="popup__save-button" type="submit">{button || 'Сохранить'}</button>
          </form>
          <button
            className="popup__close-button"
            aria-label="Закрыть"
            type="button"
            onClick={onClose}
          ></button>
        </div>
      </div>
  )
}

export default PopupWithForm;