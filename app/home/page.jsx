"use client";

import { useEffect, useState } from "react";
import axios from "axios"; 

import CharacterCard from "../../components/CharacterCard";
import styles from "./Home.module.css";
import Header from "../../components/Header.jsx";

export default function Home() {
    const [search, setSearch] = useState("");
    const [notFound, setNotFound] = useState(false);
    const [characters, setCharacters] = useState([]);


    useEffect(() => {
        const fetchCharacters = async (name = "") => {
            try {
                const response =await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
                setCharacters(response.data.results);
            } catch (error) {
                console.error("Erro ao buscar personagens",error);
                setNotFound(true);
                setCharacters([]);
            }
        };
        fetchCharacters();
    }, []);

    return (
        <>
        <Header /> 
        <div className={styles.searchContainer}>
            <input type="text" placeholder="Digite o nome do personagem" value={search} onChange={(e) => setSearch(e.target.value)} className={styles.searchInput} />
            <button onClick={() => fetchCharacters(search)} className={styles.searchButton} >
                Buscar
            </button>
            <button onClick={() => {setSearch(""); fetchCharacters();}} className={styles.resetButton}>Resetar </button>
        </div>
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