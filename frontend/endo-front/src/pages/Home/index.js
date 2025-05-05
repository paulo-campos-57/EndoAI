import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Home() {

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/salute")
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch((err) => console.error("Erro ao buscar API:", err));
    }, []);

    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <div className={styles.salute}>
                        <h1>Bem vindo!</h1>
                        {/*<p>{message}</p>*/}
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
                <Footer />
            </div>
        </>
    );
}

export default Home;