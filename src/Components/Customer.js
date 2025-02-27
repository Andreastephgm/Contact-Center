
import { useState, useEffect } from "react";

/**
 * Customer Component
 * 
 * This component fetches and displays a list of customers from the API. 
 * Users can filter customers based on wait time.
 * 
 * @component
 */

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [waitTimeFilter, setWaitTimeFilter] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const filter = waitTimeFilter ? `waitTime=${Number(waitTimeFilter)}` : "";
        const url = filter ? `/api/customers?${filter}` : "/api/customers";

        const response = await fetch(url);
        if (!response.ok) throw new Error("Error loading customers");

        const newData = await response.json();

        setCustomers((prevCustomers) => {
          if (JSON.stringify(prevCustomers) === JSON.stringify(newData)) {
            return prevCustomers; 
          }
          return newData;
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCustomers();

    const interval = setInterval(fetchCustomers, 5000);
  
    return () => clearInterval(interval);
  }, [waitTimeFilter]);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full md:w-1/2">
      <h1 className="text-2xl font-bold text-neonGreen mb-4">Customers List</h1>

      {/* Filtro por tiempo de espera */}
      <div className="mb-4">
        <label className="block text-neonYellow font-semibold mb-2" htmlFor="waitTimeFilter">
          Filter by wait time:
        </label>
        <select
          id="waitTimeFilter"
          value={waitTimeFilter}
          onChange={(e) => setWaitTimeFilter(e.target.value)}
          className="p-2 bg-black text-neonGreen border border-neonYellow rounded"
        >
          <option value="">All</option>
          <option value="1">More than 1 minute</option>
          <option value="5">More than 5 minutes</option>
          <option value="7">More than 7 minutes</option>
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-3">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <li key={customer.id} className="p-3 bg-gray-800 rounded text-neonGreen">
              <strong>{customer.name}</strong> - Wait:{" "}
              <span className="text-neonYellow">{customer.waitTime}</span> min
            </li>
          ))
        ) : (
          <p className="text-neonYellow">No customers were found with that wait time.</p>
        )}
      </ul>
    </div>
  );
};

export default Customer;