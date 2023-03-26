/** @format */

const { request, response } = require('express');
const Message = require('../models/message');

/**
 *
 * @param {request} req
 * @param {res} res
 * @returns `Promise`
 */
const getChat = async (req = request, res = response) => {
	const myId = req.uid;
	const from = req.params.from;
	const lastThirty = await Message.find({
		$or: [
			{ from: myId, to: from },
			{ from: from, to: myId },
		],
	})
		.sort({
			createdAt: 'desc',
		})
		.limit(30);

	return res.status(200).json({
		messages: lastThirty,
	});
};

module.exports = {
	getChat,
};
