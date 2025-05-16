import React, { useState, useEffect } from "react";
import styles from "./Simplified.module.css";
import { useNavigate } from "react-router-dom";
import { FaQuestionCircle } from 'react-icons/fa';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Simplified() {
    const navigate = useNavigate();
    const [showSmokerInfo, setShowSmokerInfo] = useState(false);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        userName: "",
        age: "",
        Height: "",
        Weight: "",
        HighBP: "",
        HighChol: "",
        BMI: "",
        Smoker: "",
        PhysActivity: "",
        Fruits: "",
        GenHlth: "",
        MentHlth: "",
        PhysHlth: "",
        Education: "",
        Income: ""
    });

    const nextStep = () => {
        if (!isCurrentStepValid) {
            toast.error('Por favor, preencha todos os campos do formulário antes de enviar.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return;
        }
        setStep(prev => Math.min(prev + 1, 5));
    };

    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 1));
    };
    const fieldsByStep = {
        1: ['userName', 'age'],
        2: ['Height', 'Weight', 'Sex', 'HighBP', 'HighChol', 'CholCheck'],
        3: ['Smoker', 'Stroke', 'HeartDiseaseorAttack', 'PhysActivity', 'Fruits', 'Veggies'],
        4: ['HvyAlcoholConsump', 'AnyHealthcare', 'NeedDoc', 'NoDocbcCost', 'GenHlth', 'MentHlth', 'PhysHlth'],
        5: ['DiffWalk', 'Education', 'Income']
    };

    const isCurrentStepValid = fieldsByStep[step].every(
        key => formData[key] !== ""
    );
    const isFormValid = Object.values(formData).every(val => val !== "");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            toast.error('Por favor, preencha todos os campos do formulário antes de enviar.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return;
        }
        navigate("/resultado", { state: { userName: formData.userName } });
    };

    return (
        <>
            <ToastContainer />
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <div className={styles.title}>Avaliação Simplificada {formData.userName && `- ${formData.userName}`}</div>
                    <form className={styles.ansForm}>
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
                                                value={formData.userName}
                                                onChange={e => setFormData(fd => ({ ...fd, userName: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.capsule}>
                                        <div className={styles.question}>Informe sua idade</div>
                                        <div className={styles.questionAns}>
                                            <input
                                                type="number"
                                                name="Age"
                                                maxLength={3}
                                                pattern="\d{1,3}"
                                                inputMode="numeric"
                                                className={styles.numberInput}
                                                value={formData.age}
                                                onChange={e => setFormData(fd => ({ ...fd, age: e.target.value }))}
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
                                                type="number"
                                                name="Height"
                                                maxLength={3}
                                                pattern="\d{1,3}"
                                                inputMode="numeric"
                                                className={styles.numberInput}
                                                value={formData.Height}
                                                onChange={e => setFormData(fd => ({ ...fd, Height: e.target.value }))}
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
                                                type="number"
                                                name="Weight"
                                                maxLength={3}
                                                pattern="\d{1,3}"
                                                inputMode="numeric"
                                                className={styles.numberInput}
                                                value={formData.Weight}
                                                onChange={e => setFormData(fd => ({ ...fd, Weight: e.target.value }))}
                                                onInput={(e) => {
                                                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>3. Você já foi diagnosticado com pressão alta?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HighBP" value="1"
                                                    checked={formData.HighBP === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, HighBP: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HighBP" value="0"
                                                    checked={formData.HighBP === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, HighBP: e.target.value }))}
                                                    className={styles.radioInput} />
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
                                                <input type="radio" name="Smoker" value="1"
                                                    checked={formData.Smoker === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, Smoker: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Smoker" value="0"
                                                    checked={formData.Smoker === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, Smoker: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>5. Você costuma consumir uma ou mais frutas por dia?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Fruits" value="1"
                                                    checked={formData.Fruits === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, Fruits: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Fruits" value="0"
                                                    checked={formData.Fruits === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, Fruits: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>6. Você costuma praticar atividade física?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="PhysActivity" value="1"
                                                    checked={formData.PhysActivity === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, PhysActivity: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="PhysActivity" value="0"
                                                    checked={formData.PhysActivity === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, PhysActivity: e.target.value }))}
                                                    className={styles.radioInput} />
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
                            {step < 5 && (
                                <button type="button" className={styles.navButton} onClick={nextStep}>
                                    Avançar
                                </button>
                            )}
                            {step === 5 && (
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

export default Simplified;