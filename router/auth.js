/** @format */

const { Router } = require('express');
const { createUser, login, renewToken } = require('../controllers/auth');
const router = Router();

/**
 * Create new users.
 * @example: localhost:8080/api/login/new
 */
router.post('/new', createUser);

/**
 * Login user.
 * @example: localhost:8080/api/login
 */
router.post('/', login);

/**
 * Revalidate token.
 * @example: localhost:8080/api/login
 */
router.get('/renew', renewToken);

module.exports = router;
