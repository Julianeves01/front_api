import React from "react";
import styles from '../styles/Header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Minha Logo</div>
            <nav className={styles.nav}>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#sobre">Sobre</a></li>
                    <li><a href="#contato">Contato</a></li>
                </ul>
            </nav>
        </header>
    );
}