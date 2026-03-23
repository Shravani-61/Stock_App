const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = Router();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const JWT_SECRET = process.env.JWT_SECRET || 'replace-in-env';

// Start Google OAuth flow
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Handle Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/login?error=oauth_failed`, session: true }),
  async (req, res) => {
    try {
      // Issue JWT after successful OAuth
      const user = req.user;
      const token = jwt.sign(
        {
          sub: user.id,
          email: user.email,
          name: user.name,
          picture: user.picture,
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Redirect back to frontend with token in URL for the app to capture
      const redirectUrl = `${FRONTEND_URL}/login/success?token=${encodeURIComponent(token)}`;
      return res.redirect(302, redirectUrl);
    } catch (err) {
      console.error('JWT issue/redirect error:', err);
      return res.redirect(`${FRONTEND_URL}/login?error=server_error`);
    }
  }
);

module.exports = router;
