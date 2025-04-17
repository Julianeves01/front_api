import React from "react";
import styles from "../styles/Contato.module.css";

export default function Contato() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img src="/Minha-foto.jpg" alt="Minha foto" className={styles.image} />
                <h2 className={styles.name}>Julia</h2>
                <p className={styles.description}>
                    Olá! Bem vindo ao meu site! Meu nome é Julia. Sou desenvolvedora Front-end e entusiasta da tecnologia.
                    Veja minhas linguagens de programação e meus projetos apenas clicando nos ícones abaixo!
                </p>
            </div>
        </div>
    );
}