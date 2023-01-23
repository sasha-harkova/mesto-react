import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";
import { useForm } from "react-hook-form";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, button }) {
  const avatarRef = useRef();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
  });

  const { ref, ...rest } = register('avatarlink', {
        required: "Поле обязательно к заполнению",
        pattern: {
          value:
            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
          message: "Укажите верную ссылку",
        }
})

  function onSubmit() {
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    reset();
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen && "popup_opened"}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      onUpdateAvatar={onUpdateAvatar}
      button={button}
      isValid={isValid}
    >
      <input {...rest}
        id="avatarlink"
        name="avatarlink"
        className={`popup__input popup__input_el_avatar ${
          errors.avatarlink && "popup__input_type_error"
        }`}
        type="url"
        placeholder="Ссылка на новый аватар"
        defaultValue=""
        ref={(e) => {
          ref(e);
          avatarRef.current = e;
        }}
      />
      {errors.avatarlink && (
        <span className="popup__error_visible" id="username-error">
          {errors.avatarlink.message}
        </span>
      )}
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
