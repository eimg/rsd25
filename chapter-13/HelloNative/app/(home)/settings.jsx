import { View, Text } from "react-native";

export default function settings() {
	return (
		<View
			style={{
				height: "100%",
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Text style={{ fontWeight: "bold" }}>Settings</Text>
		</View>
	);
}
