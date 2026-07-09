import Link from "next/link";
export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Expense Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Expenses</h2>
          <p className="text-3xl text-red-500 font-bold">₹12,500</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">This Month</h2>
          <p className="text-3xl text-green-500 font-bold">₹4,200</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Categories</h2>
          <p className="text-3xl text-blue-500 font-bold">5</p>
        </div>
      </div>

      <button className="bg-blue-600 text-white px-5 py-3 rounded-lg mb-8 hover:bg-blue-700">
        + Add Expense
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Expenses</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-center border-b">
              <td className="p-3">Groceries</td>
              <td>Food</td>
              <td>₹800</td>
              <td>09/07/2026</td>
            </tr>

            <tr className="text-center border-b">
              <td className="p-3">Petrol</td>
              <td>Travel</td>
              <td>₹1500</td>
              <td>08/07/2026</td>
            </tr>

            <tr className="text-center">
              <td className="p-3">Movie</td>
              <td>Entertainment</td>
              <td>₹500</td>
              <td>07/07/2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}