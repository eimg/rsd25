const express = require("express");
const router = express.Router();

const prisma = require("../prismaClient");

const { clients } = require("./ws");

const { auth, isOwner } = require("../middlewares/auth");

router.get("/posts", async (req, res) => {
	try {
		const data = await prisma.post.findMany({
			include: {
				user: true,
				comments: true,
				likes: true,
			},
			orderBy: { id: "desc" },
			take: 20,
		});

		res.json(data);
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.get("/following/posts", auth, async (req, res) => {
	const user = res.locals.user;

	const follow = await prisma.follow.findMany({
		where: {
			followerId: Number(user.id),
		},
	});

	const users = follow.map(item => item.followingId);

	const data = await prisma.post.findMany({
		where: {
			userId: {
				in: users,
			},
		},
		include: {
			user: true,
			comments: true,
			likes: true,
		},
		orderBy: { id: "desc" },
		take: 20,
	});

	res.json(data);
});

router.get("/posts/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const data = await prisma.post.findUnique({
			where: { id: Number(id) },
			include: {
				user: true,
				comments: {
					include: {
						user: true,
						likes: true,
					},
				},
				likes: true,
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

	await addNoti({
		type: "comment",
		content: "reply your post",
		postId,
		userId: user.id,
	});

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

router.post("/like/posts/:id", auth, async (req, res) => {
	const { id } = req.params;
	const user = res.locals.user;

	const like = await prisma.postLike.create({
		data: {
			postId: Number(id),
			userId: Number(user.id),
		},
	});

	await addNoti({
		type: "like",
		content: "likes your post",
		postId: id,
		userId: user.id,
	});

	res.json({ like });
});

router.post("/like/comments/:id", auth, async (req, res) => {
	const { id } = req.params;
	const user = res.locals.user;

	const like = await prisma.commentLike.create({
		data: {
			commentId: Number(id),
			userId: Number(user.id),
		},
	});

	await addNoti({
		type: "like",
		content: "likes your comment",
		postId: id,
		userId: user.id,
	});

	res.json({ like });
});

router.delete("/unlike/posts/:id", auth, async (req, res) => {
	const { id } = req.params;
	const user = res.locals.user;

	await prisma.postLike.deleteMany({
		where: {
			postId: Number(id),
			userId: Number(user.id),
		},
	});

	res.json({ msg: `Unlike post ${id}` });
});

router.delete("/unlike/comments/:id", auth, async (req, res) => {
	const { id } = req.params;
	const user = res.locals.user;

	await prisma.commentLike.deleteMany({
		where: {
			commentId: Number(id),
			userId: Number(user.id),
		},
	});

	res.json({ msg: `Unlike comment ${id}` });
});

router.get("/likes/posts/:id", async (req, res) => {
	const { id } = req.params;

	const data = await prisma.postLike.findMany({
		where: {
			postId: Number(id),
		},
		include: {
			user: {
				include: {
					followers: true,
					following: true,
				},
			},
		},
	});

	res.json(data);
});

router.get("/likes/comments/:id", async (req, res) => {
	const { id } = req.params;

	const data = await prisma.commentLike.findMany({
		where: {
			commentId: Number(id),
		},
		include: {
			user: {
				include: {
					followers: true,
					following: true,
				},
			},
		},
	});

	res.json(data);
});

router.get("/notis", auth, async (req, res) => {
	const user = res.locals.user;
	const notis = await prisma.noti.findMany({
		where: {
			post: {
				userId: Number(user.id),
			},
		},
		include: {
			user: true,
		},
		orderBy: {
			id: "desc",
		},
		take: 20,
	});

	res.json(notis);
});

router.put("/notis/read", auth, async (req, res) => {
	const user = res.locals.user;

	await prisma.noti.updateMany({
		where: {
			post: {
				userId: Number(user.id),
			},
		},
		data: { read: true },
	});

	res.json({ msg: "Marked all notis read" });
});

router.put("/notis/read/:id", auth, async (req, res) => {
	const { id } = req.params;

	const noti = await prisma.noti.update({
		where: { id: Number(id) },
		data: { read: true },
	});

	res.json(noti);
});

async function addNoti({ type, content, postId, userId }) {
	const post = await prisma.post.findUnique({
		where: {
			id: Number(postId),
		},
	});

	if (post.userId == userId) return false;

	clients.map(client => {
		if (client.userId == post.userId) {
			client.ws.send(JSON.stringify({ event: "notis" }));
			console.log(`WS: event sent to ${client.userId}: notis`);
		}
	});

	return await prisma.noti.create({
		data: {
			type,
			content,
			postId: Number(postId),
			userId: Number(userId),
		},
	});
}

module.exports = { contentRouter: router };
