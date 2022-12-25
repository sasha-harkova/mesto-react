import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setPreviewCardPopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setPreviewCardPopupOpen(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setPreviewCardPopupOpen(false);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onCardClick={handleCardClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <Footer />
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        button="Сохранить"
        isOpen={isEditProfilePopupOpen && "popup_opened"}
        onClose={closeAllPopups}
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
          defaultValue=""
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
          defaultValue=""
        />
        <span className="popup__error" id="about-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="add-card"
        title="Новое место"
        button="Создать"
        isOpen={isAddPlacePopupOpen && "popup_opened"}
        onClose={closeAllPopups}
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
        />
        <span className="popup__error" id="cardlink-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        button="Сохранить"
        isOpen={isEditAvatarPopupOpen && "popup_opened"}
        onClose={closeAllPopups}
      >
        <input
          required
          id="avatarlink"
          name="avatarlink"
          className="popup__input"
          type="url"
          placeholder="Ссылка на новый аватар"
          defaultValue=""
        />
        <span className="popup__error" id="avatarlink-error"></span>
      </PopupWithForm>
      <PopupWithForm name="are-you-sure" title="Вы уверены?" button="Да" />
      <ImagePopup
        card={selectedCard}
        isOpen={selectedCard !== false && "popup_opened"}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
