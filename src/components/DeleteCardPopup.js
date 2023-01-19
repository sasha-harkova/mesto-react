import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onSubmit}) {

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   onDeleteCard(card);
  // }


  return (
    <PopupWithForm
      isOpen={isOpen && "popup_opened"}
      onClose={onClose}
      name="are-you-sure"
      title="Вы уверены?"
      button="Да"
      onSubmit={onSubmit}
      // onDeleteCard={onDeleteCard}
    />
  );
}

export default DeleteCardPopup;
