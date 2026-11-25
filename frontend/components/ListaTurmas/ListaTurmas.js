import styles from "./ListaTurmas.module.css";
import CardTurma from "../CardTurma/CardTurma";

export default function ListaTurmas({ turmas, modalidades }) {
  return (
    <ul className={styles.lista}>
      {turmas.map((turma) => {
        const modalidade = modalidades.find(
          (m) => m.id === turma.modalidadeId
        );

        return (
          <CardTurma
            key={turma.id}
            turma={turma}
            nomeModalidade={modalidade ? modalidade.nome : "Sem modalidade"}
          />
        );
      })}
    </ul>
  );
}