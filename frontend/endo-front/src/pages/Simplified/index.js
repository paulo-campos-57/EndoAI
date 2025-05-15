import React, { useState, useEffect } from "react";
import styles from "./Simplified.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Simplified() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        userName: "",
        age: "",
        Height: "",
        Weight: "",
        Sex: "",
        HighBP: "",
        HighChol: "",
        CholCheck: "",
        Smoker: "",
        Stroke: "",
        HeartDiseaseorAttack: "",
        PhysActivity: "",
        Fruits: "",
        Veggies: "",
        HvyAlcoholConsump: "",
        AnyHealthcare: "",
        NeedDoc: "",
        NoDocbcCost: "",
        GenHlth: "",
        MentHlth: "",
        PhysHlth: "",
        DiffWalk: "",
        Diabetes_012: "",
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
                                                type="text"
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