import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import rawMaterialsReducer from './slices/rawMaterialsSlice';
import productionLinesReducer from './slices/productionLinesSlice';
import employeesReducer from './slices/employeesSlice';
import ordersReducer from './slices/ordersSlice';
import qualityControlReducer from './slices/qualityControlSlice';
import suppliersReducer from './slices/suppliersSlice';
import customersReducer from './slices/customersSlice';
import productsReducer from './slices/productsSlice';
import categoriesReducer from './slices/categoriesSlice';
import accountsReducer from './slices/accountsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    rawMaterials: rawMaterialsReducer,
    productionLines: productionLinesReducer,
    employees: employeesReducer,
    orders: ordersReducer,
    qualityControl: qualityControlReducer,
    suppliers: suppliersReducer,
    customers: customersReducer,
    products: productsReducer,
    categories: categoriesReducer,
    accounts: accountsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
