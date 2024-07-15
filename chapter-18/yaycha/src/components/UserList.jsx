import {
	Box,
	Typography,
	List,
	ListItem,
	Avatar,
	ListItemText,
	ListItemAvatar,
	ListItemButton,
	ListItemSecondaryAction,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import FollowButton from "./FollowButton";

export default function UserList({ title, data }) {
	const navigate = useNavigate();

	return (
		<Box>
			<Typography
				variant="h4"
				sx={{ mb: 3, textAlign: "center" }}>
				{title}
			</Typography>
			<List>
				{data.map(item => {
					return (
						<ListItem key={item.id}>
							<ListItemButton
								onClick={() =>
									navigate(`/profile/${item.user.id}`)
								}>
								<ListItemAvatar>
									<Avatar />
								</ListItemAvatar>
								<ListItemText
									primary={item.user.name}
									secondary={item.user.bio}
								/>
								<ListItemSecondaryAction>
									<FollowButton user={item.user} />
								</ListItemSecondaryAction>
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
}
