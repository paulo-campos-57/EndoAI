import React, { useState, useEffect } from "react";
import { FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./Extended.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Extended() {
    const navigate = useNavigate();

    const [showSmokerInfo, setShowSmokerInfo] = useState(false);
    const [showAlcoholInfo, setShowAlcoholInfo] = useState(false);

    const [showDoctorFollowup, setDoctorFollowup] = useState(false);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        userName: "",
        Age: "",
        Height: "",
        Weight: "",
        BMI: "",
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
        Education: "",
        Income: ""
    });

    useEffect(() => {
        if (formData.NeedDoc === "0") {
            setFormData(fd => ({ ...fd, NoDocbcCost: "0" }));
        }
    }, [formData.NeedDoc]);

    useEffect(() => {
        if (formData.NoDocbcCost !== "") {
            setDoctorFollowup(false);
        }
    }, [formData.NoDocbcCost]);

    useEffect(() => {
        if (showDoctorFollowup) {
            setFormData(fd => ({ ...fd, NoDocbcCost: "" }));
        }
    }, [showDoctorFollowup]);

    const fieldsByStep = {
        1: ['userName', 'Age'],
        2: ['Height', 'Weight', 'Sex', 'HighBP', 'HighChol', 'CholCheck'],
        3: ['Smoker', 'Stroke', 'HeartDiseaseorAttack', 'PhysActivity', 'Fruits', 'Veggies'],
        4: ['HvyAlcoholConsump', 'AnyHealthcare', 'NeedDoc', 'NoDocbcCost', 'GenHlth', 'MentHlth', 'PhysHlth'],
        5: ['DiffWalk', 'Education', 'Income']
    };

    const isCurrentStepValid = fieldsByStep[step].every(
        key => formData[key] !== ""
    );

    const isFormValid = Object.values(formData).every(val => val !== "");

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const sanitizedValue = value.replace(/\D/g, '').slice(0, 3);

        setFormData((prevData) => {
            const updatedData = {
                ...prevData,
                [name]: sanitizedValue
            };

            const height = parseFloat(updatedData.Height);
            const weight = parseFloat(updatedData.Weight);

            if (!isNaN(height) && height > 0 && !isNaN(weight)) {
                const heightInMeters = height / 100;
                const bmi = weight / (heightInMeters * heightInMeters);
                updatedData.BMI = bmi.toFixed(2);
                const existingBmiInput = document.querySelector('[data-testid="bmi-value"]');
                if (existingBmiInput) {
                    existingBmiInput.value = bmi.toFixed(2);
                } else {
                    const bmiInput = document.createElement('input');
                    bmiInput.type = 'hidden';
                    bmiInput.value = bmi.toFixed(2);
                    bmiInput.dataset.testid = 'bmi-value';
                    document.body.appendChild(bmiInput);
                }
            } else {
                updatedData.BMI = "";
                const existingBmiInput = document.querySelector('[data-testid="bmi-value"]');
                if (existingBmiInput) {
                    existingBmiInput.remove();
                }
            }

            return updatedData;
        });
    };

    const handleSubmit = async (e) => {
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

        const featuresToSend = [
            "HighBP", "HighChol", "CholCheck", "BMI", "Smoker", "Stroke",
            "HeartDiseaseorAttack", "PhysActivity", "Fruits", "Veggies",
            "HvyAlcoholConsump", "AnyHealthcare", "NoDocbcCost", "GenHlth",
            "MentHlth", "PhysHlth", "DiffWalk", "Sex", "Age", "Education", "Income"
        ];

        const filteredData = Object.fromEntries(
            featuresToSend.map(key => [key, formData[key]])
        );

        const castedData = {
            ...filteredData,
            HighBP: parseInt(filteredData.HighBP),
            HighChol: parseInt(filteredData.HighChol),
            CholCheck: parseInt(filteredData.CholCheck),
            BMI: parseFloat(filteredData.BMI),
            Smoker: parseInt(filteredData.Smoker),
            Stroke: parseInt(filteredData.Stroke),
            HeartDiseaseorAttack: parseInt(filteredData.HeartDiseaseorAttack),
            PhysActivity: parseInt(filteredData.PhysActivity),
            Fruits: parseInt(filteredData.Fruits),
            Veggies: parseInt(filteredData.Veggies),
            HvyAlcoholConsump: parseInt(filteredData.HvyAlcoholConsump),
            AnyHealthcare: parseInt(filteredData.AnyHealthcare),
            NoDocbcCost: parseInt(filteredData.NoDocbcCost),
            GenHlth: parseInt(filteredData.GenHlth),
            MentHlth: parseFloat(filteredData.MentHlth),
            PhysHlth: parseFloat(filteredData.PhysHlth),
            DiffWalk: parseInt(filteredData.DiffWalk),
            Sex: parseInt(filteredData.Sex),
            Age: parseInt(filteredData.Age),
            Education: parseInt(filteredData.Education),
            Income: parseInt(filteredData.Income),
        };

        try {
            const response = await fetch("http://localhost:5000/prever_ex", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(castedData)
            });

            if (!response.ok) {
                throw new Error("Erro ao enviar dados para o backend.");
            }

            const result = await response.json();
            console.log("Resposta do backend:", result);

            toast.success(`Chance de diabetes: ${result.chance_diabetes}`, {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
            });

            navigate("/resultado", {
                state: {
                    userName: formData.userName,
                    chanceDiabetes: result.chance_diabetes,
                    featuresImportance: result.feat_imp
                }
            });

        } catch (error) {
            console.error("Erro na submissão:", error);
            toast.error("Ocorreu um erro ao prever a chance de diabetes.", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
            });
        }
    };

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

    return (
        <>
            <ToastContainer />
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <div className={styles.title}>Avaliação Extendida {formData.userName && `- ${formData.userName}`}</div>
                    <form className={styles.ansForm} onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className={styles.firstQuestion}>
                                <div className={styles.firstQuestionContainer}>
                                    <div className={styles.capsule}>
                                        <label htmlFor="userName" className={styles.question}>Informe o seu nome</label>
                                        <div className={styles.questionAns}>
                                            <input
                                                id="userName"
                                                type="text"
                                                name="Name"
                                                className={styles.numberInput}
                                                value={formData.userName}
                                                onChange={e => setFormData(fd => ({ ...fd, userName: e.target.value }))}
                                                aria-label="Informe o seu nome"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className={styles.capsule}>
                                        <label htmlFor="age" className={styles.question}>
                                            Informe sua idade
                                        </label>
                                        <div>
                                            <select
                                                id="age"
                                                name="Age"
                                                defaultValue=""
                                                className={styles.selectInput}
                                                value={formData.Age}
                                                onChange={e => setFormData(fd => ({ ...fd, Age: e.target.value }))}
                                                aria-label="Informe sua idade"
                                            >
                                                <option value="">SELECIONE</option>
                                                <option value="1">
                                                    18 - 24
                                                </option>
                                                <option value="2">
                                                    25 - 29
                                                </option>
                                                <option value="3">
                                                    30 - 34
                                                </option>
                                                <option value="4">
                                                    35 - 39
                                                </option>
                                                <option value="5">
                                                    40 - 44
                                                </option>
                                                <option value="6">
                                                    45 - 49
                                                </option>
                                                <option value="7">
                                                    50 - 54
                                                </option>
                                                <option value="8">
                                                    55 - 59
                                                </option>
                                                <option value="9">
                                                    60 - 64
                                                </option>
                                                <option value="10">
                                                    65 - 69
                                                </option>
                                                <option value="11">
                                                    70 - 74
                                                </option>
                                                <option value="12">
                                                    75 - 79
                                                </option>
                                                <option value="13">
                                                    80+
                                                </option>
                                            </select>
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
                                        <label htmlFor="height" className={styles.question}>1. Qual a sua altura? (Escreva em centímetros. Ex: 181)</label>
                                        <div className={styles.questionAns}>
                                            <input
                                                id="height"
                                                type="number"
                                                name="Height"
                                                maxLength={3}
                                                inputMode="numeric"
                                                className={styles.numberInput}
                                                value={formData.Height}
                                                onChange={handleInputChange}
                                                aria-label="1. Qual a sua altura? (Escreva em centímetros. Ex: 181)"
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <label htmlFor="weight" className={styles.question}>2. Qual o seu peso? (Escreva em kilogramas. Ex: 80)</label>
                                        <div className={styles.questionAns}>
                                            <input
                                                id="weight"
                                                type="number"
                                                name="Weight"
                                                maxLength={3}
                                                inputMode="numeric"
                                                className={styles.numberInput}
                                                value={formData.Weight}
                                                onChange={handleInputChange}
                                                aria-label="2. Qual o seu peso? (Escreva em kilogramas. Ex: 80)"
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>3. Qual seu sexo biológico?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Sex" value="1"
                                                    checked={formData.Sex === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, Sex: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="Masculino" />
                                                <span className={styles.buttonLabel}>Masculino</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Sex" value="0"
                                                    checked={formData.Sex === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, Sex: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="Feminino" />
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
                                                <input type="radio" name="HighBP" value="1"
                                                    checked={formData.HighBP === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, HighBP: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="SIM" />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HighBP" value="0"
                                                    checked={formData.HighBP === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, HighBP: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="NÃO" />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>5. Você já foi diagnosticado com colesterol alto?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HighChol" value="1"
                                                    checked={formData.HighChol === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, HighChol: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="SIM" />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HighChol" value="0"
                                                    checked={formData.HighChol === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, HighChol: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="NÃO" />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>6. Você fez exame de colesterol nos últimos 5 anos?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="CholCheck" value="1"
                                                    checked={formData.CholCheck === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, CholCheck: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="CholCheck" value="0"
                                                    checked={formData.CholCheck === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, CholCheck: e.target.value }))}
                                                    className={styles.radioInput} />
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
                                    {/* Bloco 3 de perguntas */}
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>
                                            7. Você é ou já foi fumante?
                                            <div 
                                                data-testid="smoker-info-icon"
                                                onClick={() => setShowSmokerInfo(!showSmokerInfo)}
                                            >
                                                <FaQuestionCircle
                                                    className={styles.icon}
                                                    title="Clique para mais informações sobre fumantes"
                                                />
                                            </div>
                                        </div>
                                        {showSmokerInfo && (
                                            <div className={styles.fullscreenModal}>
                                                <div className={styles.modalContent} data-testid="smoker-modal">
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
                                                    className={styles.radioInput}
                                                    aria-label="SIM" />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Smoker" value="0"
                                                    checked={formData.Smoker === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, Smoker: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="NÃO" />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>8. Você já teve um AVC?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Stroke" value="1"
                                                    checked={formData.Stroke === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, Stroke: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Stroke" value="0"
                                                    checked={formData.Stroke === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, Stroke: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>9. Você já teve/tem doença coronariana ou infarto?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HeartDiseaseorAttack" value="1"
                                                    checked={formData.HeartDiseaseorAttack === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, HeartDiseaseorAttack: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HeartDiseaseorAttack" value="0"
                                                    checked={formData.HeartDiseaseorAttack === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, HeartDiseaseorAttack: e.target.value }))}
                                                    className={styles.radioInput} />
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

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>11. Você costuma consumir uma ou mais frutas por dia?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Fruits" value="1"
                                                    checked={formData.Fruits === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, Fruits: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="SIM" />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Fruits" value="0"
                                                    checked={formData.Fruits === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, Fruits: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="NÃO" />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>12. Você costuma consumir uma ou mais verduras por dia?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Veggies" value="1"
                                                    checked={formData.Veggies === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, Veggies: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="Veggies" value="0"
                                                    checked={formData.Veggies === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, Veggies: e.target.value }))}
                                                    className={styles.radioInput} />
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
                                    {/* Bloco 4 de perguntas */}
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>
                                            13. Você bebe álcool em excesso por semana?
                                            <div data-testid="alcohol-info-icon">
                                                <FaQuestionCircle
                                                    className={styles.icon}
                                                    onClick={() => setShowAlcoholInfo(!showAlcoholInfo)}
                                                    title="Clique para mais informações sobre álcool"
                                                />
                                            </div>
                                        </div>
                                        {showAlcoholInfo && (
                                            <div className={styles.fullscreenModal}>
                                                <div className={styles.modalContent}>
                                                    <p>
                                                        Excesso é mais de 14 copos por semana (homens) ou mais de 7 copos (mulheres).
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
                                                <input type="radio" name="HvyAlcoholConsump" value="1"
                                                    checked={formData.HvyAlcoholConsump === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, HvyAlcoholConsump: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="SIM" />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HvyAlcoholConsump" value="0"
                                                    checked={formData.HvyAlcoholConsump === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, HvyAlcoholConsump: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="NÃO" />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>14. Você tem algum plano de saúde?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="AnyHealthcare" value="1"
                                                    checked={formData.AnyHealthcare === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, AnyHealthcare: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="SIM" />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="AnyHealthcare" value="0"
                                                    checked={formData.AnyHealthcare === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, AnyHealthcare: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="NÃO" />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>
                                            15. Você precisou de alguma consulta médica no último ano?
                                        </div>

                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton} onClick={() => setDoctorFollowup(true)}>
                                                <input
                                                    type="radio"
                                                    name="NeedDoc"
                                                    value="1"
                                                    id="needDocYes"
                                                    className={styles.radioInput}
                                                    checked={formData.NeedDoc === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, NeedDoc: e.target.value }))}
                                                    data-testid="needDocYes"
                                                    aria-label="SIM" />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>

                                            <label className={styles.radioButton}>
                                                <input
                                                    type="radio"
                                                    name="NeedDoc"
                                                    value="0"
                                                    id="needDocNo"
                                                    checked={formData.NeedDoc === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, NeedDoc: e.target.value }))}
                                                    className={styles.radioInput}
                                                    data-testid="needDocNo"
                                                    aria-label="NÃO" />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>

                                        {showDoctorFollowup && (
                                            <div className={styles.fullscreenModal}>
                                                <div className={styles.modalContent}>
                                                    <p>Você foi no médico quando precisou?</p>
                                                    <div className={styles.questionAnsPop}>
                                                        <label className={styles.radioButton}>
                                                            <input type="radio" name="NoDocbcCost" value="1"
                                                                id="noDocbcCostYes"
                                                                checked={formData.NoDocbcCost === "1"}
                                                                onChange={e => setFormData(fd => ({ ...fd, NoDocbcCost: e.target.value }))}
                                                                data-testid="noDocbcCostYes"
                                                                className={styles.radioButtonPop} />
                                                            <span className={styles.buttonLabel}>SIM</span>
                                                        </label>

                                                        <label className={styles.radioButton}>
                                                            <input type="radio" name="NoDocbcCost" value="0"
                                                                id="noDocbcCostNo"
                                                                checked={formData.NoDocbcCost === "0"}
                                                                onChange={e => setFormData(fd => ({ ...fd, NoDocbcCost: e.target.value }))}
                                                                data-testid="noDocbcCostNo"
                                                                className={styles.radioButtonPop} />
                                                            <span className={styles.buttonLabel}>NÃO</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.sideQuestion}>
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>16. Você diria que sua saúde é?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="GenHlth" value="1"
                                                    checked={formData.GenHlth === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, GenHlth: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="EXCELENTE" />
                                                <span className={styles.buttonLabel}>EXCELENTE</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="GenHlth" value="2"
                                                    checked={formData.GenHlth === "2"}
                                                    onChange={e => setFormData(fd => ({ ...fd, GenHlth: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="MUITO BOA" />
                                                <span className={styles.buttonLabel}>MUITO BOA</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="GenHlth" value="3"
                                                    checked={formData.GenHlth === "3"}
                                                    onChange={e => setFormData(fd => ({ ...fd, GenHlth: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="BOA" />
                                                <span className={styles.buttonLabel}>BOA</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="GenHlth" value="4"
                                                    checked={formData.GenHlth === "4"}
                                                    onChange={e => setFormData(fd => ({ ...fd, GenHlth: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="REGULAR" />
                                                <span className={styles.buttonLabel}>REGULAR</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="GenHlth" value="5"
                                                    checked={formData.GenHlth === "5"}
                                                    onChange={e => setFormData(fd => ({ ...fd, GenHlth: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="RUIM" />
                                                <span className={styles.buttonLabel}>RUIM</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <label htmlFor="mentHlth" className={styles.question}>17. No último mês, em quantos dias sua saúde mental não estava boa?</label>
                                        <div className={styles.questionAns}>
                                            <input
                                                id="mentHlth"
                                                type="number"
                                                name="MentHlth"
                                                maxLength={2}
                                                pattern="\d{1,2}"
                                                inputMode="numeric"
                                                className={styles.numberInput}
                                                value={formData.MentHlth}
                                                onChange={e => setFormData(fd => ({ ...fd, MentHlth: e.target.value }))}
                                                onInput={(e) => {
                                                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 2);
                                                }}
                                                aria-label="17. No último mês, em quantos dias sua saúde mental não estava boa?"
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <label htmlFor="physHlth" className={styles.question}>18. No último mês, em quantos dias sua saúde física não estava boa?</label>
                                        <div className={styles.questionAns}>
                                            <input
                                                id="physHlth"
                                                type="number"
                                                name="PhysHlth"
                                                maxLength={2}
                                                pattern="\d{1,2}"
                                                inputMode="numeric"
                                                className={styles.numberInput}
                                                value={formData.PhysHlth}
                                                onChange={e => setFormData(fd => ({ ...fd, PhysHlth: e.target.value }))}
                                                onInput={(e) => {
                                                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 2);
                                                }}
                                                aria-label="18. No último mês, em quantos dias sua saúde física não estava boa?"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div className={styles.question}>
                                <div className={styles.sideQuestion}>
                                    {/* Bloco 5 de perguntas */}
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>19. Você sente dificuldade ao subir escadas?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="DiffWalk" value="1"
                                                    checked={formData.DiffWalk === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, DiffWalk: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="SIM" />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="DiffWalk" value="0"
                                                    checked={formData.DiffWalk === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, DiffWalk: e.target.value }))}
                                                    className={styles.radioInput}
                                                    aria-label="NÃO" />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>


                                </div>

                                <div className={styles.sideQuestion}>
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>
                                            20. Qual seu nível de escolaridade?
                                        </div>
                                        <div>
                                            <select
                                                id="education"
                                                name="Education"
                                                defaultValue=""
                                                className={styles.selectInput}
                                                value={formData.Education}
                                                onChange={e => setFormData(fd => ({ ...fd, Education: e.target.value }))}
                                                aria-label="20. Qual seu nível de escolaridade?"
                                            >
                                                <option value="">SELECIONE</option>
                                                <option value="1">
                                                    NUNCA FREQUENTEI / JARDIM DE INFÂNCIA
                                                </option>
                                                <option value="2">
                                                    ENSINO FUNDAMENTAL INCOMPLETO / COMPLETO
                                                </option>
                                                <option value="3">
                                                    ENSINO MÉDIO INCOMPLETO
                                                </option>
                                                <option value="4">
                                                    ENSINO MÉDIO COMPLETO
                                                </option>
                                                <option value="5">
                                                    CURSO TÉCNICO / ENSINO SUPERIOR INCOMPLETO
                                                </option>
                                                <option value="6">
                                                    ENSINO SUPERIOR COMPLETO
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <label htmlFor="income" className={styles.question}>
                                            21. Qual sua renda média anual?
                                        </label>
                                        <div>
                                            <select
                                                id="income"
                                                name="Income"
                                                defaultValue=""
                                                className={styles.selectInput}
                                                value={formData.Income}
                                                onChange={e => setFormData(fd => ({ ...fd, Income: e.target.value }))}
                                                aria-label="21. Qual sua renda média anual?"
                                            >
                                                <option value="">SELECIONE</option>
                                                <option value="1">MENOS DE 10.000</option>
                                                <option value="2">MENOS DE 15.000</option>
                                                <option value="3">MENOS DE 20.000</option>
                                                <option value="4">MENOS DE 25.000</option>
                                                <option value="5">MENOS DE 35.000</option>
                                                <option value="6">MENOS DE 50.000</option>
                                                <option value="7">MENOS DE 75.000</option>
                                                <option value="8">MAIS DE 75.000</option>
                                            </select>
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
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progress}
                                style={{ width: `${(step / 5) * 100}%` }}
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