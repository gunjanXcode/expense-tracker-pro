export default function Home() {
  return(
    <main className="min-h-screenbg-gray-100 flex-col justify-center items-center">
      <h1 className="text-5x1 font-bold text-blue-600">Expense Tracker Pro</h1>
      <p className="text-x1 mt-4 text-gray-700">
        Track your daily expenses easily.
      </p>
      <button className="mt-8bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Get Started
      </button>
    </main>
  );
}