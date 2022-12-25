import { useState, useEffect } from "react";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [cards, setCardsFromServer] = useState([]);

  useEffect(() => {
    api.getUserInfoAndAvatar()
      .then((user) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar)
      })
      .catch((error) => console.log(`Ошибка при получении информации о пользователе с сервера: ${error}`))    
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((item) => setCardsFromServer(...cards, item))
      .catch((error) => console.log(`Ошибка при получении карточек: ${error}`))
  }, [])

  

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar"
            src={userAvatar}
            alt="Аватар пользователя"
          />
        </div>
        <div className="profile__info-container">
          <div className="profile__username-container">
            <h1 className="profile__username">{userName}</h1>
            <button
              className="profile__edit-button"
              aria-label="Редактировать профиль"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__user-description">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          aria-label="Добавить изображение"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="content">
        {cards.map((item) => (
          <Card card={item} key={item._id} onCardClick={() => props.onCardClick(item)} />
        ))}
      </section>
    </main>
  );
}

export default Main;
