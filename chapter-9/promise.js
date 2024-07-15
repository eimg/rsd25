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

// console.log(A());
// B().then(res => console.log(res));
// console.log(C());

console.log(A());
B().then(res => {
    console.log(res);
    console.log(C());
});
