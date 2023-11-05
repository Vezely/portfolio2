import React from 'react';
import Head from 'next/head';
import SeConnecter from '../components/SeConnecter';
const connexion = () => {
	return (
		<>
			<Head>
				<title>Connexion</title>
				<meta charSet='UTF-8'></meta>
				<meta name='description' content='Page de connexion' />
				<meta name='theme-color' content='#212529' />
				<meta property='og:title' content='Page connexion' />
				<meta property='og:description' content='Page de connexion' />
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
				<SeConnecter />
			</div>
		</>
	);
};

export default connexion;
