import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import customersData from "@/mocks_data/customers.json";

interface Customer {
  id: string;
  name: string;
  nameAr: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  addressAr: string;
  type: string;
  creditLimit: number;
  outstanding: number;
  status: string;
}

interface CustomersState {
  customers: Customer[];
}

const loadCustomersFromStorage = (): Customer[] => {
  const stored = localStorage.getItem("customers");
  if (stored) {
    const { added, deleted, updated } = JSON.parse(stored);
    let customers = customersData.filter(
      (c: Customer) => !deleted.includes(c.id)
    );
    customers = customers.map((c: Customer) => {
      const updatedCustomer = updated.find((u: Customer) => u.id === c.id);
      return updatedCustomer || c;
    });
    return [...customers, ...added];
  }
  return customersData as Customer[];
};

const initialState: CustomersState = {
  customers: loadCustomersFromStorage(),
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
      const stored = JSON.parse(
        localStorage.getItem("customers") ||
          '{"added":[],"deleted":[],"updated":[]}'
      );
      stored.added.push(action.payload);
      localStorage.setItem("customers", JSON.stringify(stored));
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.customers[index] = action.payload;
        const stored = JSON.parse(
          localStorage.getItem("customers") ||
            '{"added":[],"deleted":[],"updated":[]}'
        );
        const updatedIndex = stored.updated.findIndex(
          (c: Customer) => c.id === action.payload.id
        );
        if (updatedIndex !== -1) {
          stored.updated[updatedIndex] = action.payload;
        } else {
          stored.updated.push(action.payload);
        }
        localStorage.setItem("customers", JSON.stringify(stored));
      }
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter((c) => c.id !== action.payload);
      const stored = JSON.parse(
        localStorage.getItem("customers") ||
          '{"added":[],"deleted":[],"updated":[]}'
      );
      stored.deleted.push(action.payload);
      stored.added = stored.added.filter(
        (c: Customer) => c.id !== action.payload
      );
      localStorage.setItem("customers", JSON.stringify(stored));
    },
  },
});

export const { addCustomer, updateCustomer, deleteCustomer } =
  customersSlice.actions;
export default customersSlice.reducer;
