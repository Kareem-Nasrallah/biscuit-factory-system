import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import incomeData from "@/mocks_data/income.json";
import expensesData from "@/mocks_data/expenses.json";

interface Income {
  id: string;
  source: string;
  sourceAr: string;
  amount: number;
  date: string;
  month: string;
  category: string;
  notes: string;
  notesAr: string;
  invoiceNumber: string;
}

interface Expense {
  id: string;
  type: string;
  typeAr: string;
  amount: number;
  date: string;
  month: string;
  category: string;
  notes: string;
  notesAr: string;
  receiptNumber: string;
}

interface AccountsState {
  income: Income[];
  expenses: Expense[];
}

const loadIncomeFromStorage = (): Income[] => {
  const stored = localStorage.getItem("income");
  if (stored) {
    const { added, deleted, updated } = JSON.parse(stored);
    let income = incomeData.filter((i: Income) => !deleted.includes(i.id));
    income = income.map((i: Income) => {
      const updatedIncome = updated.find((u: Income) => u.id === i.id);
      return updatedIncome || i;
    });
    return [...income, ...added];
  }
  return incomeData as Income[];
};

const loadExpensesFromStorage = (): Expense[] => {
  const stored = localStorage.getItem("expenses");
  if (stored) {
    const { added, deleted, updated } = JSON.parse(stored);
    let expenses = expensesData.filter((e: Expense) => !deleted.includes(e.id));
    expenses = expenses.map((e: Expense) => {
      const updatedExpense = updated.find((u: Expense) => u.id === e.id);
      return updatedExpense || e;
    });
    return [...expenses, ...added];
  }
  return expensesData as Expense[];
};

const initialState: AccountsState = {
  income: loadIncomeFromStorage(),
  expenses: loadExpensesFromStorage(),
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addIncome: (state, action: PayloadAction<Income>) => {
      state.income.push(action.payload);
      const stored = JSON.parse(
        localStorage.getItem("income") ||
          '{"added":[],"deleted":[],"updated":[]}'
      );
      stored.added.push(action.payload);
      localStorage.setItem("income", JSON.stringify(stored));
    },
    updateIncome: (state, action: PayloadAction<Income>) => {
      const index = state.income.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.income[index] = action.payload;
        const stored = JSON.parse(
          localStorage.getItem("income") ||
            '{"added":[],"deleted":[],"updated":[]}'
        );
        const updatedIndex = stored.updated.findIndex(
          (i: Income) => i.id === action.payload.id
        );
        if (updatedIndex !== -1) {
          stored.updated[updatedIndex] = action.payload;
        } else {
          stored.updated.push(action.payload);
        }
        localStorage.setItem("income", JSON.stringify(stored));
      }
    },
    deleteIncome: (state, action: PayloadAction<string>) => {
      state.income = state.income.filter((i) => i.id !== action.payload);
      const stored = JSON.parse(
        localStorage.getItem("income") ||
          '{"added":[],"deleted":[],"updated":[]}'
      );
      stored.deleted.push(action.payload);
      stored.added = stored.added.filter(
        (i: Income) => i.id !== action.payload
      );
      localStorage.setItem("income", JSON.stringify(stored));
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
      const stored = JSON.parse(
        localStorage.getItem("expenses") ||
          '{"added":[],"deleted":[],"updated":[]}'
      );
      stored.added.push(action.payload);
      localStorage.setItem("expenses", JSON.stringify(stored));
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
        const stored = JSON.parse(
          localStorage.getItem("expenses") ||
            '{"added":[],"deleted":[],"updated":[]}'
        );
        const updatedIndex = stored.updated.findIndex(
          (e: Expense) => e.id === action.payload.id
        );
        if (updatedIndex !== -1) {
          stored.updated[updatedIndex] = action.payload;
        } else {
          stored.updated.push(action.payload);
        }
        localStorage.setItem("expenses", JSON.stringify(stored));
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter((e) => e.id !== action.payload);
      const stored = JSON.parse(
        localStorage.getItem("expenses") ||
          '{"added":[],"deleted":[],"updated":[]}'
      );
      stored.deleted.push(action.payload);
      stored.added = stored.added.filter(
        (e: Expense) => e.id !== action.payload
      );
      localStorage.setItem("expenses", JSON.stringify(stored));
    },
  },
});

export const {
  addIncome,
  updateIncome,
  deleteIncome,
  addExpense,
  updateExpense,
  deleteExpense,
} = accountsSlice.actions;
export default accountsSlice.reducer;
