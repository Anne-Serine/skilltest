import { create } from "zustand";

const useCustomers = create((set) => ({
  allCustomers: [],
  getAllCustomers: async (searchTerm) => {
    try {
      const isNumeric = Number(searchTerm);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}?${
          isNaN(isNumeric)
            ? "navn=" + searchTerm
            : "organisasjonsnummer=" + searchTerm
        }`
      );

      if (response.status === 200) {
        const data = await response.json();

        if (data._embedded && data._embedded.enheter) {
          set({ allCustomers: data._embedded.enheter });
          console.log(data._embedded.enheter.map((customer) => customer.navn));
        } else {
          console.error("Unexpected response structure:", data);
        }
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  },
}));

export default useCustomers;
