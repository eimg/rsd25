const express = require("express");
const router = express.Router();

const prisma = require("../prismaClient");

const { auth, isOwner } = require("../middlewares/auth");

router.get("/posts", async (req, res) => {
	try {
		const data = await prisma.post.findMany({
			include: {
				user: true,
				comments: true,
			},
			orderBy: { id: "desc" },
			take: 20,
		});

		res.json(data);
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.get("/posts/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const data = await prisma.post.findUnique({
			where: { id: Number(id) },
			include: {
				user: true,
				comments: {
					include: { user: true },
				},
			},
		});

		res.json(data);
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.post("/posts", auth, async (req, res) => {
	const { content } = req.body;
	if (!content) return res.status(400).json({ msg: "content required" });

	const user = res.locals.user;

	const post = await prisma.post.create({
		data: {
			content,
			userId: user.id,
		},
	});

	const data = await prisma.post.findUnique({
		where: { id: Number(post.id) },
		include: {
			user: true,
			comments: {
				include: { user: true },
			},
		},
	});

	res.json(data);
});

router.post("/comments", auth, async (req, res) => {
	const { content, postId } = req.body;
	if (!content || !postId)
		return res.status(400).json({ msg: "content and postId required" });

	const user = res.locals.user;

	const comment = await prisma.comment.create({
		data: {
			content,
			userId: Number(user.id),
			postId: Number(postId),
		},
	});

	comment.user = user;

	res.json(comment);
});

router.delete("/posts/:id", auth, isOwner("post"), async (req, res) => {
	const { id } = req.params;

	await prisma.comment.deleteMany({
		where: { postId: Number(id) },
	});

	await prisma.post.delete({
		where: { id: Number(id) },
	});

	res.sendStatus(204);
});

router.delete("/comments/:id", auth, isOwner("comment"), async (req, res) => {
	const { id } = req.params;

	await prisma.comment.delete({
		where: { id: Number(id) },
	});

	res.sendStatus(204);
});

module.exports = { contentRouter: router };
