import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productsData from "@/mocks_data/products.json";

interface Product {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  sku: string;
  price: number;
  cost: number;
  unit: string;
  weight: string;
  shelfLife: number;
  barcode: string;
  image: string;
}

interface ProductsState {
  products: Product[];
}

const loadProductsFromStorage = (): Product[] => {
  const stored = localStorage.getItem("products");
  if (stored) {
    const { added, deleted, updated } = JSON.parse(stored);
    let products = productsData.filter((p: Product) => !deleted.includes(p.id));
    products = products.map((p: Product) => {
      const updatedProduct = updated.find((u: Product) => u.id === p.id);
      return updatedProduct || p;
    });
    return [...products, ...added];
  }
  return productsData as Product[];
};

const initialState: ProductsState = {
  products: loadProductsFromStorage(),
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      const stored = JSON.parse(
        localStorage.getItem("products") ||
          '{"added":[],"deleted":[],"updated":[]}'
      );
      stored.added.push(action.payload);
      localStorage.setItem("products", JSON.stringify(stored));
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        const stored = JSON.parse(
          localStorage.getItem("products") ||
            '{"added":[],"deleted":[],"updated":[]}'
        );
        const updatedIndex = stored.updated.findIndex(
          (p: Product) => p.id === action.payload.id
        );
        if (updatedIndex !== -1) {
          stored.updated[updatedIndex] = action.payload;
        } else {
          stored.updated.push(action.payload);
        }
        localStorage.setItem("products", JSON.stringify(stored));
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      const stored = JSON.parse(
        localStorage.getItem("products") ||
          '{"added":[],"deleted":[],"updated":[]}'
      );
      stored.deleted.push(action.payload);
      stored.added = stored.added.filter(
        (p: Product) => p.id !== action.payload
      );
      localStorage.setItem("products", JSON.stringify(stored));
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
