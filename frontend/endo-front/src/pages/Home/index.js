import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
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
                        {/*<p>{message}</p> Verificação da integração*/}
                        <div className={styles.typewriter}>EndoAI</div>
                        <div className={styles.buttons}>
                            <div className={styles.selectionButton}>
                                Avaliação simplificada
                            </div>
                            <Link to='/extendido' className={styles.selectionButton}>
                                Avaliação extendida
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Home;