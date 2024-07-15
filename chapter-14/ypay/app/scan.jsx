import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Scan() {
	const [facing, setFacing] = useState("back");
	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: "center", fontSize: 16 }}>
					We need your permission to show the camera
				</Text>
				<View
					style={{ marginTop: 20, width: 250, alignSelf: "center" }}>
					<Button
						onPress={requestPermission}
						title="grant permission"
					/>
				</View>
			</View>
		);
	}

	function toggleCameraFacing() {
		setFacing(current => (current === "back" ? "front" : "back"));
	}

	return (
		<View style={styles.container}>
			<CameraView
				style={styles.camera}
				facing={facing}
				onBarcodeScanned={result => {
					console.log(result.data);
				}}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={toggleCameraFacing}>
						<MaterialIcons
							name="cameraswitch"
							size={48}
							color="white"
						/>
					</TouchableOpacity>
				</View>
			</CameraView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "transparent",
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: "flex-end",
		alignItems: "center",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
});
