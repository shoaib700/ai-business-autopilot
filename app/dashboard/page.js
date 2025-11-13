"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form fields
  const [source, setSource] = useState("adsense");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  // Fetch revenue entries
  async function loadData() {
    try {
      const res = await fetch("/api/revenue");
      const data = await res.json();

      if (data.success) {
        setEntries(data.entries);
      }
    } catch (err) {
      console.log("Error loading revenue", err);
    } finally {
      setLoading(false);
    }
  }

  // Add new entry
  async function addRevenue(e) {
    e.preventDefault();

    const res = await fetch("/api/revenue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source, amount, notes }),
    });

    const data = await res.json();

    if (data.success) {
      setAmount("");
      setNotes("");
      loadData(); // refresh list
    } else {
      alert(data.message || "Error adding revenue");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Earnings Dashboard</h1>
      <p style={{ marginBottom: "20px", color: "#555" }}>
        Track AdSense & Affiliate earnings.
      </p>

      {/* Add Earning Form */}
      <form
        onSubmit={addRevenue}
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Add New Entry</h2>

        <label>Source:</label><br />
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        >
          <option value="adsense">AdSense</option>
          <option value="affiliate">Affiliate</option>
        </select>

        <label>Amount (USD):</label><br />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <label>Notes (optional):</label><br />
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "10px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add Entry
        </button>
      </form>

      {/* Earnings List */}
      <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>All Earnings</h2>

      {loading ? (
        <p>Loading...</p>
      ) : entries.length === 0 ? (
        <p>No earnings yet.</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {entries.map((e) => (
            <li
              key={e._id}
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                marginBottom: "8px",
                background: "#fafafa",
              }}
            >
              <strong>{e.source.toUpperCase()}</strong> — ${e.amount}
              <br />
              <small style={{ color: "#777" }}>
                {new Date(e.date).toLocaleString()}
              </small>
              {e.notes && (
                <p style={{ marginTop: "5px", color: "#444" }}>{e.notes}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
