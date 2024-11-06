import { InfoIcon, Pen, TrashIcon } from "lucide-react";
import Button from "./Buttons";
import { useState } from "react";
import { useCustomerStore } from "../hooks/Store";

function SavedCustomer({ customer, openModal }) {
  const [openNote, setOpenNote] = useState(null);
  const [openInfo, setOpenInfo] = useState(null);
  const [notes, setNotes] = useState({});
  const addNote = useCustomerStore((state) => state.addNote);

  const toggleNote = (organisasjonsnummer) => {
    setOpenInfo(null);
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
    setOpenNote(null);
    setOpenInfo((preview) =>
      preview === organisasjonsnummer ? null : organisasjonsnummer
    );
  };

  const handleSaveNote = (organisasjonsnummer) => {
    addNote(organisasjonsnummer, notes[organisasjonsnummer] || "");
  };

  return (
    <>
      <div className="flex flex-wrap sm:flex-nowrap justify-between w-full">
        <div className="bg-white min-w-[15rem]  w-full border p-2 overflow-hidden break-words">
          <div className="font-semibold">{customer.navn}</div>
          <div className="text-sm">
            {`org.nr: ${customer.organisasjonsnummer}`}
          </div>
        </div>
        <div className="flex w-full sm:w-auto">
          <Button
            text="Info"
            icon={<InfoIcon size={16} color="gray" />}
            type="tertiary"
            isActive={openInfo === customer.organisasjonsnummer}
            onClick={() => toggleInfo(customer.organisasjonsnummer)}
          />
          <Button
            text="Notat"
            icon={<Pen size={16} color="teal" />}
            type="tertiary"
            isActive={openNote === customer.organisasjonsnummer}
            onClick={() => toggleNote(customer.organisasjonsnummer)}
          />
          <Button
            text="Slett"
            icon={<TrashIcon size={16} color="red" />}
            type="tertiary"
            onClick={() =>
              openModal(customer.organisasjonsnummer, customer.navn)
            }
          />
        </div>
      </div>

      {openNote === customer.organisasjonsnummer && (
        <div className="bg-gray-50 p-2 border">
          <textarea
            value={notes[customer.organisasjonsnummer] || customer.note || ""}
            onChange={(e) =>
              handleNoteChange(customer.organisasjonsnummer, e.target.value)
            }
            placeholder="Her kan du legge til notat"
            aria-label="add note"
            className="w-full p-2 bg-transparent border"
          />
          <div className="flex gap-4 pt-4">
            <Button
              text="Avbryt"
              type="secondary"
              onClick={() => toggleNote(customer.organisasjonsnummer)}
            />
            <Button
              text="Lagre"
              onClick={() => handleSaveNote(customer.organisasjonsnummer)}
            />
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
              {customer.hjemmeside ? (
                <a
                  href={`https://${customer.hjemmeside}`}
                  className="text-sm text-cyan-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="font-semibold text-sm text-black">
                    Hjemmeside:{" "}
                  </span>
                  <span>{customer.hjemmeside}</span>
                </a>
              ) : (
                <p className="text-sm">
                  <span className="font-semibold text-black">Hjemmeside: </span>
                  Ikke oppgitt
                </p>
              )}
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
              <div className="text-sm mt-3">
                <span className="font-semibold flex flex-col">
                  Postadresse:{" "}
                </span>
                <p>{customer.postadresse.adresse || "Ikke oppgitt"}</p>
                <div className="flex gap-2">
                  <p>{customer.postadresse.kommunenummer || "Ikke oppgitt"}</p>
                  <p>{customer.postadresse.kommune || "Ikke oppgitt"}</p>
                </div>
                <p>{customer.postadresse.land || "Ikke oppgitt"}</p>
              </div>
            ) : (
              <p className="text-sm mt-3">
                <span className="font-semibold">Postadresse: </span>
                Ikke oppgitt
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              text="Lukk"
              type="secondary"
              onClick={() => toggleInfo(customer.organisasjonsnummer)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SavedCustomer;
