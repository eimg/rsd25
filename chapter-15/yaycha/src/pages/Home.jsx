import { Alert, Box } from "@mui/material";

import Form from "../components/Form";
import Item from "../components/Item";

import { useApp } from "../ThemedApp";

import { useQuery, useMutation } from "react-query";
import { queryClient } from "../ThemedApp";
import { deletePost, fetchPosts, postPost } from "../libs/fetcher";

export default function Home() {
	const { showForm, setGlobalMsg, auth } = useApp();
	const { isLoading, isError, error, data } = useQuery("posts", fetchPosts);

	const remove = useMutation(async id => deletePost(id), {
		onMutate: async id => {
			await queryClient.cancelQueries("posts");
			await queryClient.setQueryData("posts", old =>
				old.filter(item => item.id !== id)
			);

			setGlobalMsg("A post deleted");
		},
	});

	const add = useMutation(content => postPost(content), {
		onSuccess: async post => {
			await queryClient.cancelQueries("posts");
			await queryClient.setQueryData("posts", old => [post, ...old]);
			setGlobalMsg("A post added");
		},
	});

	if (isError) {
		return (
			<Box>
				<Alert severity="warning">{error.message}</Alert>
			</Box>
		);
	}

	if (isLoading) {
		return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
	}

	return (
		<Box>
			{showForm && auth && <Form add={add} />}

			{data.map(item => {
				return (
					<Item
						key={item.id}
						item={item}
						remove={remove.mutate}
					/>
				);
			})}
		</Box>
	);
}
