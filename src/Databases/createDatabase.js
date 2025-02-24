const sqlite3 = require('sqlite3').verbose();

const db2 = new sqlite3.Database('./customers.db', (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos de clientes:', err.message);
  } else {
    console.log('Conexión a la base de datos de clientes establecida');
  }
});

db2.serialize(() => {
  db2.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      waitTime INTEGER
    )
  `);

  db2.get('SELECT COUNT(*) AS count FROM customers', (err, row) => {
    if (row.count === 0) {
      db2.run(`
        INSERT INTO customers (name, waitTime)
        VALUES 
        ('Carlos Ruiz', 6),
        ('Maria López', 10),
        ('José Pérez', 3)
      `, (err) => {
        if (err) {
          console.error('Error al insertar datos en la tabla customers:', err.message);
        } else {
          console.log('Datos de ejemplo insertados en la tabla customers');
        }
      });
    }
  });
});

db2.close((err) => {
  if (err) {
    console.error('Error al cerrar la base de datos de clientes:', err.message);
  } else {
    console.log('Conexión a la base de datos de clientes cerrada');
  }
});
