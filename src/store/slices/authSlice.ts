import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import usersData from "@/mocks_data/users.json";

interface User {
  id: string;
  username: string;
  role: "Owner" | "ProductionManager" | "InventoryManager";
  employeeId: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const savedUser = localStorage.getItem("user");
const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      console.log("whate the logein take", action.payload);
      const user = usersData.find(
        (u) =>
          u.username === action.payload.username &&
          u.password === action.payload.password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        state.user = userWithoutPassword as User;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
