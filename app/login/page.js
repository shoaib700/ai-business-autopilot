"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) window.location.href = "/dashboard";
    else alert(data.message);
  };

  return (
    <div style={{ padding: "50px", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>
      <input placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br/><br/>
      <input type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br/><br/>
      <button onClick={login}>Login</button>
    </div>
  );
}
