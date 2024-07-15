import { Box, Button, TextField, Typography, Alert } from "@mui/material";

export default function Register() {
	return (
		<Box>
			<Typography variant="h3">Register</Typography>

			<Alert
				severity="warning"
				sx={{ mt: 2 }}>
				All fields required
			</Alert>

			<form>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 1,
						mt: 2,
					}}>
					<TextField
						placeholder="Name"
						fullWidth
					/>
					<TextField
						placeholder="Username"
						fullWidth
					/>
					<TextField
						placeholder="Bio"
						fullWidth
					/>
					<TextField
						type="password"
						placeholder="Password"
						fullWidth
					/>
					<Button
						type="submit"
						variant="contained"
						fullWidth>
						Register
					</Button>
				</Box>
			</form>
		</Box>
	);
}
