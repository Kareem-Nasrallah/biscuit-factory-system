import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import qualityControlData from "@/mocks_data/qualityControl.json";

export interface QualityControl {
  id: string;
  batchNumber: string;
  productionLineId: string;
  inspectionDate: string;
  inspectorId: string;
  quality: "A" | "B" | "Rejected";
  defectRate: number;
  notes: string;
  notesAr: string;
  approved: boolean;
}

interface QualityControlState {
  inspections: QualityControl[];
  deletedIds: string[];
}

const savedDeleted = localStorage.getItem("deletedQualityControl");
const savedEdited = localStorage.getItem("editedQualityControl");
const savedNew = localStorage.getItem("newQualityControl");

let initialInspections = [...qualityControlData] as QualityControl[];

if (savedDeleted) {
  const deletedIds = JSON.parse(savedDeleted);
  initialInspections = initialInspections.filter(
    (q) => !deletedIds.includes(q.id)
  );
}

if (savedEdited) {
  const editedInspections = JSON.parse(savedEdited);
  editedInspections.forEach((edited: QualityControl) => {
    const index = initialInspections.findIndex((q) => q.id === edited.id);
    if (index !== -1) {
      initialInspections[index] = edited;
    }
  });
}

if (savedNew) {
  const newInspections = JSON.parse(savedNew);
  initialInspections = [...initialInspections, ...newInspections];
}

const initialState: QualityControlState = {
  inspections: initialInspections,
  deletedIds: savedDeleted ? JSON.parse(savedDeleted) : [],
};

const qualityControlSlice = createSlice({
  name: "qualityControl",
  initialState,
  reducers: {
    addInspection: (state, action: PayloadAction<QualityControl>) => {
      state.inspections.push(action.payload);
      const newInspections = JSON.parse(
        localStorage.getItem("newQualityControl") || "[]"
      );
      newInspections.push(action.payload);
      localStorage.setItem("newQualityControl", JSON.stringify(newInspections));
    },
    updateInspection: (state, action: PayloadAction<QualityControl>) => {
      const index = state.inspections.findIndex(
        (q) => q.id === action.payload.id
      );
      if (index !== -1) {
        state.inspections[index] = action.payload;
        const editedInspections = JSON.parse(
          localStorage.getItem("editedQualityControl") || "[]"
        );
        const editedIndex = editedInspections.findIndex(
          (q: QualityControl) => q.id === action.payload.id
        );
        if (editedIndex !== -1) {
          editedInspections[editedIndex] = action.payload;
        } else {
          editedInspections.push(action.payload);
        }
        localStorage.setItem(
          "editedQualityControl",
          JSON.stringify(editedInspections)
        );
      }
    },
    deleteInspection: (state, action: PayloadAction<string>) => {
      state.inspections = state.inspections.filter(
        (q) => q.id !== action.payload
      );
      state.deletedIds.push(action.payload);
      localStorage.setItem(
        "deletedQualityControl",
        JSON.stringify(state.deletedIds)
      );
    },
  },
});

export const { addInspection, updateInspection, deleteInspection } =
  qualityControlSlice.actions;
export default qualityControlSlice.reducer;
