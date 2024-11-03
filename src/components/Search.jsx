import { useEffect, useState } from "react";
import useCustomers from "../hooks/Store";
import Button from "./Buttons";
import { useCustomerStore } from "../hooks/Store";

function Search() {
  const customers = useCustomers((state) => state.allCustomers);
  const getAllCustomers = useCustomers((state) => state.getAllCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const saveCustomer = useCustomerStore((state) => state.saveCustomer);


  useEffect(() => {
    searchTerm.length > 0 && getAllCustomers(searchTerm);
  }, [getAllCustomers, searchTerm]);


  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = customers.filter(
        (customer) =>
          (customer.navn &&
            customer.navn.toLowerCase().includes(searchTerm.toLowerCase())) ||
          customer.organisasjonsnummer.includes(searchTerm)
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers([]);
    }
  }, [searchTerm, customers]);

  const handleSave = (customer) => {
    saveCustomer(customer);
  };

  return (
    <div>
      <div>
        <input
          type="search"
          placeholder="f.eks Appex / 995412020"
          id="searchInput"
          aria-label="search input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white p-2 border w-full border-app-primary rounded-sm text-black outline-none"
        />
      </div>
      {searchTerm && (
        <div className="bg-app-secondary mt-5 p-2 rounded-sm">
          <ul className="rounded-sm">
            {filteredCustomers.length ? (
              filteredCustomers.map((customer) => (
                <li
                  key={customer.organisasjonsnummer}
                  className="bg-white p-2 border rounded-sm flex justify-between items-center"
                >
                  <div>{customer.navn}</div>
                  <div>
                    <Button text="Lagre" onClick={() => handleSave(customer)}/>
                  </div>
                </li>
              ))
            ) : (
              <li className="font-medium">Ingen resultat...</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
