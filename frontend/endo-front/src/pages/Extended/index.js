import React from "react";
import styles from "./Extended.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Extended() {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <form className={styles.ansForm}>
                        <div className={styles.sideQuestion}>
                            <div className={styles.questionContainer}>
                                <div className={styles.question}>
                                    1. Você já foi diagnosticado com pressão alta?
                                </div>
                                <div className={styles.questionAns}>
                                    <label className={styles.radioButton}>
                                        <input type="radio" name="HighBP" value="1" className={styles.radioInput} />
                                        <span className={styles.buttonLabel}>SIM</span>
                                    </label>
                                    <label className={styles.radioButton}>
                                        <input type="radio" name="HighBP" value="0" className={styles.radioInput} />
                                        <span className={styles.buttonLabel}>NÃO</span>
                                    </label>
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.question}>
                                    2. Você já foi diagnosticado com colesterol alto?
                                </div>
                                <div className={styles.questionAns}>
                                    <label className={styles.radioButton}>
                                        <input type="radio" name="HighChol" value="1" className={styles.radioInput} />
                                        <span className={styles.buttonLabel}>SIM</span>
                                    </label>
                                    <label className={styles.radioButton}>
                                        <input type="radio" name="HighChol" value="0" className={styles.radioInput} />
                                        <span className={styles.buttonLabel}>NÃO</span>
                                    </label>
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.question}>
                                    3. Você fez algum exame de colesterol nos últmos 5 anos?
                                </div>
                                <div className={styles.questionAns}>
                                    <label className={styles.radioButton}>
                                        <input type="radio" name="CholCheck" value="1" className={styles.radioInput} />
                                        <span className={styles.buttonLabel}>SIM</span>
                                    </label>
                                    <label className={styles.radioButton}>
                                        <input type="radio" name="CholCheck" value="0" className={styles.radioInput} />
                                        <span className={styles.buttonLabel}>NÃO</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.sideQuestion}>
                            <div className={styles.questionContainer}>
                                <div className={styles.question}>
                                    4. Você é ou já foi fumante?
                                </div>
                                <div className={styles.questionAns}>
                                    <label className={styles.radioButton}>
                                        <input type="radio" name="Smoker" value="1" className={styles.radioInput} />
                                        <span className={styles.buttonLabel}>SIM</span>
                                    </label>
                                    <label className={styles.radioButton}>
                                        <input type="radio" name="Smoker" value="0" className={styles.radioInput} />
                                        <span className={styles.buttonLabel}>NÃO</span>
                                    </label>
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.question}>
                                    5. Você já teve algum derrame?
                                </div>
                                <div className={styles.questionAns}>
                                    <label className={styles.radioButton}>
                                        <input type="radio" name="Stroke" value="1" className={styles.radioInput} />
                                        <span className={styles.buttonLabel}>SIM</span>
                                    </label>
                                    <label className={styles.radioButton}>
                                        <input type="radio" name="Stroke" value="0" className={styles.radioInput} />
                                        <span className={styles.buttonLabel}>NÃO</span>
                                    </label>
                                </div>
                            </div>
                            <div className={styles.questionContainer}>
                                <div className={styles.question}>
                                    6. Você tem ou teve alguma doença cardíaca??
                                </div>
                                <div className={styles.questionAns}>
                                    <label className={styles.radioButton}>
                                        <input type="radio" name="HeartDA" value="1" className={styles.radioInput} />
                                        <span className={styles.buttonLabel}>SIM</span>
                                    </label>
                                    <label className={styles.radioButton}>
                                        <input type="radio" name="HeartDA" value="0" className={styles.radioInput} />
                                        <span className={styles.buttonLabel}>NÃO</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Extended;