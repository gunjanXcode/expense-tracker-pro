import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Expense Tracker Pro</h1>

      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/add-expense">Add Expense</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/settings">Settings</Link>
      </div>
    </nav>
  );
}