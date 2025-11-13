import { useState } from "react";
import { Edit3, LogOut, Trash2, Save } from "lucide-react";

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Biloliddin Usmonjonov",
    email: "biloliddin@example.com",
    phone: "+998 90 123 45 67",
    bio: "Frontend dasturchi. React, Tailwind va JavaScript bo‘yicha mutaxassis.",
  });

  const [comments, setComments] = useState([
    { id: 1, text: "Bu loyiha juda foydali ekan!" },
    { id: 2, text: "Interfeys chiroyli va qulay 👍" },
  ]);

  const handleEdit = () => setEditing(!editing);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const handleLogout = () => {
    alert("Siz tizimdan chiqdingiz.");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center py-10 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-7xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Profil
          </h1>
          <div className="flex items-center gap-3">
            {editing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
              >
                <Save size={18} /> Saqlash
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                <Edit3 size={18} /> Tahrirlash
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              <LogOut size={18} /> Chiqish
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-sm">
              To‘liq ism
            </label>
            <input
              type="text"
              name="name"
              disabled={!editing}
              value={user.name}
              onChange={handleChange}
              className={`w-full mt-1 p-3 rounded-lg border ${
                editing
                  ? "border-blue-400 focus:ring-2 focus:ring-blue-300"
                  : "border-gray-200 dark:border-gray-700"
              } bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 outline-none transition`}
            />
          </div>

          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              disabled={!editing}
              value={user.email}
              onChange={handleChange}
              className={`w-full mt-1 p-3 rounded-lg border ${
                editing
                  ? "border-blue-400 focus:ring-2 focus:ring-blue-300"
                  : "border-gray-200 dark:border-gray-700"
              } bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 outline-none transition`}
            />
          </div>

          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-sm">
              Telefon raqam
            </label>
            <input
              type="text"
              name="phone"
              disabled={!editing}
              value={user.phone}
              onChange={handleChange}
              className={`w-full mt-1 p-3 rounded-lg border ${
                editing
                  ? "border-blue-400 focus:ring-2 focus:ring-blue-300"
                  : "border-gray-200 dark:border-gray-700"
              } bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 outline-none transition`}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-gray-500 dark:text-gray-400 text-sm">
              Bio
            </label>
            <textarea
              name="bio"
              disabled={!editing}
              value={user.bio}
              onChange={handleChange}
              className={`w-full mt-1 p-3 rounded-lg border ${
                editing
                  ? "border-blue-400 focus:ring-2 focus:ring-blue-300"
                  : "border-gray-200 dark:border-gray-700"
              } bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 outline-none resize-none transition`}
              rows="3"
            />
          </div>
        </div>

        {/* Comments */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Sizning sharhlaringiz
          </h2>
          <div className="space-y-3">
            {comments.length ? (
              comments.map((c) => (
                <div
                  key={c.id}
                  className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3"
                >
                  <p className="text-gray-700 dark:text-gray-300">{c.text}</p>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Siz hali sharh yozmagansiz 🙂
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
