import React from "react";
import styles from "./About.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function About() {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <div className={styles.title}>Sobre</div>
                    <div className={styles.blocks}>
                        <div className={styles.block}>
                            <div className={`${styles.typewriterBase} ${styles.typewriter1}`}>Quem Somos</div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
                            </p>
                        </div>
                        <div className={styles.block}>
                            <div className={`${styles.typewriterBase} ${styles.typewriter2}`}>Nossa Solução</div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
                            </p>
                        </div>
                        <div className={styles.block}>
                            <div className={`${styles.typewriterBase} ${styles.typewriter3}`}>Nosso Propósito</div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default About;