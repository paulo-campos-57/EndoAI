import React from 'react';
import { Link } from 'react-router-dom'
import styles from './Header.module.css';

function Header() {
    return (
        <>
            <div className={styles.head}>
                <div className={styles.leftSide}>
                    <img className={styles.logo} src='/images/logo.png' alt='Logo do site' />
                    <h2 className={styles.title}>
                        EndoAI
                    </h2>
                </div>
                <div className={styles.rightSide}>
                    <Link to='/' className={styles.links}>Início</Link>
                    <Link to='/sobre' className={styles.links}>Sobre</Link>
                    <a href='#' className={styles.links}>EndoAI</a>
                </div>
            </div>
        </>
    );
}

export default Header;