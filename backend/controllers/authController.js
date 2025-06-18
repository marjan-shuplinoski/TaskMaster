import User from '../models/User.js';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

export const register = async (req, res) => {
  // Validation handled by validate middleware
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'Email already in use' });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      message: 'Registration successful',
    });
  } catch (err) {
    console.error('Register error:', err);
    if (err && err.message && err.message.match(/failed to connect|ECONNREFUSED|MongoNetworkError|topology was destroyed|not connected/i)) {
      return res.status(503).json({ message: 'MongoDB not connected' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  // Validation handled by validate middleware
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'changeme',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        preferences: user.preferences,
        createdAt: user.createdAt,
      },
      message: 'Login successful',
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = (req, res) => {
  // If using JWT in HttpOnly cookie:
  res.clearCookie('token', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
  return res.status(200).json({ message: 'Logout successful' });
  // If using stateless JWT (no cookie), just return success:
  // return res.status(200).json({ message: 'Logout successful' });
};

export const me = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  const { _id, name, email, avatar, preferences, role, createdAt, updatedAt } = req.user;
  res.status(200).json({
    user: { _id, name, email, avatar, preferences, role, createdAt, updatedAt }
  });
};

export const updateProfile = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  const { name, email, avatar } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (name) user.name = name;
    if (email) user.email = email;
    if (avatar !== undefined) user.avatar = avatar;
    await user.save();
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        preferences: user.preferences,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      message: 'Profile updated successfully'
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
