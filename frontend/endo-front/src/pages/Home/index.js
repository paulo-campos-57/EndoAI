import React from "react";
import styles from "./Home.module.css";
import Header from "../../components/Header";

function Home() {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    
                </div>
            </div>
        </>
    );
}

export default Home;