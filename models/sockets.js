/** @format */

const { checkJWT } = require('../helpers/jwt');

class Sockets {
	constructor(io) {
		this.io = io;

		this.socketEvents();
	}

	socketEvents() {
		// On connection:
		this.io.on('connection', (socket) => {
			/** socket connections */

			const [valid, uid] = checkJWT(socket.handshake.query['x-token']);

			if (!valid) {
				console.log('Unidentified socket');
				return socket.disconnect();
			}

			console.log('Client connected', uid);

			socket.on('disconnect', () => {
				console.log('Disconnected client', uid);
			});
		});
	}
}

module.exports = Sockets;
