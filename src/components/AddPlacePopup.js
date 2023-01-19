import PopupWithForm from "./PopupWithForm";
import { useState} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      button="Создать"
      isOpen={isOpen && "popup_opened"}
      onClose={onClose}
      onAddPlace={onAddPlace}
      onSubmit={handleSubmit}
    >
      <input
        required
        minLength="2"
        maxLength="30"
        id="cardname"
        name="cardname"
        className="popup__input popup__input_el_place-name"
        type="text"
        placeholder="Название"
        defaultValue=""
        onChange={handleChangeName}
      />
      <span className="popup__error" id="cardname-error"></span>
      <input
        required
        id="cardlink"
        name="cardlink"
        className="popup__input popup__input_el_link"
        type="url"
        placeholder="Ссылка на картинку"
        defaultValue=""
        onChange={handleChangeLink}
      />
      <span className="popup__error" id="cardlink-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
