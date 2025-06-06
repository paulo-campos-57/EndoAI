import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Result.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Result() {
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedFeature, setSelectedFeature] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleFeatureClick = (index) => {
        setSelectedFeature(index);
        setIsModalOpen(true);
    };

    const getFeatureExplanation = (index) => {
        const explanations = {
            0: "A hipertensão (pressão alta) está fortemente associada à resistência à insulina e aumenta o risco de desenvolver diabetes tipo 2.",
            1: "O colesterol alto pode indicar disfunção metabólica, que é comum em pessoas com diabetes ou pré-diabetes.",
            2: "Um IMC elevado (índice de massa corporal) é um dos maiores fatores de risco para diabetes tipo 2, pois está relacionado à resistência à insulina.",
            3: "O hábito de fumar aumenta a inflamação no corpo e a resistência à insulina, elevando o risco de diabetes.",
            4: "A prática regular de atividade física ajuda a controlar o peso e melhora a sensibilidade à insulina, reduzindo o risco de diabetes."
        };
        return explanations[index] || "Informação não disponível para este fator.";
    };

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
    let destiny = featuresImportance ? "extendido" : "simplificado";
    let messageStart = "";
    const riskPercentageText = `${percentage}% de risco.`;

    if (percentage >= 80) {
        messageStart = `possui grande chance de ter diabetes, com `;
    } else if (percentage >= 55) {
        messageStart = `possui chance de ter diabetes, com `;
    } else if (percentage >= 30) {
        messageStart = `possui pouca chance de ter diabetes, com `;
    } else {
        messageStart = `possui muito pouca chance de ter diabetes, com `;
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
                    <div className={styles.title}>Resultado da Análise</div>
                    <div className={styles.resultCard}>
                        <p className={styles.greeting}>Olá, {userName}!</p>
                        <p className={styles.result}>
                            De acordo com nossa análise, você {messageStart}
                            <span className={styles.percentageHighlight}>{riskPercentageText}</span>
                        </p>

                        {!featuresImportance && (
                            <div className={styles.disclaimer} style={{ marginTop: '20px' }}>
                                <p>
                                    <strong>Nota:</strong> Este é um resultado da análise simplificada.
                                    Para uma análise mais detalhada com informações sobre fatores de risco específicos,
                                    utilize a{' '}
                                    <span
                                        onClick={() => navigate('/extendido')}
                                        className={styles.extendLink}
                                    >
                                        versão extendida do formulário
                                    </span>.
                                </p>
                            </div>
                        )}

                        {featuresImportance && (
                            <div className={styles.featuresSection}>
                                <h2>Fatores mais relevantes para o resultado:</h2>
                                <div className={styles.featuresList}>
                                    {featuresImportance.map((value, index) => (
                                        <div
                                            key={index}
                                            className={styles.featureItem}
                                            onClick={() => handleFeatureClick(index)}
                                            style={{
                                                backgroundColor: value === 0 ? "#1b5e20" : "#c62828",
                                                color: value === 0 ? "#FFF" : "#000",
                                                cursor: "pointer",
                                            }}
                                            title="Clique para saber mais"
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
                            <Link to={`/${destiny}`} className={styles.button}>
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
            {isModalOpen && selectedFeature !== null && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>×</button>
                        <h3>{getFeatureLabel(selectedFeature)}</h3>
                        <p>{getFeatureExplanation(selectedFeature)}</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default Result;
