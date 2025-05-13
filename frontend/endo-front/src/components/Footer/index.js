import React from 'react';
import styles from './Footer.module.css';

function Footer () {
    return(
        <>
            <div className={styles.foot}>
                <div className={styles.title}>
                    EndoAI
                </div>
                <div className={styles.subtitle}>
                    Não substitui o diagnóstico de um profissional da saúde!
                </div>
            </div>
        </>
    );
}

export default Footer;