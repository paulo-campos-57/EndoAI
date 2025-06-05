import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Home() {
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [targetPage, setTargetPage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/salute")
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch((err) => console.error("Erro ao buscar API:", err));
    }, []);

    const handleClick = (path) => {
        setTargetPage(path);
        setShowPopup(true);
    };

    const handleConfirm = () => {
        setShowPopup(false);
        navigate(targetPage);
    };

    const handleCancel = () => {
        setShowPopup(false);
        setTargetPage(null);
    };

    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <div className={styles.salute}>
                        <h1>Bem vindo!</h1>
                        <div className={styles.typewriter}>EndoAI</div>
                        <div className={styles.buttons}>
                            <button
                                className={styles.selectionButton}
                                onClick={() => handleClick("/simplificado")}
                            >
                                Avaliação simplificada
                            </button>
                            <button
                                className={styles.selectionButton}
                                onClick={() => handleClick("/extendido")}
                            >
                                Avaliação estendida
                            </button>
                        </div>
                    </div>
                </div>

                {showPopup && (
                    <div className={styles.popupOverlay}>
                        <div className={styles.popup}>
                            <h3>Termo de responsabilidade</h3>
                            <p>
                                Ao continuar, você declara estar ciente de que esta análise tem fins exclusivamente informativos e <strong>**não substitui uma avaliação médica profissional**. </strong>
                            </p>
                            <div className={styles.popupButtons}>
                                <button onClick={handleConfirm} className={styles.confirmButton}>
                                    Concordo e quero continuar
                                </button>
                                <button onClick={handleCancel} className={styles.cancelButton}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </>
    );
}

export default Home;