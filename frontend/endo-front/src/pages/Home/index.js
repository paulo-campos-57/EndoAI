import React from "react";
import styles from "./Home.module.css";
import Header from "../../components/Header";

function Home() {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <div className={styles.salute}>
                        <h1>Bem vindo!</h1>
                        <div className={styles.typewriter}>EndoAI</div>
                        <div className={styles.buttons}>
                            <div className={styles.selectionButton}>
                                Avaliação estendida
                            </div>
                            <div className={styles.selectionButton}>
                                Avaliação simplificada
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;