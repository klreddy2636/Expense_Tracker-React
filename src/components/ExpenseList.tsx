import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import ExpenseItem from "./ExpenseItem";

interface Expense {
  id: string;
  name: string;
  amount: number;
  date: Date;
}

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const q = query(
          collection(db, "expenses"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const expensesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Expense[];
        setExpenses(expensesData);
      };
      fetchData();
    }
  }, [user]);

  return (
    <ul>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </ul>
  );
};

export default ExpenseList;
