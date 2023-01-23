import PopupWithForm from "./PopupWithForm";
import { useState} from "react";
import { useForm } from "react-hook-form";

function AddPlacePopup({ isOpen, onClose, onAddPlace, button }) {

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset
  } = useForm({
    mode: "all",
  });

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function onSubmit() {
    onAddPlace({ name, link });
    reset();
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      button={button}
      isOpen={isOpen && "popup_opened"}
      onClose={onClose}
      onAddPlace={onAddPlace}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
    >
      <input
        {...register("cardname", {
          required: "Поле обязательно к заполнению",
          minLength: {
            value: 2,
            message: "Минимум 2 символа",
          },
          maxLength: {
            value: 30,
            message: "Максимум 30 символов",
          },
        })}
        id="cardname"
        name="cardname"
        className={`popup__input popup__input_el_place-name ${
          errors.cardname && "popup__input_type_error"
        }`}
        type="text"
        placeholder="Назание"
        defaultValue=""
        onChange={handleChangeName}
      />
      {errors.cardname && (
        <span className="popup__error_visible">
          {errors.cardname.message}
        </span>
      )}
      <input
        {...register("cardlink", {
          required: "Поле обязательно к заполнению",
          pattern: {
            value:
              /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
            message: "Укажите верную ссылку",
          },
        })}
        id="cardlink"
        name="cardlink"
        className={`popup__input popup__input_el_link ${
          errors.cardlink && "popup__input_type_error"
        }`}
        type="url"
        placeholder="Ссылка на картинку"
        defaultValue=""
        onChange={handleChangeLink}
      />
      {errors.cardlink && (
        <span className="popup__error_visible">
          {errors.cardlink.message}
        </span>
      )}
    </PopupWithForm>
  );
}

export default AddPlacePopup;