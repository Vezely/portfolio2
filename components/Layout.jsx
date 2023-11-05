import React from 'react';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import Header from './Header';
import styles from '../styles/Layout.module.css';
import { useTheme } from './ThemeProvider';
import Chat from './Chat';

const Layout = (props) => {
	const [theme, setTheme] = useTheme();

	return (
		<div className={styles.layout} data-theme={theme}>
			<Header />
			<Chat />
			{props.children}

			<Footer />
		</div>
	);
};

export default Layout;
