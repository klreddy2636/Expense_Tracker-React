import React from "react";

interface Expense {
  id: string;
  name: string;
  amount: number;
  date: Date;
}

interface ExpenseItemProps {
  expense: Expense;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <li>
      <div>
        <h2>{expense.name}</h2>
        <div>{expense.amount}</div>
        <div>{expense.date.toDateString()}</div>
      </div>
    </li>
  );
};

export default ExpenseItem;
