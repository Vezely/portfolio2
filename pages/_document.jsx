import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='fr'>
			<Head />
			<link rel='icon' href='/logoV.png' />
			<link rel='apple-touch-icon' sizes='180x180' href='/logoV.png' />

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
