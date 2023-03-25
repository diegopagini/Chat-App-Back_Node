/** @format */

const { response, request } = require('express');

const createUser = async (req = request, res = response) => {
	res.json({
		ok: true,
		msg: 'create user',
	});
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
