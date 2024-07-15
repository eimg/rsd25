import {
	Text,
	View,
	StyleSheet,
} from "react-native";

export default function BalanceCard() {
	return (
		<View style={styles.banner}>
			<Text style={styles.text.label}>Balance</Text>
			<View style={styles.balance}>
				<Text style={styles.text.label}>$</Text>
				<Text style={styles.text.amount}>12,543.74</Text>
			</View>
			<View style={styles.balanceGrowth}>
				<Text style={styles.text.growth}>+520 Today</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	banner: {
		padding: 30,
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,
		backgroundColor: "#6d25e5",
	},
	balance: {
		marginTop: 12,
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
	},
	balanceGrowth: {
		alignItems: "flex-end",
		paddingTop: 10,
	},
	text: {
		label: {
			fontWeight: "bold",
			color: "#aaa",
		},
		amount: {
			fontWeight: "bold",
			fontSize: 40,
			color: "#fff",
		},
		growth: {
			color: "#6f6",
		},
	},
});
