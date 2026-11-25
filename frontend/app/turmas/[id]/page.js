"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { turmas, modalidades } from "@/dados/exemplo";

export default function DetalheTurma() {
  const params = useParams();  // pega pelo id

  const turma = turmas.find((t) => String(t.id) === String(params.id));

  if (!turma) {
    return (
      <div>
        <p>Turma não encontrada.</p>
        <Link href="/">Voltar para a lista</Link>
      </div>
    );
  }

  const modalidade = modalidades.find((m) => m.id === turma.modalidadeId);

  return (
    <div>
      <h1>{turma.nome}</h1>
      <p>Modalidade: {modalidade ? modalidade.nome : "Sem modalidade"}</p>
      <p>Dias: {turma.diasemana}</p>
      <p>Horário: {turma.horario}</p>
      <p>Instrutor: {turma.instrutor}</p>
      <p>Vagas: {turma.vagas}</p>

      <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
        <Link href={`/turmas/${turma.id}/editar`}>Editar Turma</Link>
        <Link href="/">Voltar</Link>
      </div>
    </div>
  );
}