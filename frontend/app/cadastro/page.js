"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Botao from "@/components/Botao/Botao";
import Campo from "@/components/Campo/Campo";
import Mensagem from "@/components/Mensagem/Mensagem";
import { cadastrarUsuario } from "@/lib/banco";
import styles from "../login/login.module.css";

export default function Cadastro() {
  const router = useRouter();
  const [dados, setDados] = useState({ nome: "", email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const mudar = (event) => {
    const { name, value } = event.target;
    setDados({ ...dados, [name]: value });
  };

  const enviar = async (event) => {
    event.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      await cadastrarUsuario(dados);
      router.push("/login"); // conta criada: agora é só entrar
    } catch (e) {
      setErro(e.message); // 400 (campo vazio) ou 409 (e-mail repetido)
      setEnviando(false);
    }
  };

  return (
    <form className={styles.login} onSubmit={enviar} noValidate>
      <h1>Criar conta</h1>
      <Mensagem tipo="erro">{erro}</Mensagem>

      <Campo
       rotulo="Nome"
        id="nome"
        name="nome"
        value={dados.nome} 
        onChange={mudar} 
        />

      <Campo
        rotulo="E-mail"
        id="email"
        name="email"
        type="email"
        value={dados.email}
        onChange={mudar}
      />
      
      <Campo
        rotulo="Senha"
        id="senha"
        name="senha"
        type="password"
        value={dados.senha}
        onChange={mudar}
      />
      <Botao type="submit" disabled={enviando}>
        {enviando ? "Criando..." : "Criar conta"}
      </Botao>
      <p>
        Já tem conta? <Link href="/login">Entrar</Link>
      </p>
    </form>
  );
}
