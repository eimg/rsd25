const { createServer } = require("node:http");

const server = createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");

	const content = `
        <h1>Client Side</h1>
        <p>
          <script>
            const today = new Date();
            document.write(today.toISOString());
          </script>
        </p>
    `;

	res.end(content);
});

server.listen(3000, "localhost", () => {
	console.log("Server running at 3000");
});
