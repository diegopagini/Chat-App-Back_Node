/** @format */

const {
	userConnected,
	userDisconnected,
	getUsers,
	saveMessage,
} = require('../controllers/sockets');
const { checkJWT } = require('../helpers/jwt');

class Sockets {
	constructor(io) {
		this.io = io;

		this.socketEvents();
	}

	socketEvents() {
		// On connection:
		this.io.on('connection', async (socket) => {
			/** socket connections */
			const [valid, uid] = checkJWT(socket.handshake.query['x-token']);

			if (!valid) {
				console.log('Unidentified socket');
				return socket.disconnect();
			}

			await userConnected(uid);

			/** Join a user to a socket io room */
			socket.join(uid);

			/** Notify all the users list */
			this.io.emit('users-list', await getUsers());

			/** Personal message */
			socket.on('personal-message', async (payload) => {
				const message = await saveMessage(payload);
				this.io.to(payload.to).emit('personal-message', message);
				this.io.to(payload.from).emit('personal-message', message);
			});

			/** disconnect */
			socket.on('disconnect', async () => {
				await userDisconnected(uid);
				this.io.emit('users-list', await getUsers());
			});
		});
	}
}

module.exports = Sockets;
