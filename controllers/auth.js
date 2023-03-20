/** @format */

const { response, request } = require('express');

const createUser = (req = request, res = response) => {
	res.json({
		ok: true,
		msg: 'controller',
	});
};

const login = (req = request, res = response) => {
	res.json({
		ok: true,
		msg: 'login',
	});
};

const renewToken = (req = request, res = response) => {
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
