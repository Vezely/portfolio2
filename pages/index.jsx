import React from 'react';
import Accueil from '../components/Accueil';
import Head from 'next/head';

const Index = () => {
	return (
		<>
			<Head>
				<title>Accueil</title>
				<meta charSet='UTF-8'></meta>
				<meta name='description' content="Page d'accueil contenant des information glabale sur Vezely sur ses projets et ce qui sait faire" />
				<meta name='theme-color' content='#212529' />
				<meta property='og:title' content="Page d'accueil" />
				<meta
					property='og:description'
					content="Page d'accueil contenant des information glabale sur Vezely sur ses projets et ce qui sait faire"
				/>
				<meta property='og:image' content='http://localhost:3000/images/logoU.png' />
			</Head>
			<Accueil />
		</>
	);
};

export default Index;
