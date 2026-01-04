import { useState } from "react";
import axios from "../api/axiosInstance";
import "./ReportBug.css";

const ReportBug = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    severity: 1,
    reproductionSteps: "",
  });

  const [files, setFiles] = useState([]);

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("severity", form.severity);
    data.append("reproductionSteps", form.reproductionSteps);

    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }

    try {
      await axios.post("/bugs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Bug reported successfully");
      setForm({
        title: "",
        description: "",
        severity: 1,
        reproductionSteps: "",
      });
      setFiles([]);
    } catch {
      alert("Failed to report bug");
    }
  };

  return (
    <div className="report-page">
      <form className="report-form" onSubmit={submit}>
        <h2>Report a Bug</h2>

        <label>Bug Title</label>
        <input
          type="text"
          placeholder="Enter bug title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <label>Description</label>
        <textarea
          placeholder="Describe the bug"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />

        <label>Severity</label>
        <select
          value={form.severity}
          onChange={(e) => setForm({ ...form, severity: e.target.value })}
        >
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
        </select>

        <label>Reproduction Steps</label>
        <textarea
          placeholder="Steps to reproduce the bug"
          value={form.reproductionSteps}
          onChange={(e) =>
            setForm({ ...form, reproductionSteps: e.target.value })
          }
        />

        <label>Attach Files</label>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />

        <button type="submit">Submit Bug</button>
      </form>
    </div>
  );
};

export default ReportBug;
