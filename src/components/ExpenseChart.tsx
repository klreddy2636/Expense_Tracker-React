import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/ExpensesPage.css";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Expense {
  id: string;
  category: string;
  amount: number;
  date: Date;
}

interface ExpenseChartProps {
  expenses: Expense[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const parseDate = (dateString: string) => {
    return dateString ? new Date(dateString) : new Date(0);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      (!startDate || expenseDate >= parseDate(startDate)) &&
      (!endDate || expenseDate <= parseDate(endDate))
    );
  });

  const totalAmount = filteredExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  const data = {
    labels: filteredExpenses.map(
      (expense) =>
        `${expense.category} (${((expense.amount / totalAmount) * 100).toFixed(
          2
        )}%)`
    ),
    datasets: [
      {
        label: "Expenses",
        data: filteredExpenses.map((expense) => expense.amount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div>
      <div className="visualize-dates">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <Pie data={data} />
      <h3>Total Amount: {totalAmount}</h3>
    </div>
  );
};

export default ExpenseChart;

/*
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Expense {
  id: string;
  name: string;
  amount: number;
  date: Date;
}

interface ExpenseChartProps {
  expenses: Expense[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const data = {
    labels: expenses.map((expense) => expense.name),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return <Pie data={data} />;
};

export default ExpenseChart;
*/
