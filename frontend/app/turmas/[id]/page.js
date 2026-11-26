"use client";

import { useParams } from "next/navigation";
import Botao from "@/components/Botao/Botao";
import Mensagem from "@/components/Mensagem/Mensagem";
import Link from "next/link";
import { turmas, modalidades } from "@/dados/exemplo";

export default function DetalheTurma() {
  const { id } = useParams();  // pega pelo id

  const turma = turmas.find((t) => String(t.id) === String(id));

  if (!turma) {
    return (
      <div>
        <p>Turma não encontrada.</p>
        <Botao><Link href="/">Voltar para a lista</Link></Botao>
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
        <Botao><Link href={`/turmas/${turma.id}/editar`}>Editar Turma</Link></Botao>
        <Botao><Link href="/">Voltar</Link></Botao>
      </div>
    </div>
  );
}