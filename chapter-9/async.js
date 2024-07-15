function A() {
	return "Function A";
}

function B() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Function B");
		}, 2000);
	});
}

function C() {
	return "Function C";
}

(async () => {
	console.log(A());
	console.log(await B());
	console.log(C());
})();
