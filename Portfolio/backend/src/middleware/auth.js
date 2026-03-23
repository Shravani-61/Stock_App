const jwt = require('jsonwebtoken');

// Verifies JWT from Authorization: Bearer <token>
module.exports = function auth(req, res, next) {
  const hdr = req.headers.authorization || '';
  const [, token] = hdr.split(' ');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'replace-in-env');
    req.userId = payload.sub;
    req.userPayload = payload; // includes name/email/picture if needed by UI
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
