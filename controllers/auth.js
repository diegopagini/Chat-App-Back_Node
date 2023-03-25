/** @format */

const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req = request, res = response) => {
	try {
		const { email, password } = req.body;
		// Check if email already used:
		const emailExists = await Usuario.findOne({ email });
		if (emailExists)
			return res.status(400).json({
				ok: false,
				msg: 'Email already used',
			});

		// Create user:
		const user = new Usuario(req.body);

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
			ok: false,
			msg: 'Talk to the administrator',
		});
	}
};

const login = async (req = request, res = response) => {
	const { email, password } = req.body;

	res.json({
		ok: true,
		msg: 'login',
		email,
		password,
	});
};

const renewToken = async (req = request, res = response) => {
	res.json({
		ok: true,
		msg: 'renewToken',
	});
};

module.exports = {
	createUser,
	login,
	renewToken,
};
