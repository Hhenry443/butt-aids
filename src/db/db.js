import mysql from "mysql2/promise";

// Database pool setup using env variables
export const pool = mysql.createPool({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PSSWD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});