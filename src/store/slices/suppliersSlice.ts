import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import suppliersData from "@/mocks_data/suppliers.json";

interface Supplier {
  id: string;
  name: string;
  nameAr: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  addressAr: string;
  category: string;
  rating: number;
  suppliedMaterials: string[];
}

interface SuppliersState {
  suppliers: Supplier[];
}

const loadSuppliersFromStorage = (): Supplier[] => {
  const stored = localStorage.getItem("suppliers");
  if (stored) {
    const { added, deleted, updated } = JSON.parse(stored);
    let suppliers = suppliersData.filter(
      (s: Supplier) => !deleted.includes(s.id)
    );
    suppliers = suppliers.map((s: Supplier) => {
      const updatedSupplier = updated.find((u: Supplier) => u.id === s.id);
      return updatedSupplier || s;
    });
    return [...suppliers, ...added];
  }
  return suppliersData as Supplier[];
};

const initialState: SuppliersState = {
  suppliers: loadSuppliersFromStorage(),
};

const suppliersSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {
    addSupplier: (state, action: PayloadAction<Supplier>) => {
      state.suppliers.push(action.payload);
      const stored = JSON.parse(
        localStorage.getItem("suppliers") ||
          '{"added":[],"deleted":[],"updated":[]}'
      );
      stored.added.push(action.payload);
      localStorage.setItem("suppliers", JSON.stringify(stored));
    },
    updateSupplier: (state, action: PayloadAction<Supplier>) => {
      const index = state.suppliers.findIndex(
        (s) => s.id === action.payload.id
      );
      if (index !== -1) {
        state.suppliers[index] = action.payload;
        const stored = JSON.parse(
          localStorage.getItem("suppliers") ||
            '{"added":[],"deleted":[],"updated":[]}'
        );
        const updatedIndex = stored.updated.findIndex(
          (s: Supplier) => s.id === action.payload.id
        );
        if (updatedIndex !== -1) {
          stored.updated[updatedIndex] = action.payload;
        } else {
          stored.updated.push(action.payload);
        }
        localStorage.setItem("suppliers", JSON.stringify(stored));
      }
    },
    deleteSupplier: (state, action: PayloadAction<string>) => {
      state.suppliers = state.suppliers.filter((s) => s.id !== action.payload);
      const stored = JSON.parse(
        localStorage.getItem("suppliers") ||
          '{"added":[],"deleted":[],"updated":[]}'
      );
      stored.deleted.push(action.payload);
      stored.added = stored.added.filter(
        (s: Supplier) => s.id !== action.payload
      );
      localStorage.setItem("suppliers", JSON.stringify(stored));
    },
  },
});

export const { addSupplier, updateSupplier, deleteSupplier } =
  suppliersSlice.actions;
export default suppliersSlice.reducer;
