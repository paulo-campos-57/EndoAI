import React from "react";
import styles from "./Simplified.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Simplified() {
    return (
        <>
            <div className={styles.container}>
                <Header />
                    <div className={styles.content}>

                    </div>
                <Footer />
            </div>
        </>
    );
}

export default Simplified;