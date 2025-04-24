import React from "react";
import styles from "../styles/Contato.module.css";

export default function Contato() {
    return (
        <div className={styles.container}>
            {}
            <a href="/" className={styles.backButton}>
            <img src="/arrow-left-icon.png" alt="Voltar" className={styles.backIcon} />
            Voltar para a Página Principal
            </a>
            <div className={styles.card}>
                <img src="/Minha-foto.jpg" alt="Minha foto" className={styles.image} />
                <h2 className={styles.name}>Julia</h2>
                <p className={styles.description}>
                Olá! Seja bem-vindo(a) ao meu site!
                Meu nome é Julia, sou estudante de Desenvolvimento de Sistemas, e estou explorando o universo das APIs com um toque intergaláctico. Este projeto usa a API de Rick and Morty para mostrar personagens, episódios e muito mais — tudo com um visual divertido e funcional. Abaixo você pode explorar meus projetos, conhecer as linguagens que utilizo, e conferir meu perfil profissional clicando nos ícones abaixo 🚀.
                </p>
            </div>
            <div className={styles.icons}>
                <a href="https://github.com/Julianeves01" target="_blank" rel="noopener noreferrer">
                <img src="/github-icon.png" alt="GitHub" className={styles.icon} />
                </a>
                <a href="https://instagram.com/julia.s.neves" target="_blank" rel="noopener noreferrer">
                <img src="/instagram-icon.png" alt="Instagram" className={styles.icon} />
                </a>
                <a href="https://www.linkedin.com/in/julia-nevess/" target="_blank" rel="noopener noreferrer">
                <img src="/linkedin (1).png" alt="Linkedin" className={styles.icon} />
                </a>
            </div>
        </div>
    );
}