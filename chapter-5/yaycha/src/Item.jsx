import { useContext } from "react";

import { AppContext } from "./ThemedApp";

export default function Item({ item, remove }) {
    const { mode } = useContext(AppContext);

	return (
		<li
			style={{
				padding: 10,
				borderBottom: "1px solid #ddd",
				borderColor: mode === "dark" ? "#333" : "#ddd",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
			}}>
			<span>
				{item.content} -<b>{item.name}</b>
			</span>
			<button onClick={() => remove(item.id)}>Delete</button>
		</li>
	);
}
