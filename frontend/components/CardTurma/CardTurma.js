import Link from "next/link";
import styles from "./CardTurma.module.css";

export default function CardTurma({ turma, nomeModalidade }) {
  const temVaga = turma.vagas > 0;

  return (
    <li
      className={`${styles.turma} ${
        temVaga ? styles.comVaga : styles.semVaga
      }`}
    >
      <Link href={`/turmas/${turma.id}`}>
        <h3>{turma.nome}</h3>
        <p>Modalidade: {nomeModalidade}</p>
        <p>Dias: {turma.diasemana}</p>
        <p>Horário: {turma.horario}</p>
        <p>Instrutor: {turma.instrutor}</p>
        <p>Vagas: {turma.vagas}</p>
        <span className={styles.status}>
          {temVaga ? "Com vagas" : "Sem vagas"}
        </span>
      </Link>
    </li>
  );
}