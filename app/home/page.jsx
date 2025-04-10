"use client";

import { useEffect, useState } from "react";
import axios from "axios"; // Importação do axios

import CharacterCard from "../../components/CharacterCard";
import styles from "./Home.module.css";

export default function Home() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/character')
            .then(response => {
                setCharacters(response.data.results);
            })
            .catch(error => {
                console.error("Erro ao buscar personagens: ", error);
            });
    }, []); // Adicionado array de dependências vazio para evitar chamadas infinitas, ativando apenas uma vez só.

    console.log(characters) // Para verificar se os dados estão sendo recebidos corretamente.

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
            {characters.map((char) => (
                <CharacterCard key={char.id} character={char} />
            ))}
        </div>
        </div>
    );
}