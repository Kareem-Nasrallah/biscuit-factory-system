import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import employeesData from "@/mocks_data/employees.json";

export interface Employee {
  id: string;
  name: string;
  nameAr: string;
  role: "Owner" | "Supervisor" | "Worker";
  shift: "Morning" | "Evening" | "Night";
  department: string;
  departmentAr: string;
  phone: string;
  email: string;
  hireDate: string;
  lastUpdated: string;
  attendance: "Present" | "Absent";
}

interface EmployeesState {
  employees: Employee[];
  deletedIds: string[];
}

const savedDeleted = localStorage.getItem("deletedEmployees");
const savedEdited = localStorage.getItem("editedEmployees");
const savedNew = localStorage.getItem("newEmployees");

let initialEmployees = [...employeesData] as Employee[];

if (savedNew) {
  const newEmployees = JSON.parse(savedNew);
  initialEmployees = [...initialEmployees, ...newEmployees];
}

if (savedEdited) {
  const editedEmployees = JSON.parse(savedEdited);
  editedEmployees.forEach((edited: Employee) => {
    const index = initialEmployees.findIndex((e) => e.id === edited.id);
    if (index !== -1) {
      initialEmployees[index] = edited;
    }
  });
}

if (savedDeleted) {
  const deletedIds = JSON.parse(savedDeleted);
  initialEmployees = initialEmployees.filter((e) => !deletedIds.includes(e.id));
}

const initialState: EmployeesState = {
  employees: initialEmployees,
  deletedIds: savedDeleted ? JSON.parse(savedDeleted) : [],
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
      const newEmployees = JSON.parse(
        localStorage.getItem("newEmployees") || "[]"
      );
      newEmployees.push(action.payload);
      localStorage.setItem("newEmployees", JSON.stringify(newEmployees));
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(
        (e) => e.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
        const editedEmployees = JSON.parse(
          localStorage.getItem("editedEmployees") || "[]"
        );
        const editedIndex = editedEmployees.findIndex(
          (e: Employee) => e.id === action.payload.id
        );
        if (editedIndex !== -1) {
          editedEmployees[editedIndex] = action.payload;
        } else {
          editedEmployees.push(action.payload);
        }
        localStorage.setItem(
          "editedEmployees",
          JSON.stringify(editedEmployees)
        );
      }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter((e) => e.id !== action.payload);
      state.deletedIds.push(action.payload);
      localStorage.setItem(
        "deletedEmployees",
        JSON.stringify(state.deletedIds)
      );
      const newEditeds = JSON.parse(savedEdited)?.filter(
        (m) => !state.deletedIds.includes(m.id)
      );
      if (newEditeds) {
        localStorage.setItem("editedEmployees", JSON.stringify(newEditeds));
      }
      const newMaterials = JSON.parse(savedNew)?.filter(
        (m) => !state.deletedIds.includes(m.id)
      );
      if (newMaterials) {
        localStorage.setItem("newEmployees", JSON.stringify(newMaterials));
      }
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } =
  employeesSlice.actions;
export default employeesSlice.reducer;
