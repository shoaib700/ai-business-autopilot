"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function RevenueDashboard() {
  const [entries, setEntries] = useState([]);
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("adsense");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadRevenue();
  }, []);

  async function loadRevenue() {
    const res = await axios.get("/api/revenue");
    setEntries(res.data.data || []);
  }

  async function addRevenue() {
    if (!amount) return alert("Enter amount.");

    await axios.post("/api/revenue", {
      source,
      amount,
      notes,
    });

    setAmount("");
    setNotes("");
    loadRevenue();
  }

  const total = entries.reduce((sum, e) => sum + e.amount, 0);
  const adsenseTotal = entries
    .filter((e) => e.source === "adsense")
    .reduce((a, b) => a + b.amount, 0);
  const affiliateTotal = entries
    .filter((e) => e.source === "affiliate")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Revenue Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded-lg">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-2xl font-bold">${total}</p>
        </div>

        <div className="p-4 bg-green-100 rounded-lg">
          <h2 className="text-xl font-semibold">AdSense Revenue</h2>
          <p className="text-2xl font-bold">${adsenseTotal}</p>
        </div>

        <div className="p-4 bg-yellow-100 rounded-lg">
          <h2 className="text-xl font-semibold">Affiliate Revenue</h2>
          <p className="text-2xl font-bold">${affiliateTotal}</p>
        </div>
      </div>

      {/* Add Revenue */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Add Revenue Entry</h2>

        <div className="flex flex-col gap-2">
          <select
            className="border p-2 rounded"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="adsense">AdSense</option>
            <option value="affiliate">Affiliate</option>
          </select>

          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button
            onClick={addRevenue}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Add Entry
          </button>
        </div>
      </div>

      {/* Entries List */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-3">All Entries</h2>
        <div className="space-y-2">
          {entries.map((e) => (
            <div key={e._id} className="p-3 border rounded">
              <p>
                <b>{e.source.toUpperCase()}:</b> ${e.amount}
              </p>
              {e.notes && <p className="text-sm">📝 {e.notes}</p>}
              <p className="text-xs text-gray-600">
                {new Date(e.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
