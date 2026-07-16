"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line, } from "recharts";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);


 useEffect(() => {
  fetch("/api/expenses")
    .then((res) => res.json())
    .then((data) => {
      setExpenses(data);
      setLoading(false);
    });
}, []);

    if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold text-blue-600">
        Loading...
      </h1>
    </div>
  );
}

  const deleteExpense = async (id: number) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this expense?"
  );

  if (!confirmDelete) return;

  const response = await fetch(`/api/expenses/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
    alert("Expense deleted successfully!");
  } else {
    alert("Failed to delete expense.");
  }
};

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.title.toLowerCase().includes(search.toLowerCase()) ||
      expense.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
      selectedCategory === "All" ||
      expense.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });


   const chartData = Object.values(filteredExpenses.reduce((acc: any, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = {
          name: expense.category,
          amount: 0,  
        };
      }
      acc[expense.category].amount += expense.amount;
      return acc;
    }, {})
  );

      const COLORS = [
        "#0088FE", 
        "#00C49F", 
        "#FFBB28", 
        "#FF8042", 
        "#A569BD", 
        "#3FF560"
      ];

      const monthlyData = filteredExpenses.reduce((acc: any[], expense) => {
  const month = new Date(expense.date).toLocaleString("default", {
    month: "short",
  });

  const existing = acc.find((item) => item.month === month);

  if (existing) {
    existing.amount += expense.amount;
  } else {
    acc.push({
      month,
      amount: expense.amount,
    });
  }

  return acc;
}, []);
     
         const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(
    filteredExpenses.map((expense) => ({
      Title: expense.title,
      Category: expense.category,
      Amount: expense.amount,
      Date: new Date(expense.date).toLocaleDateString(),
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
  XLSX.writeFile(workbook, "Expense_Report.xlsx");
};

  const exportToPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Expense Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Title", "Category", "Amount", "Date"]],
    body: filteredExpenses.map((expense) => [
      expense.title,
      expense.category,
      `₹${expense.amount}`,
      new Date(expense.date).toLocaleDateString(),
    ]),
  });

  doc.save("Expense_Report.pdf");
};

const totalExpenses = filteredExpenses.reduce(
  (sum, expense) => sum + expense.amount,
  0
);

const thisMonthExpenses = filteredExpenses
  .filter((expense) => {
    const today = new Date();
    const expenseDate = new Date(expense.date);

    return (
      expenseDate.getMonth() === today.getMonth() &&
      expenseDate.getFullYear() === today.getFullYear()
    );
  })
  .reduce((sum, expense) => sum + expense.amount, 0);

const highestExpense =
  filteredExpenses.length > 0
    ? Math.max(...filteredExpenses.map((e) => e.amount))
    : 0;

const totalCategories = new Set(
  filteredExpenses.map((e) => e.category)
).size;
      
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Expense Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

  <div className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-gray-500 font-semibold">Total Expenses</h2>
    <p className="text-3xl font-bold text-red-600">
      ₹{totalExpenses}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-gray-500 font-semibold">This Month</h2>
    <p className="text-3xl font-bold text-green-600">
      ₹{thisMonthExpenses}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-gray-500 font-semibold">Highest Expense</h2>
    <p className="text-3xl font-bold text-orange-600">
      ₹{highestExpense}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-gray-500 font-semibold">Categories</h2>
    <p className="text-3xl font-bold text-blue-600">
      {totalCategories}
    </p>
  </div>

</div>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <Link href="/add-expense">
          <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
            + Add Expense
          </button>
        </Link>

        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
        >
          Export Excel
        </button>

        <button
          onClick={exportToPDF}
          className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700"
      >
          Export PDF
        </button>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search Expense..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
      </div>

       <div className="bg-white p-6 rounded-lg shadow mb-8">
  <h2 className="text-2xl font-bold mb-4">
    Monthly Expense Trend
  </h2>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={monthlyData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />

      <Line
        type="monotone"
        dataKey="amount"
        stroke="#2563eb"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Recent Expenses
        </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-bold mb-4">
      Expense by Category
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="name"
          outerRadius={100}
          label
        >
          {chartData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-bold mb-4">
      Expense Comparison
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar
          dataKey="amount"
          fill="#2563eb"
        />
      </BarChart>
    </ResponsiveContainer>
  </div>

</div>  

        <table className="w-full border">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No expenses found
                </td>
              </tr>
            ) : (
              filteredExpenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="text-center border-b"
                >
                  <td className="p-3">{expense.title}</td>
                  <td>{expense.category}</td>
                  <td>₹{expense.amount}</td>
                  <td>
                    {new Date(expense.date).toLocaleDateString()}
                  </td>

                  <td className="space-x-2">
                    <Link href={`/edit-expense/${expense.id}`}>
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};