const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const prisma = require("../prismaClient");

router.get("/users", async (req, res) => {
	const data = await prisma.user.findMany({
		include: {
			posts: true,
			comments: true,
		},
		orderBy: { id: "desc" },
		take: 20,
	});

	res.json(data);
});

router.get("/users/:id", async (req, res) => {
	const { id } = req.params;

	const data = await prisma.user.findFirst({
		where: { id: Number(id) },
		include: {
			posts: true,
			comments: true,
		},
	});

	res.json(data);
});

router.post("/users", async (req, res) => {
	const { name, username, bio, password } = req.body;

	if (!name || !username || !password) {
		return res
			.status(400)
			.json({ msg: "name, username and password required" });
	}

	const hash = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({
		data: {
			name,
			username,
			password: hash,
			bio,
		},
	});

	res.json(user);
});

module.exports = { userRouter: router };
