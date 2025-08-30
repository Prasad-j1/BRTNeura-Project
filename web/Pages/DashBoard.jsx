import React, { useState, useEffect } from 'react'
import '../style/DashBoard.css'
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate()
  const [ideas, setideas] = useState([])
  const [menu, setmenu] = useState('All')

  // fetch ideas from backend
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/ideas")
        const data = await res.json()
        setideas(data)
      } catch (error) {
        console.error("Error fetching ideas:", error)
      }
    }
    fetchIdeas()
  }, [])

  const filteredIdeas = menu === "All" ? ideas : ideas.filter((idea) => idea.status === menu);

  const handleVote = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/ideas/${id}/vote`, {
        method: "POST"
      });

      // refresh list
      const res = await fetch("http://127.0.0.1:8000/ideas")
      const data = await res.json()
      setideas(data)

    } catch (error) {
      console.error("Error voting:", error)
    }
  };

    const handleDelete = async (id) => {
      try {
        await fetch(`http://127.0.0.1:8000/ideas/${id}`, {
          method: "DELETE"
        });

        // Refresh ideas list after delete
        const res = await fetch("http://127.0.0.1:8000/ideas");
        const data = await res.json();
        setideas(data);

      } catch (error) {
        console.error("Error deleting idea:", error);
      }
    };



    
  return (
    <>
      <div className="header">
        <h1>BRTNeura Technology</h1>
      </div>

      <div className='dashboard'>
        <h1>DashBoard</h1>
        <div className="Top">
          <ul>
            <li onClick={() => setmenu("All")} className={menu === "All" ? "active" : ""}>
              All
              {menu === "All" && <div className="underline"></div>}
            </li>
            <li onClick={() => setmenu("Open")} className={menu === "Open" ? "active" : ""}>
              Open
              {menu === "Open" && <div className="underline"></div>}
            </li>
            <li onClick={() => setmenu("In Progress")} className={menu === "In Progress" ? "active" : ""}>
              In Progress
              {menu === "In Progress" && <div className="underline"></div>}
            </li>
            <li onClick={() => setmenu("Closed")} className={menu === "Closed" ? "active" : ""}>
              Closed
              {menu === "Closed" && <div className="underline"></div>}
            </li>
          </ul>
          <button onClick={() => navigate("/create-idea")}>Create Idea</button>
        </div>

        <div className="bottom">
          <table border={1} style={{ width: "100%", marginTop: "50px" }}>
            <thead>
              <tr>
                <th style={{ fontSize: "22px", padding: "19px 0px", fontWeight: "700" }}>Task Title</th>
                <th style={{ fontSize: "22px", padding: "19px 0px", fontWeight: "700" }}>Impact</th>
                <th style={{ fontSize: "22px", padding: "19px 0px", fontWeight: "700" }}>Effort</th>
                <th style={{ fontSize: "22px", padding: "19px 0px", fontWeight: "700" }}>Status</th>
                <th style={{ fontSize: "22px", padding: "19px 0px", fontWeight: "700" }}>Votes</th>
                <th style={{ fontSize: "22px", padding: "19px 0px", fontWeight: "700" }}>Action</th>
                <th style={{ fontSize: "22px", padding: "19px 0px", fontWeight: "700" }}>Vote</th>
              </tr>
            </thead>

            <tbody>
              {filteredIdeas.length > 0 ? (
                filteredIdeas.map((idea) => (
                  <tr key={idea.id}>
                    <td style={{ textAlign: "center", fontWeight: "500", padding: "13px 0px", fontSize: "19px" }}>
                      {idea.title}
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "500", padding: "13px 0px", fontSize: "19px" }}>
                      {idea.impact}
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "500", padding: "13px 0px", fontSize: "19px" }}>
                      {idea.effort}
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "500", padding: "13px 0px", fontSize: "19px" }}>
                      {idea.status}
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "500", padding: "13px 0px", fontSize: "19px" }}>
                      {idea.votes}
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "500", padding: "13px 0px", fontSize: "19px" }}>
                      <button id="deltebtn" onClick={() => handleDelete(idea.id)}>
                        Delete
                      </button>
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "500", padding: "13px 0px", fontSize: "19px" }}>
                      <button id="Votebtn" onClick={() => handleVote(idea.id)}>
                        Vote
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "20px 0px", fontSize: "22px", fontWeight: "600" }}>
                    No ideas found Click On Create Idea
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default DashBoard
