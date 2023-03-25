/** @format */

const { response, request } = require('express');
const { validationResult } = require('express-validator');

const createUser = async (req = request, res = response) => {
	res.json({
		ok: true,
		msg: 'create user',
	});
};

const login = async (req = request, res = response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({
			ok: false,
			errors: errors.mapped(),
		});

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
