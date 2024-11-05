import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
          const customers = data._embedded.enheter.map(
            ({
              navn,
              organisasjonsnummer,
              hjemmeside,
              postadresse,
              stiftelsesdato,
              epostadresse,
              mobil,
            }) => ({
              navn,
              organisasjonsnummer,
              hjemmeside,
              postadresse,
              stiftelsesdato,
              epostadresse,
              mobil,
            })
          );
          set({ allCustomers: customers });
        }
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  },
}));

export default useCustomers;

// Save data in localStorage
export const useCustomerStore = create(
  persist(
    (set) => ({
      savedCustomers: [],

      saveCustomer: (customer) =>
        set((state) => {
          if (!customer || !customer.navn || !customer.organisasjonsnummer) {
            console.warn("invalid customer object", customer);
            return state;
          }
          return {
            savedCustomers: [...state.savedCustomers, customer],
          };
        }),

      addNote: (organisasjonsnummer, note) =>
        set((state) => ({
          savedCustomers: state.savedCustomers.map((customer) =>
            customer.organisasjonsnummer === organisasjonsnummer
              ? { ...customer, note }
              : customer
          ),
        })),

      removeCustomer: (organisasjonsnummer) =>
        set((state) => ({
          savedCustomers: state.savedCustomers.filter(
            (customer) => customer.organisasjonsnummer !== organisasjonsnummer
          ),
        })),
    }),
    {
      name: "saved-customers",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
