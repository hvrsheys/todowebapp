"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Item {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router  = useRouter();
  const [items,   setItems]   = useState<Item[]>([]);
  const [title,   setTitle]   = useState("");
  const [desc,    setDesc]    = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    const res  = await fetch("/api/items");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  async function createItem() {
    if (!title.trim()) return;
    await fetch("/api/items", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ title, description: desc }),
    });
    setTitle("");
    setDesc("");
    fetchItems();
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <main className="p-8 max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-black transition"
        >
          Log out
        </button>
      </div>

      {/* Create item form */}
      <div className="border rounded-lg p-6 space-y-3">
        <h2 className="font-semibold text-lg">Add Item</h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={createItem}
          className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
        >
          Save to MongoDB
        </button>
      </div>

      {/* Item list */}
      <div className="space-y-3">
        <h2 className="font-semibold text-lg">Items</h2>
        {loading && <p className="text-gray-500 text-sm">Loading...</p>}
        {!loading && items.length === 0 && (
          <p className="text-gray-500 text-sm">No items yet. Add one above.</p>
        )}
        {items.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{item.title}</h3>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                MongoDB
              </span>
            </div>
            {item.description && (
              <p className="text-sm text-gray-600">{item.description}</p>
            )}
            <p className="text-xs text-gray-400">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
