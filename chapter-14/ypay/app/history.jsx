import { View } from "react-native";

import Transactions from "./components/Transactions";

export default function History() {
	return (
		<View style={{ padding: 20 }}>
			<Transactions />
		</View>
	);
}
