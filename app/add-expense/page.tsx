export default function AddExpense() {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[450px]">
        <h1 className="text-3xl font-bold text-center mb-6">
          Add Expense
        </h1>

        <input
          type="text"
          placeholder="Expense Title"
          className="border w-full p-3 rounded mb-4"
        />

        <input
          type="number"
          placeholder="Amount"
          className="border w-full p-3 rounded mb-4"
        />

        <select className="border w-full p-3 rounded mb-4">
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Entertainment</option>
        </select>

        <input
          type="date"
          className="border w-full p-3 rounded mb-4"
        />

        <button className="bg-blue-600 text-white w-full p-3 rounded-lg">
          Save Expense
        </button>
      </div>
    </main>
  );
}