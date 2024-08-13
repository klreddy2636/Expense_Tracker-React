import React from "react";
import ExpenseForm from "../components/ExpenseForm";
import { Expense } from "../types/types";
import "../styles/ExpenseFormPage.css";

const ExpenseFormPage: React.FC = () => {
  const handleAddExpense = (expense: Omit<Expense, "id">) => {
    // Handle the expense data here
    console.log("Expense added:", expense);
  };

  return (
    <div>
      <div className="expense-form-box">
        <h2>Add New Expense</h2>
        <ExpenseForm onAddExpense={handleAddExpense} />
      </div>
    </div>
  );
};

export default ExpenseFormPage;
