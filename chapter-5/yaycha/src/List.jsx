import { useContext } from "react";

import { AppContext } from "./ThemedApp";

export default function List({ children }) {
	const { mode } = useContext(AppContext);

	return (
		<ul
			style={{
				listStyle: "none",
				padding: 0,
				margin: 0,
				border: "1px solid #ddd",
				borderColor: mode === "dark" ? "#333" : "#ddd",
				borderRadius: 8,
				overflow: "hidden",
			}}>
			{children}
		</ul>
	);
}
