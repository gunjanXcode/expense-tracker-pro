export default function Login() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

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

        <button className="bg-blue-600 text-white w-full p-3 rounded">
          Login
        </button>
      </div>
    </main>
  );
}