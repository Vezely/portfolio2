import Layout from '../components/Layout';
import { ThemeProvider } from '../components/ThemeProvider';
import 'normalize.css/normalize.css';
import '../styles/globals.css';
import { Roboto_Flex, Montserrat } from '@next/font/google';
import 'animate.css';

const roboto = Roboto_Flex({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });
export default function App({ Component, pageProps }) {
	return (
		<div style={{ backgroundColor: '#212529' }}>
			<style jsx global>
				{`
					html {
						font-family: ${roboto.style.fontFamily};
					}
					h1,
					h2,
					h3,
					h4,
					h5,
					h6 {
						font-family: ${montserrat.style.fontFamily};
					}
				`}
			</style>

			<ThemeProvider>
				<Layout style={{ backgroundColor: 'var(--CouleurFond)' }}>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</div>
	);
}
