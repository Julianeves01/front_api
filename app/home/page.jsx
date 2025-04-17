"use client";

import { useEffect, useState } from "react";
import axios from "axios"; 

import CharacterCard from "../../components/CharacterCard";
import styles from "./Home.module.css";
import Header from "../../components/Header.jsx";

export default function Home() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response =await axios.get("https://rickandmortyapi.com/api/character");
                setCharacters(response.data.results);
            } catch (error) {
                console.error("Erro ao buscar personagens",error);
            }
        };
        fetchCharacters();
    }, []);

    return (
        <>
        <Header /> 
        <main className={styles.container}>
            <section className={styles.grid}>
                {characters.map((char) => (
                    <CharacterCard key={char.id} character={char} />
                ))}
            </section>
        </main>
    </>
    );
}