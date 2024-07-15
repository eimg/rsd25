import { Button } from "@mui/material";
import { useMutation } from "react-query";

import { useApp, queryClient } from "../ThemedApp";
import { postFollow, deleteFollow } from "../libs/fetcher";

export default function FollowButton({ user }) {
	const { auth } = useApp();

    if (!auth) return <></>;

	function isFollowing() {
		return user.following.find(item => item.followerId == auth.id);
	}

	const follow = useMutation(
		id => {
			return postFollow(id);
		},
		{
			onSuccess: async () => {
				await queryClient.refetchQueries("users");
				await queryClient.refetchQueries("user");
				await queryClient.refetchQueries("search");
			},
		}
	);

	const unfollow = useMutation(
		id => {
			return deleteFollow(id);
		},
		{
			onSuccess: async () => {
				await queryClient.refetchQueries("users");
				await queryClient.refetchQueries("user");
				await queryClient.refetchQueries("search");
			},
		}
	);

	return auth.id === user.id ? (
		<></>
	) : (
		<Button
			size="small"
			edge="end"
			variant={isFollowing() ? "outlined" : "contained"}
			sx={{ borderRadius: 5 }}
			onClick={e => {
				if (isFollowing()) {
					unfollow.mutate(user.id);
				} else {
					follow.mutate(user.id);
				}

				e.stopPropagation();
			}}>
			{isFollowing() ? "Following" : "Follow"}
		</Button>
	);
}
