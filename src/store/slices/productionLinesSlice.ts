import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productionLinesData from "@/mocks_data/productionLines.json";

export interface ProductionLine {
  id: string;
  name: string;
  nameAr: string;
  status: "Running" | "Stopped" | "Maintenance";
  capacity: number;
  currentProduction: number;
  efficiency: number;
  lastMaintenance: string;
  nextMaintenance: string;
  operatorId: string;
  shift: string;
}

interface ProductionLinesState {
  lines: ProductionLine[];
  deletedIds: string[];
}

const savedDeleted = localStorage.getItem("deletedProductionLines");
const savedEdited = localStorage.getItem("editedProductionLines");
const savedNew = localStorage.getItem("newProductionLines");

let initialLines = [...productionLinesData] as ProductionLine[];

if (savedDeleted) {
  const deletedIds = JSON.parse(savedDeleted);
  initialLines = initialLines.filter((l) => !deletedIds.includes(l.id));
}

if (savedEdited) {
  const editedLines = JSON.parse(savedEdited);
  editedLines.forEach((edited: ProductionLine) => {
    const index = initialLines.findIndex((l) => l.id === edited.id);
    if (index !== -1) {
      initialLines[index] = edited;
    }
  });
}

if (savedNew) {
  const newLines = JSON.parse(savedNew);
  initialLines = [...initialLines, ...newLines];
}

const initialState: ProductionLinesState = {
  lines: initialLines,
  deletedIds: savedDeleted ? JSON.parse(savedDeleted) : [],
};

const productionLinesSlice = createSlice({
  name: "productionLines",
  initialState,
  reducers: {
    addProductionLine: (state, action: PayloadAction<ProductionLine>) => {
      state.lines.push(action.payload);
      const newLines = JSON.parse(
        localStorage.getItem("newProductionLines") || "[]"
      );
      newLines.push(action.payload);
      localStorage.setItem("newProductionLines", JSON.stringify(newLines));
    },
    updateProductionLine: (state, action: PayloadAction<ProductionLine>) => {
      const index = state.lines.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) {
        state.lines[index] = action.payload;
        const editedLines = JSON.parse(
          localStorage.getItem("editedProductionLines") || "[]"
        );
        const editedIndex = editedLines.findIndex(
          (l: ProductionLine) => l.id === action.payload.id
        );
        if (editedIndex !== -1) {
          editedLines[editedIndex] = action.payload;
        } else {
          editedLines.push(action.payload);
        }
        localStorage.setItem(
          "editedProductionLines",
          JSON.stringify(editedLines)
        );
      }
    },
    deleteProductionLine: (state, action: PayloadAction<string>) => {
      state.lines = state.lines.filter((l) => l.id !== action.payload);
      state.deletedIds.push(action.payload);
      localStorage.setItem(
        "deletedProductionLines",
        JSON.stringify(state.deletedIds)
      );
    },
  },
});

export const { addProductionLine, updateProductionLine, deleteProductionLine } =
  productionLinesSlice.actions;
export default productionLinesSlice.reducer;
