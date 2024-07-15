import { View, TextInput, Text, StyleSheet } from "react-native";
import { useRef, useState } from "react";
import { useQuery } from "react-query";

import { MaterialIcons } from "@expo/vector-icons";

const api = "https://api.frankfurter.app/latest?from=USD";

export default function FxRate() {
	const amountInput = useRef();
	const [amount, setAmount] = useState(1);

	const { isLoading, isError, error, data } = useQuery("fxrate", async () => {
		const res = await fetch(api);
		return res.json();
	});

	if (isError) {
		return (
			<View style={{ justifyContent: "center", alignItems: "center" }}>
				<Text>{error.message}</Text>
			</View>
		);
	}

	if (isLoading) {
		return (
			<View style={{ justifyContent: "center", alignItems: "center" }}>
				<Text>Loading...</Text>
			</View>
		);
	}

    const convert = code => {
        const usd = amount > 0 ? amount : 1;
        if(!data.rates[code]) return 0;
        
        return usd * data.rates[code];
    }

	return (
		<View style={{ padding: 20 }}>
			<View style={styles.item}>
				<MaterialIcons
					name="attach-money"
					color="#0e9ce2"
					size={32}
				/>
				<TextInput
					style={styles.input}
					onChangeText={setAmount}
					ref={amountInput}
					placeholder="1 USD"
				/>
			</View>
			<View style={styles.item}>
				<MaterialIcons
					name="euro"
					color="#0e9ce2"
					size={24}
				/>
				<Text style={styles.result}>{convert("EUR")} EUR</Text>
			</View>
			<View style={styles.item}>
				<MaterialIcons
					name="currency-pound"
					color="#0e9ce2"
					size={24}
				/>
				<Text style={styles.result}>{convert("GBP")} GBP</Text>
			</View>
			<View style={styles.item}>
				<MaterialIcons
					name="currency-yen"
					color="#0e9ce2"
					size={24}
				/>
				<Text style={styles.result}>{convert("JPY")} JPY</Text>
			</View>
			<View style={styles.item}>
				<MaterialIcons
					name="currency-yuan"
					color="#0e9ce2"
					size={24}
				/>
				<Text style={styles.result}>{convert("CNY")} CNY</Text>
			</View>
			<View style={styles.item}>
				<MaterialIcons
					name="currency-rupee"
					color="#0e9ce2"
					size={24}
				/>
				<Text style={styles.result}>{convert("INR")} INR</Text>
			</View>
			<View style={styles.item}>
				<MaterialIcons
					name="currency-exchange"
					color="#0e9ce2"
					size={24}
				/>
				<Text style={styles.result}>{convert("CAD")} CAD</Text>
			</View>
			<View style={styles.item}>
				<MaterialIcons
					name="currency-exchange"
					color="#0e9ce2"
					size={24}
				/>
				<Text style={styles.result}>{convert("AUD")} AUD</Text>
			</View>
			<View style={styles.item}>
				<MaterialIcons
					name="currency-exchange"
					color="#0e9ce2"
					size={24}
				/>
				<Text style={styles.result}>{convert("SGD")} SGD</Text>
			</View>
			<View style={styles.item}>
				<MaterialIcons
					name="currency-exchange"
					color="#0e9ce2"
					size={24}
				/>
				<Text style={styles.result}>{convert("THB")} THB</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		flexGrow: 1,
		fontSize: 20,
		paddingTop: 10,
		paddingBottom: 10,
	},
    item: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    result: {
        fontSize: 18,
    }
});