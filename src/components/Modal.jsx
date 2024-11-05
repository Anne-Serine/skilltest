import Button from "./Buttons";

function Modal({ dialogRef, customerNameToRemove, closeModal, confirmRemove }) {
  return (
    <dialog
      ref={dialogRef}
      className="bg-white max-w-[18rem] p-5 rounded-sm shadow-md"
    >
      <p>{`Er du sikker på at du vil fjerne ${customerNameToRemove} fra listen din?`}</p>
      <div className="flex gap-4 justify-center mt-4">
        <Button text="Avbryt" type="secondary" onClick={closeModal} />
        <Button text="OK" type="primary" onClick={confirmRemove} />
      </div>
    </dialog>
  );
}

export default Modal;
