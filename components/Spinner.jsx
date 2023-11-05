import React from 'react';
import styles from '../styles/Connexion.module.css';
const Spinner = () => {
	return (
		<div className={`${styles.spinner} ${styles.center}}`}>
			<div className={styles.spinner_blade}></div>
			<div className={styles.spinner_blade}></div>
			<div className={styles.spinner_blade}></div>
			<div className={styles.spinner_blade}></div>
			<div className={styles.spinner_blade}></div>
			<div className={styles.spinner_blade}></div>
			<div className={styles.spinner_blade}></div>
			<div className={styles.spinner_blade}></div>
			<div className={styles.spinner_blade}></div>
			<div className={styles.spinner_blade}></div>
			<div className={styles.spinner_blade}></div>
			<div className={styles.spinner_blade}></div>
		</div>
	);
};

export default Spinner;
