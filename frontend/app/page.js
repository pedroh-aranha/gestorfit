"use client";

import { useState } from "react";
import { turmas, modalidades } from "@/dados/exemplo";
import Filtro from "@/components/Filtro/Filtro";
import ListaTurmas from "@/components/ListaTurmas/ListaTurmas";

export default function Home() {
  const [modalidadeId, setModalidadeId] = useState("");

  const turmasFiltradas = modalidadeId
    ? turmas.filter((t) => String(t.modalidadeId) === String(modalidadeId))
    : turmas;

  return (
    <main>
      <Filtro
        modalidades={modalidades}
        valorSelecionado={modalidadeId}
        aoMudar={setModalidadeId}
      />

      <ListaTurmas turmas={turmasFiltradas} modalidades={modalidades} />
    </main>
  );
}