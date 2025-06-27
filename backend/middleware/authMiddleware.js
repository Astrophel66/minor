const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("➡️ Incoming Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log("🟢 Extracted Token:", token);
  try {
    const decoded = jwt.verify(token,JWT_SECRET);
    console.log("✅ Decoded Token:", decoded);
    req.user = { id: decoded.id };  
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
