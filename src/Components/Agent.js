import { useState, useEffect } from "react";

/**
 * Agent Component
 * 
 * This component fetches and displays a list of agents with an optional filter based on their status.
 * It allows users to filter agents by their availability status and shows loading and error states.
 */

const Agent = () => {
  const [agents, setAgents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const url = statusFilter ? `/api/agents?status=${statusFilter}` : "/api/agents";
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error loading agents.");
        }

        const newData = await response.json();

        setAgents((prevAgents) => {
          if (JSON.stringify(prevAgents) === JSON.stringify(newData)) {
            return prevAgents;
          }
          return newData; 
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAgents(); 

    const interval = setInterval(fetchAgents, 5000); 
  
    return () => clearInterval(interval); 
  }, [statusFilter]);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full md:w-1/2">
      <h1 className="text-2xl font-bold text-neonBlue mb-4">Agents List</h1>

      <div className="mb-4">
        <label className="block text-neonYellow font-semibold mb-2" htmlFor="statusFilter">
          Filter by status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 bg-black text-neonGreen border border-neonYellow rounded"
        >
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="on-call">On-Call</option>
          <option value="break">Break</option>
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-3">
        {agents.length > 0 ? (
          agents.map((agent) => (
            <li
              key={agent.id}
              className="p-3 bg-gray-800 rounded text-neonGreen transition-all duration-300"
            >
              <strong>{agent.name}</strong> - Status: {agent.status} - Wait:{" "}
              <span className="text-neonYellow">{agent.waitTime}</span> min
            </li>
          ))
        ) : (
          <p className="text-neonYellow">No agents were found with that wait time.</p>
        )}
      </ul>
    </div>
  );
};

export default Agent;


