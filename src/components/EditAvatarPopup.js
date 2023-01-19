import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();  
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    e.target.reset();
  } 

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen && "popup_opened"}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdateAvatar={onUpdateAvatar}
    >
      <input
        required
        id="avatarlink"
        name="avatarlink"
        className="popup__input"
        type="url"
        placeholder="Ссылка на новый аватар"
        defaultValue=""
        ref={avatarRef}
      />
      <span className="popup__error" id="avatarlink-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;