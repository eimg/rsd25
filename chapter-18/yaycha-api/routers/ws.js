const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

let clients = [];

router.ws("/subscribe", (ws, req) => {
	console.log("WS: New connection received");

	ws.on("message", msg => {
		const { token } = JSON.parse(msg);
		console.log("WS: token received");

		jwt.verify(token, secret, (err, user) => {
			if (err) return false;

			clients.push({ userId: user.id, ws });

			console.log(`WS: Client added: ${user.id}`);
		});
	});
});

module.exports = { clients, wsRouter: router };
