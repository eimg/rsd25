import { useState, createContext } from "react";

import App from "./App";

export const AppContext = createContext();

export default function ThemedApp() {
    const [mode, setMode] = useState("dark");

	return (
		<AppContext.Provider value={{ mode, setMode }}>
			<App />
            
		</AppContext.Provider>
	);
}
