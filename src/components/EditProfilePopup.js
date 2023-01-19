import PopupWithForm from "./PopupWithForm";
import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen && "popup_opened"}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdateUser={onUpdateUser}
    >
      <input
        required
        minLength="2"
        maxLength="40"
        id="username"
        name="username"
        className="popup__input popup__input_el_name"
        type="text"
        placeholder="Введите имя"
        defaultValue={name}
        onChange={handleChangeName}
      />
      <span className="popup__error" id="username-error"></span>
      <input
        required
        minLength="2"
        maxLength="200"
        id="about"
        name="about"
        className="popup__input popup__input_el_job"
        type="text"
        placeholder="Расскажите о себе"
        defaultValue={description}
        onChange={handleChangeDescription}
      />
      <span className="popup__error" id="about-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
