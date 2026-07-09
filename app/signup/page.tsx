export default function Signup() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Signup</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-4 rounded"
        />

        <button className="bg-green-600 text-white w-full p-3 rounded">
          Create Account
        </button>
      </div>
    </main>
  );
}