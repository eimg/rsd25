const api = import.meta.env.VITE_API;

function getToken() {
	return localStorage.getItem("token");
}

export async function fetchPosts() {
	const res = await fetch(`${api}/content/posts`);
	return res.json();
}

export async function fetchComments(id) {
	const res = await fetch(`${api}/content/posts/${id}`);
	return res.json();
}

export async function postPost(content) {
	const token = getToken();
	const res = await fetch(`${api}/content/posts`, {
		method: "POST",
		body: JSON.stringify({ content }),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (res.ok) {
		return res.json();
	}

	throw new Error("Error: Check Network Log");
}

export async function postComment(content, postId) {
	const token = getToken();
	const res = await fetch(`${api}/content/comments`, {
		method: "POST",
		body: JSON.stringify({ content, postId }),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (res.ok) {
		return res.json();
	}

	throw new Error("Error: Check Network Log");
}

export async function postUser(data) {
	const res = await fetch(`${api}/users`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.ok) {
		return res.json();
	}

	throw new Error("Error: Check Network Log");
}

export async function postLogin(username, password) {
	const res = await fetch(`${api}/login`, {
		method: "POST",
		body: JSON.stringify({ username, password }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.ok) {
		return res.json();
	}

	throw new Error("Incorrect username or password");
}

export async function fetchVerify() {
	const token = getToken();
	const res = await fetch(`${api}/verify`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (res.ok) {
		return res.json();
	}

	return false;
}

export async function fetchUser(id) {
	const token = getToken();
	const res = await fetch(`${api}/users/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.json();
}

export async function deletePost(id) {
	const token = getToken();
	const res = await fetch(`${api}/content/posts/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.text();
}

export async function deleteComment(id) {
	const token = getToken();
	const res = await fetch(`${api}/content/comments/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.text();
}
