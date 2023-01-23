import PopupWithForm from "./PopupWithForm";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import СurrentCardContext from "../contexts/СurrentCardContext";

function DeleteConfirmationPopup({ isOpen, onClose, onDeleteCard, button }) {

  const currentCard = useContext(СurrentCardContext);
  const {
    formState: { isValid },
    handleSubmit,
  } = useForm();


  function onSubmit() {
    onDeleteCard(currentCard);
  }

  return (
    <PopupWithForm
      isOpen={isOpen && "popup_opened"}
      onClose={onClose}
      name="are-you-sure"
      title="Вы уверены?"
      button={button}
      onSubmit={handleSubmit(onSubmit)}
      onDeleteCard={onDeleteCard}
      isValid={isValid}
    />
  );
}

export default DeleteConfirmationPopup;
