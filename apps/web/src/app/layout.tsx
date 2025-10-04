import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "../index.css";
import Header from "@/components/header";
import Providers from "@/components/providers";

const lato = Lato({
	variable: "--font-lato",
	subsets: ["latin"],
	weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
	title: "Zentri",
	description:
		"Zentri – A modern productivity app combining tasks, subtasks, and notes into one seamless workspace.",
	icons: {
		icon: "/zentri_favicon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${lato.variable} antialiased`}>
				<Providers>
					<div className="grid h-svh grid-rows-[auto_1fr]">
						<Header />
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
