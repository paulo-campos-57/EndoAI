import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from "./About.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function About() {

        const teamMembers = [
        { 
            image: '/images/Arthur-Paixao.png',
            name: 'Arthur Paixão',
            email: 'aptm@cesar.school'
        },
        { 
            image: '/images/Diogo-Henrique.png',
            name: 'Diogo Henrique',
            email: 'dhmc@cesar.school'
        },
        { 
            image: '/images/Estela-Lacerda.png',
            name: 'Estela de Lacerda',
            email: 'elo@cesar.school'
        },
        { 
            image: '/images/Gabriel-Simoes.png',
            name: 'Gabriel Simões',
            email: 'gsr@cesar.school'
        },
        { 
            image: '/images/Matheus-Gomes.png',
            name: 'Matheus Gomes',
            email: 'mga@cesar.school'
        },
        { 
            image: '/images/Matheus-Bione.png',
            name: 'Matheus Bione',
            email: 'mvbb@cesar.school'
        },
        { 
            image: '/images/Paulo-Campos.png',
            name: 'Paulo Campos',
            email: 'pmc3@cesar.school'
        },
    ];

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
                        <div className={styles.block}>
                            <div className={`${styles.typewriterBase} ${styles.typewriter4}`}>Nossa Equipe</div>
                            <Swiper
                                modules={[Autoplay, Navigation]}
                                spaceBetween={30}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}
                                navigation={true}
                                className={styles.teamCarousel}
                            >
                                {teamMembers.map((member, index) => (
                                    <SwiperSlide key={index}>
                                        <div className={styles.singleMemberContainer}>
                                            <img 
                                                src={member.image} 
                                                alt={member.name}
                                                className={styles.singleMemberImage} 
                                            />
                                            <div className={styles.memberInfo}>
                                                <p className={styles.memberName}>{member.name}</p>
                                                <p>{member.email}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default About;