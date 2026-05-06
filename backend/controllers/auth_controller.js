import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';


const generateToken = (userId, username, email) => {
  return jwt.sign(
    { id: userId, username, email },
    process.env.JWT_SECRET,
    { expiresIn: '3d' }
  );
};

// sing_up 
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email and password are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'User with this email or username already exists.' });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

  
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, passwordHash]
    );
    const newUser = result.rows[0];

    // Generate JWT
    const token = generateToken(newUser.id, newUser.username, newUser.email);

    res.status(201).json({
      message: 'User created successfully',
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
      token
    });
  } catch (error) {
    console.error('SignUp error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// log_in
export const logIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Find user by email
    const result = await pool.query(
      'SELECT id, username, email, password_hash FROM users WHERE email = $1',
      [email]
    );
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Create JWT
    const token = generateToken(user.id, user.username, user.email);

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// regester 
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email, created_at FROM users ORDER BY id');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('GetUsers error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
