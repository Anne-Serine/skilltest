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
        <div className="bg-white min-w-[15rem] w-full border rounded-t-sm sm:rounded-none sm:rounded-s-sm p-2 overflow-hidden break-words">
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
            aria-controls={`info-${customer.organisasjonsnummer}`}
            aria-expanded={openInfo === customer.organisasjonsnummer}
          />
          <Button
            text="Notat"
            icon={<Pen size={16} color="teal" />}
            type="tertiary"
            isActive={openNote === customer.organisasjonsnummer}
            onClick={() => toggleNote(customer.organisasjonsnummer)}
            aria-controls={`note-${customer.organisasjonsnummer}`}
            aria-expanded={openNote === customer.organisasjonsnummer}
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
        <div
          className="bg-gray-50 p-2 border"
          id={`note-${customer.organisasjonsnummer}`}
        >
          <textarea
            value={notes[customer.organisasjonsnummer] || customer.note || ""}
            onChange={(e) =>
              handleNoteChange(customer.organisasjonsnummer, e.target.value)
            }
            placeholder="Her kan du legge til notat"
            aria-label="Legg til notat"
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
        <div
          className="bg-gray-50 p-2 border"
          id={`info-${customer.organisasjonsnummer}`}
        >
          <dl className="flex flex-col gap-1 mb-4">
            <div className="text-sm flex gap-1">
              <dt className="font-semibold">Stiftelsesdato: </dt>
              <dd>{customer.stiftelsesdato || "Ikke oppgitt"}</dd>
            </div>
            {customer.hjemmeside ? (
              <div className="text-sm flex gap-1">
                <dt className="font-semibold">Hjemmeside:</dt>
                <dd>
                  <a
                    href={`https://${customer.hjemmeside}`}
                    className="text-sm text-cyan-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{customer.hjemmeside}</span>
                  </a>
                </dd>
              </div>
            ) : (
              <div className="text-sm flex gap-1">
                <dt className="font-semibold">Hjemmeside: </dt>
                <dd>Ikke oppgitt</dd>
              </div>
            )}
            <div className="text-sm flex gap-1">
              <dt className="font-semibold">Mobil: </dt>
              <dd>{customer.mobil || "Ikke oppgitt"}</dd>
            </div>
            <div className="text-sm flex gap-1">
              <dt className="font-semibold">Email: </dt>
              <dd>{customer.epostadresse || "Ikke oppgitt"}</dd>
            </div>

            {customer.postadresse ? (
              <div className="text-sm mt-3">
                <dt className="font-semibold flex flex-col">Postadresse:</dt>
                <dd>
                  <p>{customer.postadresse.adresse || "Ikke oppgitt"}</p>
                  <div className="flex gap-2">
                    <p>
                      {customer.postadresse.kommunenummer || "Ikke oppgitt"}
                    </p>
                    <p>{customer.postadresse.kommune || "Ikke oppgitt"}</p>
                  </div>
                  <p>{customer.postadresse.land || "Ikke oppgitt"}</p>
                </dd>
              </div>
            ) : (
              <div className="text-sm mt-3">
                <dt className="font-semibold">Postadresse: </dt>
                <dd>Ikke oppgitt</dd>
              </div>
            )}
          </dl>

          <Button
            text="Lukk"
            type="secondary"
            onClick={() => toggleInfo(customer.organisasjonsnummer)}
          />
        </div>
      )}
    </>
  );
}

export default SavedCustomer;
