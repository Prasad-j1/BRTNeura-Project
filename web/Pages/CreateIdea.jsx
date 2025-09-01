import React, { useRef } from 'react'
import '../style/CreateIdea.css'
import { useNavigate } from 'react-router-dom';

const CreateIdea = () => {

  const navigate = useNavigate()

  const titleRef = useRef()
  const impactRef = useRef()
  const effortRef = useRef()
  const statusRef = useRef()

  const handelonsubmit = async (e) => {
  e.preventDefault();

  const NewIdea = {
    id: Date.now(),   // unique id
    title: titleRef.current.value,
    impact: impactRef.current.value,
    effort: effortRef.current.value,
    status: statusRef.current.value,
    votes: 1
  };

  try {
    const res = await fetch("https://brtneura-project.onrender.com/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(NewIdea),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("API Error:", err);
      alert(err.detail || "Error creating idea");
      return;
    }

    navigate("/dashboard");
  } catch (error) {
    console.error("Network Error:", error);
    alert("Network/Server error: " + error.message);
  }
};

  return (
    <>
      <div className="header">
        <h1>BRTNeura Technology</h1>
      </div>

      <div className="create-idea-container">
        <h2>New Idea</h2>

        <form onSubmit={handelonsubmit}>
          <input
            className='text'
            type="text"
            ref={titleRef}
            placeholder="Enter Task Title"
            required
          />

          <label>Impact</label>
          <select ref={impactRef}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label>Effort</label>
          <select ref={effortRef}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label>Status</label>
          <select ref={statusRef}>
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>

          <button type="submit">Create Idea</button>
        </form>

        <p>Go Back To <a href="/dashboard">DashBoard</a></p>
      </div>
    </>
  )
}

export default CreateIdea
