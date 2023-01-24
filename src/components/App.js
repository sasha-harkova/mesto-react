import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup"
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteConfirmationPopupOpen, setDeleteConfirmationPopupOpen] = useState(false);
  const [selectedCard, setPreviewCardPopupOpen] = useState(null);
  const [currentUser, getUserInfo] = useState("");
  const [deletingCard, getDeletingCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfoAndAvatar(), api.getInitialCards()])
      .then(([user, card]) => {
        getUserInfo(user);
        setCards(...cards, card)
      })
      .catch((error) => console.log(`Ошибка при получении информации с сервера: ${error}`))
  }, []); 

  function closeByEsc(evt) {
    if (evt.keyCode === 27) {
      closeAllPopups();
    }
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
    window.addEventListener("keydown", closeByEsc);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    window.addEventListener("keydown", closeByEsc);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
    window.addEventListener("keydown", closeByEsc);
  }

  function handleCardClick(card) {
    setPreviewCardPopupOpen(card);
    window.addEventListener("keydown", closeByEsc);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteConfirmationPopupOpen(false);
    setPreviewCardPopupOpen(null);
    getDeletingCard(null);
    window.removeEventListener("keydown", closeByEsc);
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

  function handleDeleteCardClick(card) {
    getDeletingCard(card);
    setDeleteConfirmationPopupOpen(true);
    window.addEventListener("keydown", closeByEsc);
  }

  function handleCardDelete(card) {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {        
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка при удалении карточки: ${error}`))
      .finally(() => setLoading(false));
  }

  function handleUpdateUser({ name, about }) {
    setLoading(true);
    api
      .setUserInfo({ name, about })
      .then((user) => {
        currentUser.name = user.name;
        currentUser.about = user.about;
        closeAllPopups();
      })
      .catch((error) =>
        console.log(`Ошибка при изменении информации о пользователе: ${error}`)
      )
      .finally(() => setLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setLoading(true);
    api
      .setAvatar({ avatar })
      .then((user) => {
        currentUser.avatar = user.avatar;
        closeAllPopups();
      })
      .catch((error) =>
        console.log(`Ошибка при изменении информации о пользователе: ${error}`)
      )
      .finally(() => setLoading(false));
  }

  function handleAddPlace({ name, link }) {
    setLoading(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) =>
        console.log(`Ошибка при добавлении карточки: ${error}`)
      )
      .finally(() => setLoading(false));
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
          onCardDelete={handleDeleteCardClick}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          button={isLoading && "Сохранение..."}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          button={isLoading && "Сохранение..."}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          button={isLoading ? "Создание..." : "Создать"}
        />
        <DeleteConfirmationPopup
          isOpen={isDeleteConfirmationPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={deletingCard}
          button={isLoading ? "Удаление..." : "Да"}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
