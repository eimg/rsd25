function A() {
	console.log("Function A");
}

function B() {
	return setTimeout(() => {
		console.log("Function B");
	}, 2000);
}

function C() {
	console.log("Function C");
}

A();
B();
C();
