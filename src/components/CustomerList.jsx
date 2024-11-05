import { useCustomerStore } from "../hooks/Store";
import { useRef, useState } from "react";
import SavedCustomer from "./SavedCustomer";
import Modal from "./Modal";

function CustomerList() {
  const savedCustomers = useCustomerStore((state) => state.savedCustomers);
  const removeCustomer = useCustomerStore((state) => state.removeCustomer);

  const [customerToRemove, setCustomerToRemove] = useState(null);
  const [customerNameToRemove, setCustomerNameToRemove] = useState("");

  const dialogRef = useRef(null);

  const openModal = (organisasjonsnummer, navn) => {
    setCustomerToRemove(organisasjonsnummer);
    setCustomerNameToRemove(navn);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    setCustomerToRemove(null);
    setCustomerNameToRemove("");
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const confirmRemove = () => {
    if (customerToRemove) {
      removeCustomer(customerToRemove);
      closeModal();
    }
  };

  return (
    <div>
      {savedCustomers.length > 0 ? (
        <>
          <ul className="rounded-sm">
            {savedCustomers.map((customer) => (
              <li
                key={customer.organisasjonsnummer}
                className="overflow-hidden rounded-sm mb-2"
              >
                <SavedCustomer customer={customer} openModal={openModal} />
              </li>
            ))}
          </ul>
          <Modal
            dialogRef={dialogRef}
            customerNameToRemove={customerNameToRemove}
            closeModal={closeModal}
            confirmRemove={confirmRemove}
          />
        </>
      ) : (
        <p className="bg-white p-2 rounded-sm">Du har ingen lagrede kunder.</p>
      )}
    </div>
  );
}

export default CustomerList;
