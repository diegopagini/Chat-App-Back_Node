/** @format */

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const router = Router();

/**
 * Create new users.
 * @example: localhost:8080/api/login/new
 */
router.post(
	'/new',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Email is required').isEmail(),
		check('password', 'Password is required').not().isEmpty(),
		validateFields,
	],
	createUser
);

/**
 * Login user.
 * @example: localhost:8080/api/login
 */
router.post(
	'/',
	[
		check('email', 'Email is required').isEmail(),
		check('password', 'Password is required').not().isEmpty(),
		validateFields,
	],
	login
);

/**
 * Revalidate token.
 * @example: localhost:8080/api/login
 */
router.get('/renew', renewToken);

module.exports = router;
