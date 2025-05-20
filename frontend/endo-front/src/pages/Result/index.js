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

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.title}>Obrigado por participar, {userName}!</div>
                <div className={styles.text}>
                    De acordo com as análises da EndoAI você {message}
                    Lembramos que a EndoAI é uma ferramenta de apoio e <strong>não substitui o diagnóstico de um profissional de saúde qualificado.</strong>
                    Recomendamos fortemente que você procure um médico para uma avaliação clínica detalhada e, se necessário, a realização de exames específicos.
                    Agradecemos por utilizar a EndoAI, esperamos que esta análise ajude você a tomar decisões mais conscientes sobre sua saúde.
                </div>
                <Link to='/' className={styles.links}>
                    Voltar ao menu
                </Link>
            </div>
            <Footer />
        </div>
    );
}
export default Result;