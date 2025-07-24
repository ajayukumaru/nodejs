const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const { signupSchema, loginSchema } = require('../validators/auth');

router.get('/', (req, res) => {
  res.send('BookNest API is running 🚀');
});

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

module.exports = router;