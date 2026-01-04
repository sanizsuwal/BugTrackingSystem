import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import "./BugList.css";

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [search, setSearch] = useState("");

  const loadBugs = async () => {
    const res = await axios.get(`/bugs/search?keyword=${search}`);
    setBugs(res.data);
  };

  useEffect(() => {
    loadBugs();
  }, []);

  const assignBug = async (id) => {
    await axios.post(`/bugs/${id}/assign`);
    loadBugs();
  };

  return (
    <div className="buglist-page">
      <div className="buglist-container">
        <h2>Bug List</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search bugs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={loadBugs}>Search</button>
        </div>

        <div className="bug-list">
          {bugs.length === 0 && (
            <p className="no-bugs">No bugs found</p>
          )}

          {bugs.map((bug) => (
            <div key={bug.id} className="bug-card">
              <div className="bug-header">
                <h4>{bug.title}</h4>
                <span className={`severity severity-${bug.severity}`}>
                  {bug.severity === 1
                    ? "Low"
                    : bug.severity === 2
                    ? "Medium"
                    : "High"}
                </span>
              </div>

              <button
                className="assign-btn"
                onClick={() => assignBug(bug.id)}
              >
                Assign to me
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BugList;
