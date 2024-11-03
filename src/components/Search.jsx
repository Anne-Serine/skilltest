import { useEffect, useState } from "react";
import useCustomers from "../hooks/Store";
import { Link } from "react-router-dom";

function Search() {
  const customers = useCustomers((state) => state.allCustomers);
  const getAllCustomers = useCustomers((state) => state.getAllCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

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
        <ul>
          {filteredCustomers.length ? (
            filteredCustomers.map((customer) => (
              <li key={customer.organisasjonsnummer}>
                <Link to="#">
                {customer.navn}
                </Link>
              </li>
            ))
          ) : (
            <li className="font-medium">Ingen resultat...</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Search;
