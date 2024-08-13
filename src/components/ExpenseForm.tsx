import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Expense } from "../types/types";
import { Link } from "react-router-dom";

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, "id">) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const expenseData = {
        name,
        amount,
        date: new Date(date).toISOString(), // Ensure date is stored as a string
        userId: user.uid,
      };
      try {
        await addDoc(collection(db, "expenses"), expenseData);
        onAddExpense({ name, amount, date: new Date(date) });
        setName("");
        setAmount(0);
        setDate("");
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error adding expense: ", error);
        setError("Error adding expense. Please try again.");
      }
    } else {
      console.error("User not authenticated");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Expense</button>
      <Link to="/expenses">
        <button type="button">View All Expenses</button>
      </Link>
      <Link to="/">
        <button type="button">Home</button>
      </Link>
    </form>
  );
};

export default ExpenseForm;

/*
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

interface ExpenseFormProps {
  onAddExpense: (expense: { name: string; amount: number; date: Date }) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const expenseData = {
        name,
        amount: +amount,
        date: new Date(date),
        userId: user.uid,
      };

      onAddExpense(expenseData);
      try {
        await addDoc(collection(db, "expenses"), expenseData);
        setName("");
        setAmount("");
        setDate("");
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
*/
