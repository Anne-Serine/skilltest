import { InfoIcon, Pen, TrashIcon } from "lucide-react";
import { useCustomerStore } from "../hooks/Store";
import { useState } from "react";

function CustomerList() {
  const savedCustomers = useCustomerStore((state) => state.savedCustomers);
  const removeCustomer = useCustomerStore((state) => state.removeCustomer);
  const addNote = useCustomerStore((state) => state.addNote);

  const [notes, setNotes] = useState({});

  const handleNoteChange = (organisasjonsnummer, note) => {
    setNotes((previewNotes) => ({
      ...previewNotes,
      [organisasjonsnummer]: note,
    }));
  }

  const handleSaveNote = (organisasjonsnummer) => {
    addNote(organisasjonsnummer, notes[organisasjonsnummer] || "");
  }

  const handleRemove = (organisasjonsnummer) => {
    removeCustomer(organisasjonsnummer);
  }

  return (
    <div>
      {savedCustomers.length > 0 ? (
        <ul className="rounded-sm pt-5">
          {savedCustomers.map((customer) => (
            <li key={customer.organisasjonsnummer} className="overflow-hidden rounded-sm mb-2">
              <div className="flex justify-between w-full">
                <div className="bg-white w-full border p-2 ">
                  <div className="font-semibold text-sm">
                    {customer.navn}
                  </div>
                  <div className="text-sm">
                    {`org.nr: ${customer.organisasjonsnummer}`}
                  </div>
                </div>
                <div className="flex ">
                  <button className="bg-gray-50 border p-1 flex flex-col items-center justify-end text-sm w-[3rem]"><InfoIcon size={16} color="gray" /> Info</button>
                  <button className="bg-gray-50 border p-1 flex flex-col items-center justify-end text-sm w-[3rem]"><Pen size={16} color="darkblue" /> Notat</button>
                  <button className="bg-gray-50 border p-1 flex flex-col items-center justify-end text-sm w-[3rem]" onClick={() => handleRemove(customer.organisasjonsnummer)}><TrashIcon size={16} color="red" /> Slett</button>
                </div>
              </div>
              <div className="bg-gray-50 p-2 border">
              <textarea
                  value={notes[customer.organisasjonsnummer] || customer.note || ""}
                  onChange={(e) =>
                    handleNoteChange(customer.organisasjonsnummer, e.target.value)
                  }
                  placeholder="Her kan du legge til notat"
                  aria-label=""
                  className="w-full p-2 bg-transparent border"
                />
                <div className="flex gap-4 py-2">
                  <button
                    onClick={() => handleSaveNote(customer.organisasjonsnummer)}
                    className="bg-gray-50 border border-app-warn text-app-warn p-1 w-[5rem] rounded-sm"
                  >
                    Avbryt
                  </button>
                  <button
                    onClick={() => handleSaveNote(customer.organisasjonsnummer)}
                    className="bg-app-primary text-white p-1 w-[5rem] rounded-sm"
                  >
                    Lagre
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Du har ingen lagrede kunder.</p>
      )}
    </div>
  );
}

export default CustomerList;