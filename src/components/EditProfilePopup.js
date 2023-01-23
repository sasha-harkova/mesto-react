import PopupWithForm from "./PopupWithForm";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, button }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
  });

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

  function onSubmit() {
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
      onSubmit={handleSubmit(onSubmit)}
      onUpdateUser={onUpdateUser}
      button={button}
      isValid={isValid}
    >
      <input
        {...register("username", {
          required: "Поле обязательно к заполнению",
          minLength: {
            value: 2,
            message: "Минимум 2 символа",
          },
          maxLength: {
            value: 40,
            message: "Максимум 40 символов",
          },
        })}
        id="username"
        name="username"
        className={`popup__input popup__input_el_name ${
          errors.username && "popup__input_type_error"
        }`}
        type="text"
        placeholder="Введите имя"
        defaultValue={name}
        onChange={handleChangeName}
      />
      {errors.username && (
        <span className="popup__error_visible">
          {errors.username.message}
        </span>
      )}
      <input
        {...register("about", {
          required: "Поле обязательно к заполнению",
          minLength: {
            value: 2,
            message: "Минимум 2 символа",
          },
          maxLength: {
            value: 40,
            message: "Максимум 200 символов",
          },
        })}
        id="about"
        name="about"
        className={`popup__input popup__input_el_job ${
          errors.about && "popup__input_type_error"
        }`}
        type="text"
        placeholder="Расскажите о себе"
        defaultValue={description}
        onChange={handleChangeDescription}
      />
      {errors.about && (
        <span className="popup__error_visible">
          {errors.about.message}
        </span>
      )}
    </PopupWithForm>
  );
}

export default EditProfilePopup;
