/** @format */

const { Router } = require('express');
const { check } = require('express-validator');
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
router.post(
	'/',
	[
		check('email', 'Email is required').isEmail(),
		check('password', 'Password is required').not().isEmpty(),
	],
	login
);

/**
 * Revalidate token.
 * @example: localhost:8080/api/login
 */
router.get('/renew', renewToken);

module.exports = router;
