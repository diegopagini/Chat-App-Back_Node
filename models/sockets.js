/** @format */

const { userConnected, userDisconnected } = require('../controllers/sockets');
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

			/** disconnect */
			socket.on('disconnect', async () => {
				await userDisconnected(uid);
			});
		});
	}
}

module.exports = Sockets;
