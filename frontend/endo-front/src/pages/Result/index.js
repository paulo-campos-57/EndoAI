import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Result.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Result() {
    const location = useLocation();
    const navigate = useNavigate();

    const userName = location.state?.userName;
    const chanceDiabetes = location.state?.chanceDiabetes;
    const featuresImportance = location.state?.featuresImportance;

    React.useEffect(() => {
        if (!userName || !chanceDiabetes) {
            navigate("/extendido");
        }
    }, [userName, chanceDiabetes, navigate]);

    if (!userName || !chanceDiabetes) return null;

    const percentage = parseFloat(chanceDiabetes.replace("%", ""));

    let message = "";

    if (percentage >= 80) {
        message = `possui grande chance de ter diabetes, com ${percentage}% de risco.`;
    } else if (percentage >= 55) {
        message = `possui chance de ter diabetes, com ${percentage}% de risco.`;
    } else if (percentage >= 30) {
        message = `possui pouca chance de ter diabetes, com ${percentage}% de risco.`;
    } else {
        message = `possui muito pouca chance de ter diabetes, com ${percentage}% de risco.`;
    }

    const getFeatureLabel = (index) => {
        const labels = {
            0: "Pressão Alta",
            1: "Colesterol Alto",
            2: "IMC Elevado",
            3: "Fumante",
            4: "Atividade Física"
        };
        return labels[index] || `Fator ${index + 1}`;
    };

    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <h1>Resultado da Análise</h1>
                    <div className={styles.resultCard}>
                        <p className={styles.greeting}>Olá, {userName}!</p>
                        <p className={styles.result}>
                            De acordo com nossa análise, você {message}
                        </p>

                        {featuresImportance && (
                            <div className={styles.featuresSection}>
                                <h2>Fatores mais relevantes para o resultado:</h2>
                                <div className={styles.featuresList}>
                                    {featuresImportance.map((value, index) => (
                                        <div
                                            key={index}
                                            className={styles.featureItem}
                                            style={{
                                                backgroundColor: value === 0 ? "#d4edda" : "#f8d7da",
                                                color: value === 0 ? "#155724" : "#721c24",
                                            }}
                                        >
                                            <span className={styles.featureLabel}>
                                                {getFeatureLabel(index)}
                                            </span>
                                            <div>
                                                {value === 0 ? "Abaixo da média" : "Acima da média"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.legend}>
                                    <p><span style={{ color: "#155724", fontWeight: "bold" }}>Verde:</span> Abaixo da média</p>
                                    <p><span style={{ color: "#721c24", fontWeight: "bold" }}>Vermelho:</span> Acima da média</p>
                                </div>
                            </div>
                        )}

                        <div className={styles.disclaimer}>
                            <p>
                                <strong>Importante:</strong> Este resultado é apenas uma estimativa baseada nos dados fornecidos.
                                Não substitui uma avaliação médica profissional.
                            </p>
                        </div>

                        <div className={styles.actions}>
                            <Link to="/extendido" className={styles.button}>
                                Fazer nova análise
                            </Link>
                            <Link to="/" className={styles.button}>
                                Voltar ao início
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Result;
