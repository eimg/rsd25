import Link from "next/link";
import { Button } from "@/components/ui/button";

const token = process.env.TMDB_TOKEN;

async function fetchGenres() {
	const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return await res.json();
}

export default async function sidebar() {
	const { genres } = await fetchGenres();

	return (
		<aside className="w-[220px] flex flex-col gap-1">
			<Button
				className="justify-start"
				variant="outline"
				asChild>
				<Link href="/">All Movies</Link>
			</Button>
			{genres.map(genre => {
				return (
					<Button
                        key={genre.id}
						className="justify-start"
						variant="outline"
						asChild>
						<Link href={`/genres/${genre.name}/${genre.id}`}>
							{genre.name}
						</Link>
					</Button>
				);
			})}
		</aside>
	);
}
