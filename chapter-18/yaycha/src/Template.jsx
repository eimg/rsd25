import { Box, Container, Snackbar } from "@mui/material";

import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import AppDrawer from "./components/AppDrawer";

import { useApp } from "./ThemedApp";


export default function Template() {
	const { globalMsg, setGlobalMsg } = useApp();

	return (
		<Box>
			<Header />
			<AppDrawer />

			<Container
				maxWidth="sm"
				sx={{ mt: 4 }}>
				<Outlet />
			</Container>

			<Snackbar
				anchorOrigin={{
					horizontal: "center",
					vertical: "bottom",
				}}
				open={Boolean(globalMsg)}
				autoHideDuration={6000}
				onClose={() => setGlobalMsg(null)}
				message={globalMsg}
			/>
		</Box>
	);
}
