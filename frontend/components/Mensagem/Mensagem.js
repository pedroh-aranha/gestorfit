import styles from "./Mensagem.module.css";

// tipo: "erro", "sucesso" ou "info". O texto vem em children.
export default function Mensagem({ tipo = "info", children }) {
  if (!children) return null; // sem texto, não mostra nada
  return (
    <p
      className={`${styles.mensagem} ${styles[tipo]}`}
      role={tipo === "erro" ? "alert" : "status"}
    >
      {children}
    </p>
  );
}
