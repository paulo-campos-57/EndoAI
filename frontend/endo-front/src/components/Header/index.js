import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import styles from './Header.module.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className={styles.head}>
                <div className={styles.headContent}>
                    <div className={styles.leftSide}>
                        <img className={styles.logo} src='/images/logo.png' alt='Logo do site' />
                        <h2 className={styles.title}>
                            EndoAI
                        </h2>
                    </div>
                    <div className={styles.burgerMenu} onClick={toggleMenu}>
                        <div className={`${styles.burgerBar} ${isMenuOpen ? styles.open : ''}`}></div>
                        <div className={`${styles.burgerBar} ${isMenuOpen ? styles.open : ''}`}></div>
                        <div className={`${styles.burgerBar} ${isMenuOpen ? styles.open : ''}`}></div>
                    </div>
                    <div className={`${styles.rightSide} ${isMenuOpen ? styles.showMenu : ''}`}>
                        <Link to='/' className={styles.links} onClick={toggleMenu}>Início</Link>
                        <Link to='/sobre' className={styles.links} onClick={toggleMenu}>Sobre</Link>
                        <Link to='/extendido' className={styles.links} onClick={toggleMenu}>EndoAI</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;