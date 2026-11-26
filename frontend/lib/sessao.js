"use client"

const CHAVE = "sessao";

export function entrar(token, nome) {
    localStorage.setItem(CHAVE, JSON.stringify({ token, nome }));
}
export function sair() {
    localStorage.removeItem(CHAVE);
}
export function pegarToken() {
    const texto = localStorage.getItem(CHAVE);
    return texto  ? JSON.parse(texto).token : null
}