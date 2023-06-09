/** @format */

// Servidor de Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');
const { dbConnection } = require('../database/config');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		// Connect to DB:
		dbConnection();
		// Http server:
		this.server = http.createServer(this.app);
		// Socket configurations:
		this.io = socketio(this.server, {
			/* configurations */
		});
	}

	middlewares() {
		// Display the public directory:
		this.app.use(express.static(path.resolve(__dirname, '../public')));
		// CORS:
		this.app.use(cors());
		// Body parser:
		this.app.use(express.json());
		// Endpoints:
		this.app.use('/api/login', require('../router/auth'));
		this.app.use('/api/messages', require('../router/messages'));
	}

	configurarSockets() {
		new Sockets(this.io);
	}

	execute() {
		// Initialize Middlewares:
		this.middlewares();
		// Initialize sockets:
		this.configurarSockets();
		// Initialize Server:
		this.server.listen(this.port, () => {
			console.log('Server on:', this.port);
		});
	}
}

module.exports = Server;
