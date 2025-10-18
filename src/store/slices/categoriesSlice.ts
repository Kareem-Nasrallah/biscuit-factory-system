import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import categoriesData from "@/mocks_data/categories.json";

interface Category {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  productCount: number;
  icon: string;
}

interface CategoriesState {
  categories: Category[];
}

const loadCategoriesFromStorage = (): Category[] => {
  const stored = localStorage.getItem("categories");
  if (stored) {
    const { added, deleted, updated } = JSON.parse(stored);
    let categories = categoriesData.filter(
      (c: Category) => !deleted.includes(c.id)
    );
    categories = categories.map((c: Category) => {
      const updatedCategory = updated.find((u: Category) => u.id === c.id);
      return updatedCategory || c;
    });
    return [...categories, ...added];
  }
  return categoriesData as Category[];
};

const initialState: CategoriesState = {
  categories: loadCategoriesFromStorage(),
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
      const stored = JSON.parse(
        localStorage.getItem("categories") ||
          '{"added":[],"deleted":[],"updated":[]}'
      );
      stored.added.push(action.payload);
      localStorage.setItem("categories", JSON.stringify(stored));
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
        const stored = JSON.parse(
          localStorage.getItem("categories") ||
            '{"added":[],"deleted":[],"updated":[]}'
        );
        const updatedIndex = stored.updated.findIndex(
          (c: Category) => c.id === action.payload.id
        );
        if (updatedIndex !== -1) {
          stored.updated[updatedIndex] = action.payload;
        } else {
          stored.updated.push(action.payload);
        }
        localStorage.setItem("categories", JSON.stringify(stored));
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload
      );
      const stored = JSON.parse(
        localStorage.getItem("categories") ||
          '{"added":[],"deleted":[],"updated":[]}'
      );
      stored.deleted.push(action.payload);
      stored.added = stored.added.filter(
        (c: Category) => c.id !== action.payload
      );
      localStorage.setItem("categories", JSON.stringify(stored));
    },
  },
});

export const { addCategory, updateCategory, deleteCategory } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
