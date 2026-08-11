import {pool} from "./db.js";
import bcrypt from 'bcrypt';

// Used to simplify database creation across laptop and pc
export async function createTables() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id_user INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            role VARCHAR(50) NOT NULL DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log("Database created")
}

// This is used to get a specific user via their user id
export async function getUserById(id_user) {
    const [rows] = await pool.execute(
        "SELECT id_user, username, password_hash, role FROM users WHERE id_user = ?",
        [id_user]
    );
    return rows[0] ?? null; // note: rows is always an array, even for one result
}