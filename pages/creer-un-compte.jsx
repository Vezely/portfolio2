import React from 'react';
import CreerCompte from '../components/CreerCompte';
import Head from 'next/head';
const CreerUnCompte = () => {
	return (
		<>
			<Head>
				<title>Creer un compte</title>
				<meta charSet='UTF-8'></meta>
				<meta name='description' content='Page de création de compte' />
				<meta name='theme-color' content='#212529' />
				<meta property='og:title' content='Page création de compte' />
				<meta property='og:description' content='Page de création de compte' />
				<meta property='og:image' content='http://localhost:3000/images/logoU.png' />
			</Head>

			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '80vh',
					backgroundColor: 'var(--CouleurBC1)',
					color: 'var(--CouleurFondBlanc)',
				}}>
				<CreerCompte />
			</div>
		</>
	);
};

export default CreerUnCompte;
