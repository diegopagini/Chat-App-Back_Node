/** @format */

const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns `Promise`
 */
const createUser = async (req = request, res = response) => {
	try {
		const { email, password } = req.body;
		// Check if email already used:
		const emailExists = await User.findOne({ email });
		if (emailExists)
			return res.status(400).json({
				ok: false,
				msg: 'Email already used',
			});

		// Create user:
		const user = new User(req.body);

		// Encrypt password:
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		// Save user in DB:
		await user.save();

		// Generate JWT:
		const token = await generateJWT(user.id);

		return res.status(200).json({
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: 'Talk to the administrator',
		});
	}
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns `Promise`
 */
const login = async (req = request, res = response) => {
	const { email, password } = req.body;

	try {
		// Check email:
		const user = await User.findOne({ email });
		if (!user)
			return res.status(404).json({
				msg: 'Email not found.',
			});

		// Validate password:
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword)
			return res.status(400).json({
				msg: 'Password not valid.',
			});

		// Generate JWT.
		const token = await generateJWT(user.id);

		return res.status(200).json({
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: 'Talk to the administrator',
		});
	}
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns `Promise`
 */
const renewToken = async (req = request, res = response) => {
	const { uid } = req;

	// Generate new JWT.
	const token = await generateJWT(uid);

	// Get user by uid:
	const user = await User.findById(uid);

	return res.status(200).json({
		user,
		token,
	});
};

module.exports = {
	createUser,
	login,
	renewToken,
};
