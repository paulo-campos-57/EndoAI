import React, { useState } from "react";
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
        Age: "",
        Height: "",
        Weight: "",
        BMI: "",
        HighBP: "",
        HighChol: "",
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
        1: ['userName', 'Age'],
        2: ['Height', 'Weight', 'HighBP', 'HighChol', 'Smoker', 'Fruits'],
        3: ['PhysActivity', 'GenHlth', 'MentHlth', 'PhysHlth', 'Education', 'Income']
    };

    const isCurrentStepValid = fieldsByStep[step].every(
        key => formData[key] !== ""
    );
    const isFormValid = Object.values(formData).every(val => val !== "");

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const sanitizedValue = name === "Height" || name === "Weight"
            ? value.replace(/[^0-9.]/g, '')
            : value.replace(/\D/g, '').slice(0, 3);

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
            } else {
                updatedData.BMI = "";
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
            "HighBP", "HighChol", "BMI", "Smoker",
            "Fruits", "PhysActivity", "GenHlth", "MentHlth", "PhysHlth",
            "Age", "Education", "Income"
        ];

        const filteredData = Object.fromEntries(
            featuresToSend.map(key => [key, formData[key]])
        );

        const castedData = {
            HighBP: parseInt(filteredData.HighBP),
            HighChol: parseInt(filteredData.HighChol),
            BMI: parseFloat(filteredData.BMI),
            Smoker: parseInt(filteredData.Smoker),
            Fruits: parseInt(filteredData.Fruits),
            PhysActivity: parseInt(filteredData.PhysActivity),
            GenHlth: parseInt(filteredData.GenHlth),
            MentHlth: parseInt(filteredData.MentHlth),
            PhysHlth: parseInt(filteredData.PhysHlth),
            Age: parseInt(filteredData.Age),
            Education: parseInt(filteredData.Education),
            Income: parseInt(filteredData.Income),
        };

        try {
            const response = await fetch("http://localhost:5000/prever", {
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
                    chanceDiabetes: result.chance_diabetes
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

    return (
        <>
            <ToastContainer />
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <div className={styles.title}>Avaliação Simplificada {formData.userName && `- ${formData.userName}`}</div>
                    <form className={styles.ansForm} onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className={styles.firstQuestion}>
                                <div className={styles.firstQuestionContainer}>
                                    <div className={styles.capsule}>
                                        <div className={styles.question}>Informe o seu nome</div>
                                        <div className={styles.questionAns}>
                                            <input
                                                type="text"
                                                name="userName"
                                                className={styles.numberInput}
                                                value={formData.userName}
                                                onChange={e => setFormData(fd => ({ ...fd, userName: e.target.value }))}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.capsule}>
                                        <div className={styles.question}>
                                            Informe sua idade
                                        </div>
                                        <div>
                                            <select
                                                name="Age"
                                                defaultValue=""
                                                className={styles.selectInput}
                                                value={formData.Age}
                                                onChange={e => setFormData(fd => ({ ...fd, Age: e.target.value }))}
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
                                        <div className={styles.question}>1. Qual a sua altura? (Escreva em centímetros. Ex: 181)</div>
                                        <div className={styles.questionAns}>
                                            <input
                                                type="number"
                                                name="Height"
                                                maxLength={3}
                                                inputMode="numeric"
                                                className={styles.numberInput}
                                                value={formData.Height}
                                                onChange={handleInputChange}
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
                                                inputMode="numeric"
                                                className={styles.numberInput}
                                                value={formData.Weight}
                                                onChange={handleInputChange}
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
                                        <div className={styles.question}>4. Você já foi diagnosticado com colesterol alto?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HighChol" value="1"
                                                    checked={formData.HighChol === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, HighChol: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>SIM</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="HighChol" value="0"
                                                    checked={formData.HighChol === "0"}
                                                    onChange={e => setFormData(fd => ({ ...fd, HighChol: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>NÃO</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>
                                            5. Você é ou já foi fumante?
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
                                        <div className={styles.question}>6. Você costuma consumir uma ou mais frutas por dia?</div>
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
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className={styles.question}>
                                <div className={styles.sideQuestion}>
                                    {/* Bloco 2 de perguntas */}
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>7. Você costuma praticar atividade física?</div>
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
                                        <div className={styles.question}>8. Você diria que sua saúde é?</div>
                                        <div className={styles.questionAns}>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="GenHlth" value="1"
                                                    checked={formData.GenHlth === "1"}
                                                    onChange={e => setFormData(fd => ({ ...fd, GenHlth: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>EXCELENTE</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="GenHlth" value="2"
                                                    checked={formData.GenHlth === "2"}
                                                    onChange={e => setFormData(fd => ({ ...fd, GenHlth: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>MUITO BOA</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="GenHlth" value="3"
                                                    checked={formData.GenHlth === "3"}
                                                    onChange={e => setFormData(fd => ({ ...fd, GenHlth: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>BOA</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="GenHlth" value="4"
                                                    checked={formData.GenHlth === "4"}
                                                    onChange={e => setFormData(fd => ({ ...fd, GenHlth: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>REGULAR</span>
                                            </label>
                                            <label className={styles.radioButton}>
                                                <input type="radio" name="GenHlth" value="5"
                                                    checked={formData.GenHlth === "5"}
                                                    onChange={e => setFormData(fd => ({ ...fd, GenHlth: e.target.value }))}
                                                    className={styles.radioInput} />
                                                <span className={styles.buttonLabel}>RUIM</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>9. No último mês, em quantos dias sua saúde mental não estava boa?</div>
                                        <div className={styles.questionAns}>
                                            <input
                                                type="number"
                                                name="MentHlth"
                                                maxLength={2}
                                                pattern="\d{1,2}"
                                                inputMode="numeric"
                                                className={styles.numberInput}
                                                value={formData.MentHlth}
                                                onChange={e => setFormData(fd => ({ ...fd, MentHlth: e.target.value }))}
                                                onInput={(e) => {
                                                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.sideQuestion}>
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>10. No último mês, em quantos dias sua saúde física não estava boa?</div>
                                        <div className={styles.questionAns}>
                                            <input
                                                type="number"
                                                name="PhysHlth"
                                                maxLength={2}
                                                pattern="\d{1,2}"
                                                inputMode="numeric"
                                                className={styles.numberInput}
                                                value={formData.PhysHlth}
                                                onChange={e => setFormData(fd => ({ ...fd, PhysHlth: e.target.value }))}
                                                onInput={(e) => {
                                                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.questionContainer}>
                                        <div className={styles.question}>
                                            11. Qual seu nível de escolaridade?
                                        </div>
                                        <div>
                                            <select
                                                name="Education"
                                                defaultValue=""
                                                className={styles.selectInput}
                                                value={formData.Education}
                                                onChange={e => setFormData(fd => ({ ...fd, Education: e.target.value }))}
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
                                        <div className={styles.question}>
                                            12. Qual sua renda média anual?
                                        </div>
                                        <div>
                                            <select
                                                name="Income"
                                                defaultValue=""
                                                className={styles.selectInput}
                                                value={formData.Income}
                                                onChange={e => setFormData(fd => ({ ...fd, Income: e.target.value }))}
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
                            {step < 3 && (
                                <button type="button" className={styles.navButton} onClick={nextStep}>
                                    Avançar
                                </button>
                            )}
                            {step === 3 && (
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

export default Simplified;