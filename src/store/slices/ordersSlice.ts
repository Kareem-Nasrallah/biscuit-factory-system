import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ordersData from "@/mocks_data/orders.json";

export interface Order {
  id: string;
  orderNumber: string;
  client: string;
  clientAr: string;
  productionLineId: string;
  quantity: number;
  unit: string;
  status: "In Progress" | "Ready" | "Shipped";
  orderDate: string;
  deliveryDate: string;
  priority: "High" | "Medium" | "Low";
}

interface OrdersState {
  orders: Order[];
  deletedIds: string[];
}

const savedDeleted = localStorage.getItem("deletedOrders");
const savedEdited = localStorage.getItem("editedOrders");
const savedNew = localStorage.getItem("newOrders");

let initialOrders = [...ordersData] as Order[];

if (savedDeleted) {
  const deletedIds = JSON.parse(savedDeleted);
  initialOrders = initialOrders.filter((o) => !deletedIds.includes(o.id));
}

if (savedEdited) {
  const editedOrders = JSON.parse(savedEdited);
  editedOrders.forEach((edited: Order) => {
    const index = initialOrders.findIndex((o) => o.id === edited.id);
    if (index !== -1) {
      initialOrders[index] = edited;
    }
  });
}

if (savedNew) {
  const newOrders = JSON.parse(savedNew);
  initialOrders = [...initialOrders, ...newOrders];
}

const initialState: OrdersState = {
  orders: initialOrders,
  deletedIds: savedDeleted ? JSON.parse(savedDeleted) : [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      const newOrders = JSON.parse(localStorage.getItem("newOrders") || "[]");
      newOrders.push(action.payload);
      localStorage.setItem("newOrders", JSON.stringify(newOrders));
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex((o) => o.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
        const editedOrders = JSON.parse(
          localStorage.getItem("editedOrders") || "[]"
        );
        const editedIndex = editedOrders.findIndex(
          (o: Order) => o.id === action.payload.id
        );
        if (editedIndex !== -1) {
          editedOrders[editedIndex] = action.payload;
        } else {
          editedOrders.push(action.payload);
        }
        localStorage.setItem("editedOrders", JSON.stringify(editedOrders));
      }
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
      state.deletedIds.push(action.payload);
      localStorage.setItem("deletedOrders", JSON.stringify(state.deletedIds));
    },
  },
});

export const { addOrder, updateOrder, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
