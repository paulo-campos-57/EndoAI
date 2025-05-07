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
                                        <div className={styles.question}>1. Qual a sua altura? (Escreva em centímetros. Ex: 181)</div>
                                        <div className={styles.questionAns}>
                                        <input
                                            type="text"
                                            name="Height"
                                            maxLength={3}
                                            pattern="\d{1,3}"
                                            inputMode="numeric"
                                            className={styles.numberInput}
                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
                                            }}
                                        />                                        
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>2. Qual o seu peso? (Escreva em kilogramas. Ex: 80)</div>
                                        <div className={styles.questionAns}>
                                        <input
                                            type="text"
                                            name="Weight"
                                            maxLength={3}
                                            pattern="\d{1,3}"
                                            inputMode="numeric"
                                            className={styles.numberInput}
                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
                                            }}
                                        />                                        
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>3. Qual seu sexo biológico?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Sex" value="1" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>Masculino</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Sex" value="2" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>Feminino</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.sideQuestion}>
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>4. Você já foi diagnosticado com pressão alta?</div>
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
                                        <div className={styles.question}>5. Você já foi diagnosticado com colesterol alto?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HighCol" value="1" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HighCol" value="0" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                    <div className={styles.question}>6. Você fez exame de colesterol nos últimos 5 anos?</div>
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
                            </div>
                        )}

                        {step === 2 && (
                            <div className={styles.question}>
                                <div className={styles.sideQuestion}>
                                    {/* Bloco 2 de perguntas */}
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>
                                            7. Você é ou já foi fumante?
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
                                                        Consideramos fumante pessoas que já fumaram pelo menos 100 cigarros ao longo da vida
                                                        (100 cigarros equivalem a 5 caixas).
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
                                        <div className={styles.question}>8. Você já teve um AVC?</div>
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
                                        <div className={styles.question}>9. Você tem ou teve alguma doença cardíaca?</div>
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