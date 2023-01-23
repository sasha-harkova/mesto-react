function PopupWithForm({name, title, button, isOpen, onClose, children, onSubmit, isValid }) {
  
    return (
      <div className={`popup popup_type_${name} ${isOpen}`} onClick={isOpen ? ((evt) => evt.target === evt.currentTarget && onClose()) : undefined }>
        <div className="popup__container">
          <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
            <h2 className="popup__title">{title}</h2>
            <fieldset className="popup__inputs">{children}</fieldset>
            <button className={`popup__save-button ${!isValid && 'popup__save-button_disabled'}`} type="submit" disabled={!isValid}>
              {button || "Сохранить"}
            </button>
          </form>
          <button
            className="popup__close-button"
            aria-label="Закрыть"
            type="button"
            onClick={onClose}            
          ></button>
        </div>
      </div>
    );
}

export default PopupWithForm;