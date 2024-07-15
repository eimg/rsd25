import { useState } from "react";

import List from "./List";
import Item from "./Item";

export default function App() {
    const [showForm, setShowForm] = useState(false);

	const [data, setData] = useState([
		{ id: 1, content: "Hello, World!", name: "Alice" },
		{ id: 2, content: "React is fun.", name: "Bob" },
		{ id: 3, content: "Yay, interesting.", name: "Chris" },
	]);

    const remove = id => {
        setData(data.filter(item => item.id !== id));
    }

	return (
		<div style={{ maxWidth: 600, margin: "20px auto" }}>
			<h1>Yaycha</h1>

			<List>
				{data.map(item => {
					return (
						<Item
							key={item.id}
							item={item}
							remove={remove}
						/>
					);
				})}
			</List>
		</div>
	);
}
