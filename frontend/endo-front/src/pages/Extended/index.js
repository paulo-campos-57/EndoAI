import React, { useState } from "react";
import { FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import styles from "./Extended.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Extended() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [showSmokerInfo, setShowSmokerInfo] = useState(false);
    const [showAlcoholInfo, setShowAlcoholInfo] = useState(false);

    const [showDoctorFollowup, setDoctorFollowup] = useState(false);
    const [step, setStep] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/resultado", { state: { userName } });
    };

    const nextStep = () => {
        setStep(prev => Math.min(prev + 1, 4));
    };

    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 1));
    };

    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <div className={styles.title}>Avaliação Extendida {userName && `- ${userName}`}</div>
                    <form className={styles.ansForm} onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className={styles.firstQuestion}>
                                <div className={styles.firstQuestionContainer}>
                                    <div className={styles.capsule}>
                                        <div className={styles.question}>Informe o seu nome</div>
                                        <div className={styles.questionAns}>
                                            <input
                                                type="text"
                                                name="Name"
                                                className={styles.numberInput}
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.capsule}>
                                        <div className={styles.question}>Informe sua idade</div>
                                        <div className={styles.questionAns}>
                                            <input
                                                type="text"
                                                name="Age"
                                                maxLength={3}
                                                pattern="\d{1,3}"
                                                inputMode="numeric"
                                                className={styles.numberInput}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {step === 2 && (
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

                        {step === 3 && (
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
                                        <div className={styles.question}>9. Você já teve/tem doença coronariana ou infarto?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HeartDiseaseorAttack" value="1" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HeartDiseaseorAttack" value="0" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.sideQuestion}>
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>10. Você costuma praticar atividade física?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="PhysActivity" value="1" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="PhysActivity" value="0" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>11. Você costuma consumir uma ou mais frutas por dia?</div>
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
                                        <div className={styles.question}>12. Você costuma consumir uma ou mais verduras por dia?</div>
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
                            </div>
                        )}

                        {step === 4 && (
                            <div className={styles.question}>
                                <div className={styles.sideQuestion}>
                                    {/* Bloco 3 de perguntas */}
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>13. Você tem algum plano de saúde?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="AnyHeatlhcare" value="1" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="AnyHeatlhcare" value="0" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>
                                            14. Você precisou de alguma consulta médica no último ano?
                                        </div>

                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton} onClick={() => setDoctorFollowup(true)}>
                                                <input
                                                    type="radio"
                                                    name="NeedDoc"
                                                    value="1"
                                                    className={styles.radioInput}
                                                />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>

                                            <label className={styles.radioButton}>
                                                <input
                                                    type="radio"
                                                    name="NeedDoc"
                                                    value="0"
                                                    className={styles.radioInput}
                                                />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>

                                        {showDoctorFollowup && (
                                            <div className={styles.fullscreenModal}>
                                                <div className={styles.modalContent}>
                                                    <p>Você foi no médico quando precisou?</p>
                                                    <div className={styles.questionAnsPop}>
                                                        <label className={styles.radioButton} onClick={() => setDoctorFollowup(false)}>
                                                            <input type="radio" name="NoDocbcCost" value="1" className={styles.radioButtonPop} />
                                                            <span className={styles.buttonLabel}>SIM</span>
                                                        </label>

                                                        <label className={styles.radioButton} onClick={() => setDoctorFollowup(false)}>
                                                            <input type="radio" name="NoDocbcCost" value="0" className={styles.radioButtonPop} />
                                                            <span className={styles.buttonLabel}>NÃO</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>15. Você diria que sua saúde é?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="GenHlth" value="1" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>EXCELENTE</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="GenHlth" value="2" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>MUITO BOA</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="GenHlth" value="3" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>BOA</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="GenHlth" value="4" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>REGULAR</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="GenHlth" value="5" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>RUIM</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.sideQuestion}>
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>16. No último mês, em quantos dias sua saúde mental não estava boa?</div>
                                        <div className={styles.questionAns}>
                                            <input
                                                type="text"
                                                name="MentHlth"
                                                maxLength={2}
                                                pattern="\d{1,2}"
                                                inputMode="numeric"
                                                className={styles.numberInput}
                                                onInput={(e) => {
                                                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>17. No último mês, em quantos dias sua saúde física não estava boa?</div>
                                        <div className={styles.questionAns}>
                                            <input
                                                type="text"
                                                name="PhysHlth"
                                                maxLength={2}
                                                pattern="\d{1,2}"
                                                inputMode="numeric"
                                                className={styles.numberInput}
                                                onInput={(e) => {
                                                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>18. Você sente dificuldade ao subir escadas?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="DiffWalk" value="1" className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="DiffWalk" value="0" className={styles.radioInput} />
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
                            {step < 4 && (
                                <button type="button" className={styles.navButton} onClick={nextStep}>
                                    Avançar
                                </button>
                            )}
                            {step === 4 && (
                                <button type="submit" className={styles.navButton}>
                                    Enviar
                                </button>
                            )}
                        </div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progress}
                                style={{ width: `${(step / 4) * 100}%` }}
                            ></div>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Extended;