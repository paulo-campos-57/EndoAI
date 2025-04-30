import React from 'react';
import styles from './Header.module.css';

function Header() {
    return (
        <>
            <div className={styles.head}>
                <div className={styles.leftSide}>
                    <img className={styles.logo} src='/images/logo.png' alt='Logo do site'/>
                    <h2 className={styles.title}>
                        EndoAI
                    </h2>
                </div>
                <div className={styles.rightSide}>
                    <a href='#' className={styles.links}>Início</a>
                    <a href='#' className={styles.links}>Sobre</a>
                    <a href='#' className={styles.links}>EndoAI</a>
                </div>
            </div>
        </>
    );
}

export default Header;