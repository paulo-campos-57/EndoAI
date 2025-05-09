import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Result.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Result() {
    const location = useLocation();
    const navigate = useNavigate();

    const userName = location.state?.userName;

    React.useEffect(() => {
        if (!userName) {
            navigate("/extendido");
        }
    }, [userName, navigate]);

    if (!userName) return null;

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.title}>Obrigado por participar, {userName}!</div>            </div>
            <Footer />
        </div>
    );
}

export default Result;
