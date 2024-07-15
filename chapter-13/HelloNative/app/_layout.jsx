import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="(home)"
				options={{ headerShown: false, title: "Home" }}
			/>
			<Stack.Screen
				name="about"
				options={{ title: "About" }}
			/>
		</Stack>
	);
}
