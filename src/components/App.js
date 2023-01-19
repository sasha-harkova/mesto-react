import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setPreviewCardPopupOpen] = useState(null);
  const [currentUser, getUserInfo] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfoAndAvatar()
      .then((data) => getUserInfo(data))
      .catch((error) =>
        console.log(
          `Ошибка при получении информации о пользователе с сервера: ${error}`
        )
      );
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((item) => setCards(...cards, item))
      .catch((error) => console.log(`Ошибка при получении карточек: ${error}`));
  }, []);

  useEffect(() => {
    function closePopupByEsc(evt) {
      if (evt.keyCode === 27) {
        closeAllPopups();
      }
    }
    window.addEventListener("keydown", closePopupByEsc);
    return () => window.removeEventListener("keydown", closePopupByEsc);
  }, []);

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
    setPreviewCardPopupOpen(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(`Ошибка при изменении лайка: ${error}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.log(`Ошибка при удалении карточки: ${error}`));
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((user) => {
        currentUser.name = user.name;
        currentUser.about = user.about;
        closeAllPopups();
      })
      .catch((error) =>
        console.log(`Ошибка при изменении информации о пользователе: ${error}`)
      );
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setAvatar({ avatar })
      .then((user) => {
        currentUser.avatar = user.avatar;
        closeAllPopups();
      })
      .catch((error) =>
        console.log(`Ошибка при изменении информации о пользователе: ${error}`)
      );
  }

  function handleAddPlace({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })        
      .catch((error) =>
        console.log(`Ошибка при добавлении карточки: ${error}`)
      );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardLike={handleCardLike}
          cards={cards}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <PopupWithForm name="are-you-sure" title="Вы уверены?" button="Да" onSubmit={handleCardDelete}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
