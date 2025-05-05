// Simple serverless function handler for Vercel
export default function handler(req, res) {
  res.status(200).json({
    message: 'API is running!',
    env: process.env.NODE_ENV
  });
} 