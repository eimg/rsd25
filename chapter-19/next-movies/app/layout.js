import { Inter } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Next Movies",
	description: "RSD25 Tutorial Project",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="mx-4 m-auto">
					<Header />
                    
					<section className="flex gap-4 min-h-[500px]">
						<Sidebar />
						<main className="border-l border-slate-300 px-4">
							{children}
						</main>
					</section>

					<footer className="text-center py-4 text-slate-400 mt-4 border-t border-slate-300">
						<small className="text-xs">&copy; Copyright 2024</small>
					</footer>
				</div>
			</body>
		</html>
	);
}
