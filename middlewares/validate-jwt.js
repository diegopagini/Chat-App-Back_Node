/** @format */

const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
	try {
		const token = req.header('x-token');
		if (!token) {
			return res.status(401).json({
				msg: 'Token not valid',
			});
		}

		/**
		 * Verify JWT_
		 * @example { "payload": {
		 *  "uid": "641f2c9dda301b0487bf6b96",
		 * "iat": 1679854216,
		 * "exp": 1679940616 }
		 * }
		 */
		const { uid } = jwt.verify(token, process.env.JWT_KEY);
		req.uid = uid; // After having gone through this validator, all requests will have the uid.

		next();
	} catch (error) {
		return res.status(401).json({
			msg: 'Token not valid',
		});
	}
};

module.exports = {
	validateJWT,
};
