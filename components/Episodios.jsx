import React, { useState } from "react";
import styles from '../styles/Episodios.module.css';

const Episodios = () => {
    const [temporadas] = useState([
        {
            id: 1,
            nome: 'Temporada 1',
            episodios: [
                {
                    id: 1,
                    nome: 'Episódio 1',
                    descricao: 'Aventuras de outra dimensão.',
                    link: "https://youtu.be/5ZuoZJB-FFo?si=gwLhYCJD5dLckMB7",
                },
                {
                    id: 2,
                    nome: 'Episódio 2',
                    descricao: "Rick e seu grande plano de Desmantelamento do governo alienígena.",
                    link: "https://youtu.be/DDHvK2vEq24?si=gzlczHUH8IRmPG2o",
                },
                {
                    id: 3,
                    nome: 'Episódio 3',
                    descricao: 'Morty e sua angústia existencial.',
                    link: "https://youtu.be/EohG84f4WR8?si=Op8N4Ag4_LUTSp4a",
                },
                {
                    id: 4,
                    nome: 'Episódio 4',
                    descricao: "Rick e Morty: uma grande odisseia no tempo contra as serpentes.",
                    link: "https://youtu.be/JkFf7KQE_BE?si=fPZfBktvwoAbAUTy",
                },
            ],
        },
        {
            id: 2,
            nome: 'Temporada 2',
            episodios: [
                {
                    id: 1,
                    nome: 'Episódio 1',
                    descricao: 'Rick é um holograma e precisa da ajuda de Morty.',
                    link: "https://youtu.be/RZTTW2NIwDg?si=NBzqiScRxAaNLGKi",
                },
                {
                    id: 2,
                    nome: 'Episódio 2',
                    descricao: "Aventura complicada de Morty com um dragão",
                    link: "https://youtu.be/ltkWFfVAHeI?si=hJfnyKk-1NOGq5Xa",
                },
            ],
        },
    ]);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.logo}>Rick and Morty</div>
                <nav className={styles.nav}>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/episodios">Episódios</a></li>
                        <li><a href="/sobre">Sobre</a></li>
                    </ul>
                </nav>
            </header>
            <div className={styles.container}>
                <h1>Episódios</h1>
                {temporadas.map((temporada) => (
                    <div key={temporada.id} className={styles.temporada}>
                        <h2>{temporada.nome}</h2>
                        <div className={styles.episodios}>
                            {temporada.episodios.map((episodio) => (
                                <div key={episodio.id} className={styles.episodio}>
                                    <h3>{episodio.nome}</h3>
                                    <p>{episodio.descricao}</p>
                                    <a href={episodio.link} target="_blank" rel="noopener noreferrer" className={styles.assistir}>Assistir</a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Episodios;