import SQLite from 'react-native-sqlite-storage';

// Enable debug mode (Optional, for debugging purposes)
SQLite.DEBUG(true);
SQLite.enablePromise(true);

// Open the database
const database_name = 'UserDatabase.db'; // Name of the SQLite database file
const database_version = '1.0'; // Database version
const database_displayname = 'SQLite React Native User Database'; // Display name
const database_size = 200000; // Size of the database

const db = SQLite.openDatabase(
  {
    name: database_name,
    location: 'default', // 'default' for iOS, 'default' or 'Library' for Android
  },
  () => {
    console.log('Database opened successfully');
  },
  (error) => {
    console.log('Error opening database: ' + error);
  }
);

// Create User Table
export const createUserTable = () => {
  db.transaction((txn) => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        email VARCHAR(50),
        message TEXT
      );`,
      [],
      (sqlTxn, res) => {
        console.log('User table created successfully');
      },
      (error) => {
        console.log('Error creating users table: ' + error.message);
      }
    );
  });
};

// Insert User
export const insertUser = (name, email, message = '') => {
  db.transaction((txn) => {
    txn.executeSql(
      `INSERT INTO users (name, email, message) VALUES (?, ?, ?);`,
      [name, email, message],
      (sqlTxn, res) => {
        console.log(`User ${name} added successfully`);
      },
      (error) => {
        console.log('Error adding user: ' + error.message);
      }
    );
  });
};

// Fetch Users
export const getUsers = (setUsers) => {
  db.transaction((txn) => {
    txn.executeSql(
      `SELECT * FROM users;`,
      [],
      (sqlTxn, res) => {
        console.log('Users fetched successfully');
        let users = [];
        for (let i = 0; i < res.rows.length; i++) {
          let item = res.rows.item(i);
          users.push({ id: item.id, name: item.name, email: item.email, message: item.message });
        }
        setUsers(users);
      },
      (error) => {
        console.log('Error fetching users: ' + error.message);
      }
    );
  });
};

// Update User
export const updateUser = (id, name, email) => {
  db.transaction((txn) => {
    txn.executeSql(
      `UPDATE users SET name = ?, email = ? WHERE id = ?;`,
      [name, email, id],
      (sqlTxn, res) => {
        console.log(`User with ID ${id} updated successfully`);
      },
      (error) => {
        console.log('Error updating user: ' + error.message);
      }
    );
  });
};

// Delete User
export const deleteUser = (id) => {
  db.transaction((txn) => {
    txn.executeSql(
      `DELETE FROM users WHERE id = ?;`,
      [id],
      (sqlTxn, res) => {
        console.log(`User with ID ${id} deleted successfully`);
      },
      (error) => {
        console.log('Error deleting user: ' + error.message);
      }
    );
  });
};

// Initialize database and create tables
export const initializeDatabase = () => {
  createUserTable();
};

// Initialize the database on startup
initializeDatabase();

