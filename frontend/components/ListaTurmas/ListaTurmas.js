"use client"

import { turmas, modalidades } from "@/dados/exemplo"
import styles from "./ListaTurmas.module.css"
import { useState } from "react"

export default function ListaTurmas() {
  const [listaturmas, setTurmas] = useState(turmas);

  return (
    <ul className={styles.lista}>
        {listaturmas.map((turma) => {
            const temVaga = turma.vagas > 0;

            const modalidade = modalidades?.find(
                (m) => m.id === turma.modalidadeId
              );

            return (
                <li
                  key={turma.id}
                  className={`${styles.turma} ${temVaga ?
                    styles.comVaga : styles.semVaga}`}
                    >

                    <h3>{modalidade ? modalidade.nome : "Sem modalidade"}</h3>
                    <p>Dias: {turma.diasemana}</p>
                    <p>Horário: {turma.horario}</p>
                    <p>Instrutor: {turma.instrutor}</p>
                    <p>Vagas: {turma.vagas}</p>
                    <span className={styles.status}>
                    {temVaga ? "Com vagas" : "Sem vagas"}
                    </span>
                </li>
            );
        })}
    </ul>
  );
}