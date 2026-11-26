"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Botao from "@/components/Botao/Botao";
import Campo from "@/components/Campo/Campo";
import Mensagem from "@/components/Mensagem/Mensagem";
import { fazerLogin } from "@/lib/banco";
import { entrar } from "@/lib/sessao";
import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviar = async (event) => {
    event.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      const resposta = await fazerLogin({ email, senha }); // { token, nome }
      entrar(resposta.token, resposta.nome); // guarda a sessão
      router.replace("/");
    } catch (e) {
      setErro(e.message); // 400 ou 401
      setEnviando(false);
    }
  };

  return (
    <form className={styles.login} onSubmit={enviar} noValidate>
      <h1>Entrar</h1>
      <Mensagem tipo="erro">{erro}</Mensagem>
      <Campo
        rotulo="E-mail"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Campo
        rotulo="Senha"
        id="senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <Botao type="submit" disabled={enviando}>
        {enviando ? "Entrando..." : "Entrar"}
      </Botao>
      <p>
        Não tem conta? <Link href="/cadastro">Cadastre-se</Link>
      </p>
    </form>
  );
}
