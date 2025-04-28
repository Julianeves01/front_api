import Image from "next/image";
import styles from "../styles/Loader.module.css";

export default function Loader() {
    return (
        <div className={styles.container}>
            <Image src="/rickMorty.gif" alt="Carregando.." width={1200} height={1200} priority className={styles.image} />
            <h1 className={styles.message}>Carregando...</h1>
        </div>
    );
}