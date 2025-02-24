import sqlite3 from 'sqlite3';

/**
 * API Handler for Agents Database
 *
 * This API endpoint connects to the SQLite database and retrieves agent data.
 * It allows filtering agents by their status through query parameters.
 *
 * @param {Object} req - The request object, containing query parameters.
 * @param {Object} res - The response object used to return data or errors.
 *
 * Query Parameters:
 * - status (optional): Filters agents by their status.
 *
 * Responses:
 * - 200: Returns an array of agents (filtered by status if provided).
 * - 500: Returns an error message if a database query fails.
 * - 405: Returns an error message if the request method is not allowed.
 */

const db = new sqlite3.Database('./src/Databases/agents.db', (err) => {
  if (err) {
    console.error('Error connecting to the database.', err.message);
  } else {
    console.log('Connected to the agents database.');
  }
});

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { status } = req.query;
    let query = 'SELECT * FROM agents';
    const params = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    db.all(query, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ message: "Error querying the database." });
      }
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No agents found with that wait time' });
      }
      res.status(200).json(rows);
    });
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}



