export default function Settings() {
  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <p>🌙 Theme: Light</p>
        <p>🔔 Notifications: Enabled</p>
        <p>🌍 Language: English</p>

        <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">
          Save Settings
        </button>
      </div>
    </main>
  );
}