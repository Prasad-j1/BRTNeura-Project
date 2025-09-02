import React, { useRef } from 'react'
import '../style/CreateIdea.css'
import { useNavigate } from 'react-router-dom';

const CreateIdea = () => {

  const navigate = useNavigate()

  const titleRef = useRef()
  const impactRef = useRef()
  const effortRef = useRef()
  const statusRef = useRef()

  const handleCreateIdea = async () => {
  const NewIdea = {
    id: Date.now(),
    title: titleRef.current.value,
    impact: impactRef.current.value,
    effort: effortRef.current.value,
    status: statusRef.current.value,
    votes: 1,
  };

  console.log("Sending idea:", NewIdea);

  try {
    const res = await fetch("https://brtneura-project.onrender.com/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(NewIdea),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        `Error ${res.status}: ${errorData.detail || res.statusText}`
      );
    }

    const data = await res.json();
    console.log("Idea created:", data);
    alert("Idea created successfully!");
  } catch (err) {
    console.error("Create Idea failed:", err);
    alert("Failed to create idea: " + err.message);
  }
};

  return (
    <>
      <div className="header">
        <h1>BRTNeura Technology</h1>
      </div>

      <div className="create-idea-container">
        <h2>New Idea</h2>

        <form onSubmit={handleCreateIdea}>
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
