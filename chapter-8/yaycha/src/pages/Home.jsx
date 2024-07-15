import { useState } from "react";

import { Box } from "@mui/material";

import Form from "../components/Form";
import Item from "../components/Item";

import { useApp } from "../ThemedApp";

export default function Home() {
	const { showForm, setGlobalMsg } = useApp();

	const [data, setData] = useState([
		{ id: 3, content: "Yay, interesting.", name: "Chris" },
		{ id: 2, content: "React is fun.", name: "Bob" },
		{ id: 1, content: "Hello, World!", name: "Alice" },
	]);

	const remove = id => {
		setData(data.filter(item => item.id !== id));
		setGlobalMsg("An item deleted");
	};

	const add = (content, name) => {
		const id = data[0].id + 1;
		setData([{ id, content, name }, ...data]);
		setGlobalMsg("An item added");
	};

	return (
		<Box>
			{showForm && <Form add={add} />}

			{data.map(item => {
				return (
					<Item
						key={item.id}
						item={item}
						remove={remove}
					/>
				);
			})}
		</Box>
	);
}
