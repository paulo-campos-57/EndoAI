import React, { useState, useEffect } from "react";
import styles from "./Simplified.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


function Simplified() {
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
    return (
        <>
            <div className={styles.container}>
                <Header />
                    <div className={styles.content}>
                    <div className={styles.title}>Avaliação Extendida {formData.userName && `- ${formData.userName}`}</div>
                    
                    </div>
                <Footer />
            </div>
        </>
    );
}

export default Simplified;