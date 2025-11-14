"use client";

import { useEffect, useState } from "react";

export default function RevenuePage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    source: "",
    amount: "",
    currency: "USD",
    notes: "",
  });

  // ===== Fetch Revenue Records =====
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/revenue");
      const data = await res.json();
      if (data.success) setList(data.data);
    }
    load();
  }, []);

  // ===== Save Revenue Entry =====
  async function saveEntry() {
    const res = await fetch("/api/revenue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("Revenue added!");
      setList((prev) => [data.data, ...prev]);
    } else {
      alert(data.message);
    }
  }

  // ===== Export CSV =====
  function exportCSV() {
    let csv = "Source,Amount,Currency,Notes,Date\n";

    list.forEach((row) => {
      csv += `${row.source},${row.amount},${row.currency},${row.notes || ""},${new Date(
        row.date
      ).toDateString()}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "revenue.csv";
    a.click();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "24px" }}>Revenue Dashboard</h1>

      {/* ===== FORM ===== */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Source"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
        />

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <select
          value={form.currency}
          onChange={(e) => setForm({ ...form, currency: e.target.value })}
        >
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="EUR">EUR</option>
          <option value="PKR">PKR</option>
        </select>

        <input
          type="text"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <button onClick={saveEntry}>Add Revenue</button>
      </div>

      {/* ===== EXPORT BUTTON ===== */}
      <button
        onClick={exportCSV}
        style={{ marginTop: "20px", padding: "10px", background: "black", color: "white" }}
      >
        Export CSV
      </button>

      {/* ===== TABLE ===== */}
      <div style={{ marginTop: "30px" }}>
        <h2>All Entries</h2>

        {list.length === 0 && <p>No revenue added yet.</p>}

        {list.map((row) => (
          <div
            key={row._id}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ccc",
              marginBottom: "10px",
            }}
          >
            <strong>{row.source}</strong> — {row.amount} {row.currency}
            <br />
            <small>{new Date(row.date).toLocaleString()}</small>
            {row.notes && (
              <p style={{ marginTop: "5px", opacity: 0.8 }}>Notes: {row.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
