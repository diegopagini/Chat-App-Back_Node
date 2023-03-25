/** @format */
const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
	return new Promise(async (resolve, reject) => {
		const payload = {
			uid,
		};

		jwt.sign(
			payload,
			process.env.JWT_KEY,
			{
				expiresIn: '24h',
			},
			(err, token) => {
				if (err) {
					console.log(err);
					return reject(err);
				}

				return resolve(token);
			}
		);
	});
};

module.exports = {
	generateJWT,
};
