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
    const [characters, setCharacters] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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
    useEffect(() => {
        fetchCharacters(search.trim(), page);
    }, [page]);

    useEffect(() => {
        fetchCharacters(search, page);
    }, [search]);

    const handleSearch = () => {
        const name = search.trim();
        setPage(1);
        fetchCharacters(name,1);
    };
    const handleReset = () => {
        setSearch("");
        setPage(1);
        fetchCharacters("",1);
        toast.success("Filtro foi resetado!", {position: "top-left"});
    };
    
    const handleCharacterClick = (name) => {
        toast.info(`Você clicou no personagem ${name}`, {
        });
    };

    return (
        <>
        <Header /> 
        <div className={styles.searchContainer}>
            <ToastContainer position="top-right" autoClose={7500} theme="light" />
            <h1 className={styles.title}></h1>
            <input type="text" placeholder="Digite o nome do personagem" value={search} onChange={(e) => setSearch(e.target.value)} className={styles.searchInput} />

            <button onClick={handleSearch} className={styles.searchButton}>
                Buscar
            </button>
            <button onClick={handleReset}className={styles.resetButton}>Resetar </button>
        </div>
        <div className={styles.navControls}>
            <button onClick = {() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1} 
            className={styles.buttonNav}
            > 
            Página Anterior
            </button>
            <button onClick = {() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className={styles.buttonNav}
            >
                Próxima Página
            </button>
        </div>

        {notFound && <h1 className={styles.notFound}>Personagem não encontrado</h1>}

        <main className={styles.container}>
            <section className={styles.grid}>
                {characters.map((char) => (
                    <CharacterCard key={char.id} character={char} onClick={() => handleCharacterClick(char.name)} />
                ))}
            </section>
        </main>
    </>
    );
}