"use client";

import { useEffect, useState } from "react";
import axios from "axios"; 
import CharacterCard from "../../components/CharacterCard";
import styles from "./Home.module.css";
import Header from "../../components/Header.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
    const [search, setSearch] = useState("");
    const [notFound, setNotFound] = useState(false);
    const [characters, setCharacters] = useState([]);


    const fetchCharacters = async (name = "") => {
        setNotFound(false);
        try {
            const response =await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
            setCharacters(response.data.results);
        } catch (error) {
            console.error("Erro ao buscar personagens",error);
            setNotFound(true);
            setCharacters([]);
        }
    };
    useEffect(() => {
        fetchCharacters();
    }, []);

    const handleCardClick = (name) => {
        toast.info("Você clicou no personagem: ${name}", {
        });
    };
    
    const handleReset = () => {
        setSearch("");
        fetchCharacters();
        router.push("/"); 
    };

    return (
        <>
        <Header /> 
        <div className={styles.searchContainer}>
            <ToastContainer position="top-right" autoClose={7500} theme="light" />
            <h1 className={styles.title}></h1>
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