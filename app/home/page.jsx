"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CharacterCard from "../../components/CharacterCard";
import styles from "./Home.module.css";
import Header from "../../components/Header.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import Image from "next/image";

export default function Home() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    const cacheRef = useRef(new Map());
    const [notFound, setNotFound] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Define um tempo para ocultar o GIF de carregamento
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 1000); 

        return () => clearTimeout(timer); 
    }, []);

    const fetchCharacters = async (name = "", pageNumber = 1) => {
        setLoading(true);
        const cache = cacheRef.current;
        const cacheKey = `${name}-${pageNumber}`;
        const nextPageNumber = pageNumber + 1;
        const nextCacheKey = `${name}-${nextPageNumber}`;

        const cleanCacheIfNeeded = () => {
            while (cache.size >= 5) {
                const firstKey = cache.keys().next().value;
                cache.delete(firstKey);
                console.log(`♻️ Removido do cache: ${firstKey}`);
            }
        };

        console.log("\n============== BUSCA INICIADA ==============");
        console.log(`📊 Cache anterior: ${cache.size} páginas`);

        let total = totalPages;

        // Verifica se a página já está no cache
        if (cache.has(cacheKey)) {
            const cached = cache.get(cacheKey);
            setCharacters(cached.results);
            setTotalPages(cached.totalPages);
            total = cached.totalPages;
            setNotFound(false);
            setLoading(false);
            console.log(`✅ Usando cache: ${cacheKey}`);
        } else {
            try {
                const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${name}`);

                cleanCacheIfNeeded();
                cache.set(cacheKey, {
                    results: data.results,
                    totalPages: data.info.pages,
                });

                setCharacters(data.results);
                setTotalPages(data.info.pages);
                total = data.info.pages;
                setNotFound(false);
                console.log(`💾 Salvo no cache: ${cacheKey}`);
            } catch {
                setCharacters([]);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        }

        // Prefetch da próxima página
        if (nextPageNumber <= total && !cache.has(nextCacheKey)) {
            try {
                const res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${nextPageNumber}&name=${name}`);
                cleanCacheIfNeeded();
                cache.set(nextCacheKey, {
                    results: res.data.results,
                    totalPages: res.data.info.pages,
                });
                console.log(`📋 Prefetch salvo: ${nextCacheKey}`);
            } catch (err) {
                console.log(`❌ Prefetch falhou: ${nextCacheKey}`, err);
            }
        } else {
            console.log("ℹ️ Prefetch ignorado: já no cache ou fora do limite");
        }

        console.log(`📦 Cache final: ${cache.size} páginas`);
        for (const [key, val] of cache.entries()) {
            console.log(`📦 ${key}: ${val.results.length} personagens`);
        }
        console.log("============== FIM DA BUSCA ==============\n");
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    const handleSearch = () => {
        setPage(1);
        fetchCharacters(search, 1);
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

    useEffect(() => {
        fetchCharacters(search.trim(), page);
    }, [page]);

    return (
        <>
            <Header />
            <div className={styles.searchContainer}>
                <ToastContainer position="top-right" autoClose={7500} theme="light" />
                <input
                    type="text"
                    placeholder="Digite o nome do personagem"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                />
                <button onClick={handleSearch} className={styles.searchButton}>
                    Buscar
                </button>
                <button onClick={handleReset} className={styles.resetButton}>
                    Resetar
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
            {notFound && <h1 className={styles.notFound}>Nenhum personagem encontrado 😢</h1>}
            <main className={styles.container}>
                {initialLoading ? (
                    <div className={`${styles.loaderWrapper} ${initialLoading ? "" : styles.hidden}`}>
                        <Image src="/rickMorty.gif" alt="Carregando..." className={styles.loader} width={500} height={500} priority />
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {characters.map((char) => (
                            <CharacterCard key={char.id} character={char} onClick={() => handleCharacterClick(char.name)} />
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}