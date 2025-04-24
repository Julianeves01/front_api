"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios"; 
import CharacterCard from "../../components/CharacterCard";
import styles from "./Home.module.css";
import Header from "../../components/Header.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";

export default function Home() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    const cacheRef = useRef(new Map());
    const [notFound, setNotFound] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchCharacters = async (name = "", page = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`);
            setCharacters(response.data.results);
            setTotalPages(response.data.info.pages); // Atualiza o total de páginas
            setNotFound(false); 
        } catch (error) {
            console.error("Erro ao buscar personagens", error);
            setNotFound(true);
            setCharacters([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters(search.trim(), page); // Inclui o parâmetro page
    }, [page]);

    useEffect(() => {
        setPage(1);
        fetchCharacters(search.trim(), 1);
    }, [search]);

    const handleSearch = () => {
        const name = search.trim();
        setPage(1);
        fetchCharacters(name, 1);
    };

    const handleReset = () => {
        setSearch("");
        setPage(1);
        fetchCharacters("", 1);
        toast.success("Filtro foi resetado!", { position: "top-left" });
    };

    const handleCharacterClick = (name) => {
        toast.info(`Você clicou no personagem ${name}`, {});
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
            <button onClick={handleReset} className={styles.resetButton}>Resetar
            </button>

        </div>
        <div className={styles.navControls}>
            <button 
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1} 
                className={styles.buttonNav}
            > 
                Página Anterior
            </button>
            <span className={styles.pageCounter}>
                Página {page} de {totalPages}
            </span>
            <button 
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages || totalPages === 0}
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