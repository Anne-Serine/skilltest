import { InfoIcon, Pen, TrashIcon } from "lucide-react";
import { useCustomerStore } from "../hooks/Store";
import { useState } from "react";

function CustomerList() {
  const savedCustomers = useCustomerStore((state) => state.savedCustomers);
  const removeCustomer = useCustomerStore((state) => state.removeCustomer);
  const addNote = useCustomerStore((state) => state.addNote);

  const [openNote, setOpenNote] = useState(null);
  const [notes, setNotes] = useState({});
  const [openInfo, setOpenInfo] = useState(null);

  const toggleNote = (organisasjonsnummer) => {
    setOpenNote((preview) =>
      preview === organisasjonsnummer ? null : organisasjonsnummer
    );
  };

  const handleNoteChange = (organisasjonsnummer, note) => {
    setNotes((previewNotes) => ({
      ...previewNotes,
      [organisasjonsnummer]: note,
    }));
  };

  const toggleInfo = (organisasjonsnummer) => {
    setOpenInfo((preview) =>
      preview === organisasjonsnummer ? null : organisasjonsnummer
    );
  };

  const handleSaveNote = (organisasjonsnummer) => {
    addNote(organisasjonsnummer, notes[organisasjonsnummer] || "");
  };

  const handleRemove = (organisasjonsnummer) => {
    removeCustomer(organisasjonsnummer);
  };

  return (
    <div>
      {savedCustomers.length > 0 ? (
        <ul className="rounded-sm pt-5">
          {savedCustomers.map((customer) => (
            <li
              key={customer.organisasjonsnummer}
              className="overflow-hidden rounded-sm mb-2"
            >
              <div className="flex flex-wrap sm:flex-nowrap justify-between w-full">
                <div className="bg-white min-w-[15rem]  w-full border p-2 overflow-hidden break-words">
                  <div className="font-semibold text-sm">{customer.navn}</div>
                  <div className="text-sm">
                    {`org.nr: ${customer.organisasjonsnummer}`}
                  </div>
                </div>
                <div className="flex w-full sm:w-auto">
                  <button
                    className="bg-gray-50 border w-full p-1 flex flex-col gap-1 items-center justify-center text-sm sm:w-[3rem]"
                    onClick={() => toggleInfo(customer.organisasjonsnummer)}
                  >
                    <InfoIcon size={16} color="gray" /> Info
                  </button>
                  <button
                    className="bg-gray-50 border w-full p-1 flex flex-col gap-1 items-center justify-center text-sm sm:w-[3rem]"
                    onClick={() => toggleNote(customer.organisasjonsnummer)}
                  >
                    <Pen size={16} color="teal" /> Notat
                  </button>
                  <button
                    className="bg-gray-50 border w-full p-1 flex flex-col gap-1 items-center justify-center text-sm sm:w-[3rem]"
                    onClick={() => handleRemove(customer.organisasjonsnummer)}
                  >
                    <TrashIcon size={16} color="red" /> Slett
                  </button>
                </div>
              </div>

              {openNote === customer.organisasjonsnummer && (
                <div className="bg-gray-50 p-2 border">
                  <textarea
                    value={
                      notes[customer.organisasjonsnummer] || customer.note || ""
                    }
                    onChange={(e) =>
                      handleNoteChange(
                        customer.organisasjonsnummer,
                        e.target.value
                      )
                    }
                    placeholder="Her kan du legge til notat"
                    aria-label="add note"
                    className="w-full p-2 bg-transparent border"
                  />
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => toggleNote(customer.organisasjonsnummer)}
                      className="bg-gray-50 border border-app-warn text-app-warn p-1 w-[5rem] rounded-sm"
                    >
                      Avbryt
                    </button>
                    <button
                      onClick={() =>
                        handleSaveNote(customer.organisasjonsnummer)
                      }
                      className="bg-app-primary text-white p-1 w-[5rem] rounded-sm"
                    >
                      Lagre
                    </button>
                  </div>
                </div>
              )}

              {openInfo === customer.organisasjonsnummer && (
                <div className="bg-gray-50 p-2 border">
                  <div className="flex flex-col gap-1">
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">Stiftelsesdato: </span>
                        {customer.stiftelsesdato || "Ikke oppgitt"}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Hjemmeside: </span>
                        {customer.hjemmeside || "Ikke oppgitt"}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Mobil: </span>
                        {customer.mobil || "Ikke oppgitt"}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Email: </span>
                        {customer.epostadresse || "Ikke oppgitt"}
                      </p>
                    </div>
                    
                    {customer.postadresse ? (
                      <div className="text-sm">
                        <span className="font-semibold flex flex-col">Postadresse: </span>
                        <p>{customer.postadresse.adresse || "Ikke oppgitt"}</p>
                        <div className="flex gap-2">
                          <p>{customer.postadresse.kommunenummer || "Ikke oppgitt"}</p>
                          <p>{customer.postadresse.kommune || "Ikke oppgitt"}</p>
                        </div>
                        <p>{customer.postadresse.land || "Ikke oppgitt"}</p>
                      </div>
                    ) : (
                      <p className="text-sm">
                        <span className="font-semibold">Postadresse: </span>Ikke
                        oppgitt
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => toggleInfo(customer.organisasjonsnummer)}
                      className="bg-gray-50 border border-app-warn text-app-warn p-1 w-[5rem] rounded-sm"
                    >
                      Avbryt
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="bg-white p-2 rounded-sm">Du har ingen lagrede kunder.</p>
      )}
    </div>
  );
}

export default CustomerList;
