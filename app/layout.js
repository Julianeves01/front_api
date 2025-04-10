import "./globals.css";

export const metadata = {
		title: "Rick and Morty App",
		description: "Rick and Morty App",
		};

export default function RootLayout({ children }) {
	return (
		<html>
			<head>
				<link rel="icon" href="/icon.png" />
			</head>
			<body>
				{children}
			</body>
		</html>
);
}
