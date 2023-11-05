import React from 'react';
import Link from 'next/link';
import styles from '../styles/Contact.module.css';
const Contact = () => {
	return (
		<div className={styles.container}>
			<span></span>
			<h2>
				Besoin d&apos;une aide rapide avec votre site ?
				<Link href='https://api.whatsapp.com/send?1=pt_BR&phone=623706986'>Viens discuter avec moi.</Link>
			</h2>
		</div>
	);
};

export default Contact;
