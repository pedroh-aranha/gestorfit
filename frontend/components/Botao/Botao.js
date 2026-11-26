import styles from "./Botao.module.css";

// variante: "principal", "secundario" ou "perigo".
// ...resto: qualquer outra prop (onClick, type, disabled) passa direto para o <button>.
export default function Botao({ variante = "principal", children, ...resto }) {
  return (
    <button className={`${styles.botao} ${styles[variante]}`} {...resto}>
      {children}
    </button>
  );
}
