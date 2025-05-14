import React from "react";
import styles from "./About.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function About() {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <div className={styles.title}>Sobre</div>
                    <div className={styles.blocks}>
                        <div className={styles.block}>
                            <div className={`${styles.typewriterBase} ${styles.typewriter1}`}>Quem Somos</div>
                            <p className={styles.fontText}>
                                Na luta contra a diabetes, informação é poder — e a Endo.AI está aqui para empoderar. Criada por <a href="https://github.com/paulo-campos-57/EndoAI" className={styles.links}>estudantes do 6º período de Ciência da Computação do CESAR School</a>, nossa solução usa inteligência artificial e vai além dos dados: ela educa e conscientiza sobre uma das condições mais silenciosas e perigosas da nossa sociedade.
                            </p>
                        </div>
                        <div className={styles.block}>
                            <div className={`${styles.typewriterBase} ${styles.typewriter2}`}>Nossa Solução</div>
                            <p className={styles.fontText}>
                                O <a href="https://sites.google.com/cesar.school/endo-ai/home" className={styles.links}>Endo.AI</a> é uma ferramenta inteligente, acessível e preventiva criada para ajudar na identificação precoce de possíveis casos de diabetes. Com base em respostas simples feitas em um questionário, nosso modelo de machine learning analisa padrões e estima a probabilidade de risco — tudo isso a partir de uma base de dados sólida e criteriosamente treinada.
                            </p>
                        </div>
                        <div className={styles.block}>
                            <div className={`${styles.typewriterBase} ${styles.typewriter3}`}>Nosso Propósito</div>
                            <p className={styles.fontText}>
                                Sabemos que 1 em cada 3 pessoas com diabetes não sabe que têm a condição. O Endo.AI convida você a se conhecer melhor. A partir do resultado, o próximo passo pode ser procurar um profissional de saúde, fazer exames ou adotar hábitos mais saudáveis. É um gesto simples — mas pode ser o começo de uma grande transformação.
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default About;