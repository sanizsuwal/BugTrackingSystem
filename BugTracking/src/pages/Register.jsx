import { useState } from "react";
import axios from "../api/axiosInstance";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "User",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      alert("Registered successfully");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={submit}>
        <h2>Create Account</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <label>Role</label>
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="User">User</option>
          <option value="Developer">Developer</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
