const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { UserSeeder } = require("./UserSeeder");
const { PostSeeder } = require("./PostSeeder");
const { CommentSeeder } = require("./CommentSeeder");
const { LikeSeeder } = require("./LikeSeeder");

async function main() {
	try {
		await UserSeeder();
		await PostSeeder();
		await CommentSeeder();
		await LikeSeeder();
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();
