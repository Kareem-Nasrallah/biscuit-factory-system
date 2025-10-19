import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import rawMaterialsData from "@/mocks_data/rawMaterials.json";

export interface RawMaterial {
  id: string;
  name: string;
  nameAr: string;
  quantity: number;
  unit: string;
  minStock: number;
  supplier: string;
  supplierAr: string;
  lastUpdated: string;
  createdAt: string;
  costPerUnit: number;
  price: number;
}

// statu
interface RawMaterialsState {
  materials: RawMaterial[];
  deletedIds: string[];
}

const savedDeleted = localStorage.getItem("deletedMaterials");
const savedEdited = localStorage.getItem("editedMaterials");
const savedNew = localStorage.getItem("newMaterials");

let initialMaterials = [...rawMaterialsData];

if (savedNew) {
  const newMaterials = JSON.parse(savedNew);
  initialMaterials = [...initialMaterials, ...newMaterials];
}

if (savedEdited) {
  const editedMaterials = JSON.parse(savedEdited);
  editedMaterials.forEach((edited: RawMaterial) => {
    const index = initialMaterials.findIndex((m) => m.id === edited.id);
    if (index !== -1) {
      initialMaterials[index] = edited;
    }
  });
}

if (savedDeleted) {
  const deletedIds = JSON.parse(savedDeleted);
  initialMaterials = initialMaterials.filter((m) => !deletedIds.includes(m.id));
}

const initialState: RawMaterialsState = {
  materials: initialMaterials,
  deletedIds: savedDeleted ? JSON.parse(savedDeleted) : [],
};

const rawMaterialsSlice = createSlice({
  name: "rawMaterials",
  initialState,
  reducers: {
    addMaterial: (state, action: PayloadAction<RawMaterial>) => {
      state.materials.push(action.payload);
      const newMaterials = JSON.parse(
        localStorage.getItem("newMaterials") || "[]"
      );
      newMaterials.push(action.payload);
      localStorage.setItem("newMaterials", JSON.stringify(newMaterials));
    },
    updateMaterial: (state, action: PayloadAction<RawMaterial>) => {
      const index = state.materials.findIndex(
        (m) => m.id === action.payload.id
      );
      if (index !== -1) {
        state.materials[index] = action.payload;
        const editedMaterials = JSON.parse(
          localStorage.getItem("editedMaterials") || "[]"
        );
        const editedIndex = editedMaterials.findIndex(
          (m: RawMaterial) => m.id === action.payload.id
        );
        if (editedIndex !== -1) {
          editedMaterials[editedIndex] = action.payload;
        } else {
          editedMaterials.push(action.payload);
        }
        localStorage.setItem(
          "editedMaterials",
          JSON.stringify(editedMaterials)
        );
      }
    },
    deleteMaterial: (state, action: PayloadAction<string>) => {
      console.log("state.materials befor", state.materials);
      state.materials = state.materials.filter((m) => m.id !== action.payload);
      console.log("state.materials after", state.materials);
      state.deletedIds.push(action.payload);
      localStorage.setItem(
        "deletedMaterials",
        JSON.stringify(state.deletedIds)
      );
      const newEditeds = JSON.parse(savedEdited)?.filter(
        (m) => !state.deletedIds.includes(m.id)
      );
      if (newEditeds) {
        localStorage.setItem("editedMaterials", JSON.stringify(newEditeds));
      }
      const newMaterials = JSON.parse(savedNew)?.filter(
        (m) => !state.deletedIds.includes(m.id)
      );
      if (newMaterials) {
        localStorage.setItem("newMaterials", JSON.stringify(newMaterials));
      }
    },
  },
});

export const { addMaterial, updateMaterial, deleteMaterial } =
  rawMaterialsSlice.actions;
export default rawMaterialsSlice.reducer;
