"use client";

import { useEffect, useState } from "react";

export default function RevenueDashboard() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    source: "adsense",
    amount: "",
    currency: "USD",
    notes: "",
    date: "",
  });

  // Load revenue records
  useEffect(() => {
    fetch("/api/revenue")
      .then(r => r.json())
      .then(d => setList(d.data || []));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function saveEntry() {
    const res = await fetch("/api/revenue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      alert("Revenue added!");
      setList(prev => [data.data, ...prev]);
    } else {
      alert(data.message);
    }
  }

  // ========== AI Prediction ==========

  // ========== Summary ==========
  const total = list.reduce((a, b) => a + b.amount, 0);
  const monthly = total / (list.length || 1);

  // ========== CSV Export ==========
  function exportCSV() {
    let csv = "Source,Amount,Currency,Notes,Date\n";
    list.forEach(row => {
      csv += `${row.source},${row.amount},${row.currency},${row.notes || ""},${new Date(row.date).toDateString()}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "revenue.csv";
    a.click();
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-4">💰 Earnings Dashboard</h1>

      {/* AI Prediction Box */}
      <div className="p-4 bg-blue-100 rounded mb-6">
        <h2 className="text-xl font-semibold">🤖 AI Earnings Prediction</h2>
        <p><strong>Next 30 Days Forecast:</strong> ${ai.forecast.toFixed(2)}</p>
        <p><strong>Growth Trend:</strong> {ai.growth.toFixed(1)}%</p>
        <p><strong>AI Suggestion:</strong> {ai.suggestion}</p>
      </div>

      {/* Summary Box */}
      <div className="p-4 bg-green-100 rounded mb-6">
        <h2 className="text-xl font-semibold">📊 Summary</h2>
        <p><strong>Total Earnings:</strong> ${total}</p>
        <p><strong>Avg Per Entry:</strong> ${monthly.toFixed(2)}</p>
        <p><strong>Total Entries:</strong> {list.length}</p>
      </div>

      {/* Add Revenue Form */}
      <div className="p-4 bg-gray-100 rounded mb-6">
        <h2 className="text-xl font-semibold">➕ Add Revenue Entry</h2>

        <select name="source" className="border p-2 w-full mt-2" onChange={handleChange}>
          <option value="adsense">AdSense</option>
          <option value="affiliate">Affiliate</option>
        </select>

        <input name="amount" type="number" placeholder="Amount" className="border p-2 w-full mt-2" onChange={handleChange} />
        <input name="currency" type="text" defaultValue="USD" className="border p-2 w-full mt-2" onChange={handleChange} />
        <input name="notes" type="text" placeholder="Notes" className="border p-2 w-full mt-2" onChange={handleChange} />
        <input name="date" type="date" className="border p-2 w-full mt-2" onChange={handleChange} />

        <button onClick={saveEntry} className="mt-3 p-2 bg-black text-white rounded w-full">
          Save Entry
        </button>
      </div>

      {/* Export Button */}
      <button onClick={exportCSV} className="p-3 bg-yellow-400 rounded font-bold w-full mb-6">
        📥 Export CSV
      </button>

      {/* Recent Entries */}
      <h2 className="text-xl font-semibold mb-2">📅 Recent Earnings</h2>

      {list.map((r, i) => (
        <div key={i} className="border p-3 rounded mb-2 bg-white">
          <p><strong>{r.source.toUpperCase()}</strong> — ${r.amount}</p>
          <p>{r.notes}</p>
          <p className="text-sm text-gray-500">{new Date(r.date).toDateString()}</p>
        </div>
      ))}

    </div>
  );
}
