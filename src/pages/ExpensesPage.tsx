import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Expense } from "../types/types";
import ExpenseChart from "../components/ExpenseChart";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import "../styles/ExpensesPage.css";

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, "expenses"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedExpenses: Expense[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("User ID", user.uid);
          console.log("Fetched expense:", data); // Debugging log
          fetchedExpenses.push({ id: doc.id, ...data } as Expense);
        });
        console.log("All fetched expenses:", fetchedExpenses); // Debugging log
        setExpenses(fetchedExpenses);
      } else {
        console.error("No user authenticated"); // Debugging log
      }
    };

    fetchExpenses();
  }, []);

  const handleDownload = () => {
    const filteredExpenses = expenses.map((expense) => ({
      Name: expense.name,
      Amount: expense.amount,
      Date: new Date(expense.date).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredExpenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "Expenses.xlsx");
  };

  return (
    <div className="visualize-box">
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <>
          <ExpenseChart expenses={expenses} />
          <button onClick={handleDownload}>Download Expenses</button>
        </>
      )}
      <Link to="/">
        <button type="button">Home</button>
      </Link>
    </div>
  );
};

export default ExpensesPage;

/*
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Expense } from "../types/types";
import ExpenseChart from "../components/ExpenseChart";
import * as XLSX from "xlsx";

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, "expenses"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedExpenses: Expense[] = [];
        querySnapshot.forEach((doc) => {
          fetchedExpenses.push({ id: doc.id, ...doc.data() } as Expense);
        });
        setExpenses(fetchedExpenses);
      }
    };

    fetchExpenses();
  }, []);

  const handleDownload = () => {
    const filteredExpenses = expenses.map((expense) => ({
      Name: expense.name,
      Amount: expense.amount,
      Date: new Date(expense.date).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredExpenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "Expenses.xlsx");
  };

  return (
    <div>
      <h2>Expenses</h2>
      <ExpenseChart expenses={expenses} />
      <button onClick={handleDownload}>Download Expenses</button>
    </div>
  );
};

export default ExpensesPage;
*/

/*
// src/pages/ExpensesPage.tsx
import React, { useEffect, useState } from "react";
import ExpenseChart from "../components/ExpenseChart";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

interface Expense {
  id: string;
  name: string;
  amount: number;
  date: Date;
}

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchExpenses = async () => {
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, "expenses"));
          const fetchedExpenses = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Expense[];
          setExpenses(fetchedExpenses);
        } catch (error) {
          console.error("Error fetching expenses: ", error);
        }
      }
    };

    fetchExpenses();
  }, [user]);

  return (
    <div>
      <h1>Expenses Chart</h1>
      <ExpenseChart expenses={expenses} />
    </div>
  );
};

export default ExpensesPage;
*/
