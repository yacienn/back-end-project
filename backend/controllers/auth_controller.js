import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';

// SIGN UP
export const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExist.rows.length > 0) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashPassword]
    );

    res.status(201).json({
      message: "user created successfully",
      user: newUser.rows[0]
    });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// LOG IN
export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({
        message: "user does not exist"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "wrong password"
      });
    }

    res.status(200).json({
      message: "welcome",
      user: email
    });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// GET USERS
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");

    res.json({
      message: "users:",
      users: result.rows
    });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
