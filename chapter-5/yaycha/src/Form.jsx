import { useContext, useRef } from "react";

import { AppContext } from "./ThemedApp";

export default function Form({ add }) {
	const { mode } = useContext(AppContext);

	const contentRef = useRef();
	const nameRef = useRef();

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				const content = contentRef.current.value;
				const name = nameRef.current.value;

				add(content, name);

				e.currentTarget.reset();
			}}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 4,
				padding: 10,
				borderRadius: 8,
				marginBottom: 20,
				background: mode === "dark" ? "#555" : "#def",
			}}>
			<input
				ref={contentRef}
				type="text"
				placeholder="Content"
				style={{
					padding: 5,
					border: "0 none",
					outlineWidth: 0,
					borderRadius: 5,
					background: mode === "dark" ? "#000" : "#fff",
					color: mode === "dark" ? "white" : "black",
				}}
			/>
			<input
				ref={nameRef}
				type="text"
				placeholder="Name"
				style={{
					padding: 5,
					border: "0 none",
					outlineWidth: 0,
					borderRadius: 5,
					background: mode === "dark" ? "#000" : "#fff",
					color: mode === "dark" ? "white" : "black",
				}}
			/>
			<button
				type="submit"
				style={{
					padding: 8,
					background: "#0d6efd",
					color: "white",
					border: "0 none",
                    borderRadius: 5,
				}}>
				Post
			</button>
		</form>
	);
}
