import React, { useState } from "react";
import { FaQuestionCircle } from 'react-icons/fa';
import styles from "./Extended.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Extended() {
    const [showSmokerInfo, setShowSmokerInfo] = useState(false);
    const [showAlcoholInfo, setShowAlcoholInfo] = useState(false);
    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(prev => Math.min(prev + 1, 2));
    };

    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 1));
    };

    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <div className={styles.title}>Avaliação Extendida</div>
                    <form className={styles.ansForm}>
                        {step === 1 && (
                            <div className={styles.question}>
                                <div className={styles.sideQuestion}>
                                    {/* Bloco 1 de perguntas */}
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>1. Você já foi diagnosticado com pressão alta?</div>
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
                                        <div className={styles.question}>2. Você já foi diagnosticado com colesterol alto?</div>
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
                                        <div className={styles.question}>3. Você fez algum exame de colesterol nos últimos 5 anos?</div>
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
                                            <FaQuestionCircle
                                                className={styles.icon}
                                                onClick={() => setShowSmokerInfo(!showSmokerInfo)}
                                                title="Clique para mais informações"
                                            />
                                        </div>
                                        {showSmokerInfo && (
                                            <div className={styles.fullscreenModal}>
                                                <div className={styles.modalContent}>
                                                    <p>
                                                        Consideramos fumante quem já fumou pelo menos 100 cigarros ao longo da vida
                                                        (100 cigarros são 5 caixas).
                                                    </p>
                                                    <button
                                                        className={styles.closeButton}
                                                        onClick={() => setShowSmokerInfo(false)}
                                                    >
                                                        Fechar
                                                    </button>
                                                </div>
                                            </div>
                                        )}
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
                                        <div className={styles.question}>5. Você já teve algum derrame?</div>
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
                                        <div className={styles.question}>6. Você tem ou teve alguma doença cardíaca?</div>
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
                            </div>
                        )}

                        {step === 2 && (
                            <div className={styles.question}>
                                <div className={styles.sideQuestion}>
                                    {/* Bloco 2 de perguntas */}
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>7. Você costuma praticar atividade física?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="PhysAct" value="1" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="PhysAct" value="0" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>8. Você costuma consumir uma ou mais frutas por dia?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Fruits" value="1" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Fruits" value="0" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>9. Você costuma consumir uma ou mais vegetais por dia?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Veggies" value="1" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Veggies" value="0" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.sideQuestion}>
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>
                                            10. Você é alcoolatra?
                                            <FaQuestionCircle
                                                className={styles.icon}
                                                onClick={() => setShowAlcoholInfo(!showAlcoholInfo)}
                                                title="Clique para mais informações"
                                            />
                                        </div>
                                        {showAlcoholInfo && (
                                            <div className={styles.fullscreenModal}>
                                                <div className={styles.modalContent}>
                                                    <p>
                                                        Consideramos alcoólatra quem consome 14 doses por semana (para homens) ou 
                                                        10 doses por semana (para mulheres).
                                                    </p>
                                                    <button
                                                        className={styles.closeButton}
                                                        onClick={() => setShowAlcoholInfo(false)}
                                                    >
                                                        Fechar
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HvyAlcohol" value="1" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HvyAlcohol" value="0" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>11. Você tem algum plano de saúde</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HealthCare" value="1" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HealthCare" value="0" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>12. Você precisou de alguma consulta médica nos últimos 12 meses?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="NoDobsCost" value="1" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="NoDobsCost" value="0" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className={styles.navigationButtons}>
                            {step > 1 && (
                                <button type="button" className={styles.navButton} onClick={prevStep}>
                                    Voltar
                                </button>
                            )}
                            {step < 2 && (
                                <button type="button" className={styles.navButton} onClick={nextStep}>
                                    Avançar
                                </button>
                            )}
                            {step === 2 && (
                                <button type="submit" className={styles.navButton}>
                                    Enviar
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Extended;