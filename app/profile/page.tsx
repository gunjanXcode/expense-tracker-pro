export default function Profile() {
  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <p><strong>Name:</strong> Gunjan Bokde</p>
        <p><strong>Email:</strong> your-email@example.com</p>

        <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">
          Edit Profile
        </button>
      </div>
    </main>
  );
}