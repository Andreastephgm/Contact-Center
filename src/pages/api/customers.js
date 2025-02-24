import sqlite3 from 'sqlite3';

/**
 * Establish a connection to the customers database.
 * API handler to retrieve customer data based on optional wait time filtering.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */

const db = new sqlite3.Database('./src/Databases/customers.db', (err) => {
  if (err) {
    console.error('Error connecting to the database.', err.message);
  } else {
    console.log('Connected to the agents database.');
  }
});

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { waitTime } = req.query;


    if (!waitTime) {
      db.all('SELECT * FROM customers', (err, rows) => {
        if (err) {
          return res.status(500).json({ message: "Error querying the database." });
        }
        return res.status(200).json(rows); 
      });
    } else {
      const query = 'SELECT * FROM customers WHERE waitTime >= ?';
      const params = [Number(waitTime)];
      
      db.all(query, params, (err, rows) => {
        if (err) {
          return res.status(500).json({ message: "Error querying the database."  });
        }

        if (rows.length === 0) {
          return res.status(404).json({ message: 'No customers found with that wait time' });
        }

        return res.status(200).json(rows);
      });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed."});
  }
}

    