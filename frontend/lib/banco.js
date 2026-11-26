// "Back-end de mentira": guarda os dados no localStorage do navegador.
// As funções têm os mesmos nomes das rotas da API e devolvem Promises,
// para a troca pela API de verdade mudar só este arquivo.
import {
    modalidades as modalidadesIniciais,
    turmas as turmasIniciais,
    usuarios as usuariosIniciais,
  } from "@/dados/exemplo";
  import { pegarToken } from "@/lib/sessao";
  
  // ler e gravar com segurança
  const CHAVES = {
    modalidades: "banco-modalidades",
    turmas: "banco-turmas",
    usuarios: "banco-usuarios",
  };
  
  function ler(chave, inicial) {
    try {
      const texto = localStorage.getItem(chave);
      return texto ? JSON.parse(texto) : inicial;
    } catch {
      return inicial; // JSON estragado: começa de novo
    }
  }
  
  function gravar(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
  }
  
  // erros com status, como a API
  function erro(status, mensagem) {
    const e = new Error(mensagem);
    e.status = status;
    return e;
  }
  
  const esperar = (ms = 300) => new Promise((resolver) => setTimeout(resolver, ms));
  
  // token
  function usuarioLogado() {
    const token = pegarToken();
    const usuario = ler(CHAVES.usuarios, usuariosIniciais).find(
      (u) => u.token && u.token === token,
    );
    if (!usuario) throw erro(401, "Faça login para continuar.");
    return usuario;
  }
  
  // modalidades
  export async function listarModalidades() {
    await esperar();
    return ler(CHAVES.modalidades, modalidadesIniciais);
  }
  
  export async function criarModalidade({ nome }) {
    await esperar();
    usuarioLogado();
    if (!nome || nome.trim() === "")
      throw erro(400, "O nome da modalidade é obrigatório.");
    const modalidades = ler(CHAVES.modalidades, modalidadesIniciais);
    const nova = { id: Date.now(), nome: nome.trim() };
    gravar(CHAVES.modalidades, [...modalidades, nova]);
    return nova;
  }
  
  // turmas
  export async function listarTurmas() {
    await esperar();
    return ler(CHAVES.turmas, turmasIniciais);
  }
  
  export async function buscarTurma(id) {
    await esperar();
    const turma = ler(CHAVES.turmas, turmasIniciais).find(
      (t) => t.id === Number(id),
    );
    if (!turma) throw erro(404, "Turma não encontrada.");
    return turma;
  }
  
  // valida e monta a turma do jeito que o banco guarda
  function montarTurma(dados) {
    if (!dados.modalidadeId) throw erro(400, "A modalidade é obrigatória.");
    const modalidade = ler(CHAVES.modalidades, modalidadesIniciais).find(
      (m) => m.id === Number(dados.modalidadeId),
    );
    if (!modalidade) throw erro(400, "Modalidade inválida.");
  
    if (!dados.diasemana || dados.diasemana.trim() === "")
      throw erro(400, "Os dias da semana são obrigatórios.");
    if (!dados.horario || dados.horario.trim() === "")
      throw erro(400, "O horário é obrigatório.");
    if (!dados.instrutor || dados.instrutor.trim() === "")
      throw erro(400, "O instrutor é obrigatório.");
  
    const vagas = Number(dados.vagas) || 0;
    // Se não vier status explícito, define automaticamente com base nas vagas
    const status = dados.status?.trim() || (vagas > 0 ? "Ativa" : "Lotada");
  
    return {
      modalidadeId: modalidade.id,
      diasemana: dados.diasemana.trim(),
      horario: dados.horario.trim(),
      instrutor: dados.instrutor.trim(),
      vagas,
      status,
    };
  }
  
  export async function criarTurma(dados) {
    await esperar();
    const usuario = usuarioLogado(); // sem login da o 401
    const nova = { id: Date.now(), ...montarTurma(dados), usuarioId: usuario.id };
    const turmas = ler(CHAVES.turmas, turmasIniciais);
    gravar(CHAVES.turmas, [...turmas, nova]);
    return nova;
  }
  
  export async function atualizarTurma(id, dados) {
    await esperar();
    usuarioLogado();
    const turmas = ler(CHAVES.turmas, turmasIniciais);
    const posicao = turmas.findIndex((t) => t.id === Number(id));
    if (posicao === -1) throw erro(404, "Turma não encontrada.");
    const atualizada = { ...turmas[posicao], ...montarTurma(dados) };
    gravar(
      CHAVES.turmas,
      turmas.map((t, i) => (i === posicao ? atualizada : t)),
    );
    return atualizada;
  }
  
  export async function excluirTurma(id) {
    await esperar();
    usuarioLogado();
    const turmas = ler(CHAVES.turmas, turmasIniciais);
    if (!turmas.some((t) => t.id === Number(id)))
      throw erro(404, "Turma não encontrada.");
    gravar(
      CHAVES.turmas,
      turmas.filter((t) => t.id !== Number(id)),
    );
  }
  
  // usuários, cadastro e login
  export async function listarUsuarios() {
    await esperar();
    // Remove senha e token antes de devolver a lista de usuários
    return ler(CHAVES.usuarios, usuariosIniciais).map(({ senha, token, ...u }) => u);
  }
  
  export async function cadastrarUsuario({ nome, email, senha }) {
    await esperar();
    if (!nome || !email || !senha)
      throw erro(400, "Preencha nome, e-mail e senha.");
    const usuarios = ler(CHAVES.usuarios, usuariosIniciais);
    const emailLimpo = email.trim().toLowerCase();
    if (usuarios.some((u) => u.email.toLowerCase() === emailLimpo)) {
      throw erro(409, "Este e-mail já está cadastrado.");
    }
    const novo = {
      id: Date.now(),
      nome: nome.trim(),
      email: emailLimpo,
      senha,
      token: null,
    };
    gravar(CHAVES.usuarios, [...usuarios, novo]);
    return { id: novo.id, nome: novo.nome, email: novo.email };
  }
  
  export async function fazerLogin({ email, senha }) {
    await esperar();
    if (!email || !senha) throw erro(400, "Preencha e-mail e senha.");
    const usuarios = ler(CHAVES.usuarios, usuariosIniciais);
    const emailLimpo = email.trim().toLowerCase();
    const usuario = usuarios.find((u) => u.email.toLowerCase() === emailLimpo);
  
    // Como os usuários iniciais do exemplo não têm senha definida, aceita senha se já existir
    // ou exige que o usuário tenha sido cadastrado com senha
    if (!usuario || !usuario.senha || usuario.senha !== senha)
      throw erro(401, "E-mail ou senha incorretos.");
  
    const token = `token-${usuario.id}-${Date.now()}`;
    gravar(
      CHAVES.usuarios,
      usuarios.map((u) => (u.id === usuario.id ? { ...u, token } : u)),
    );
    return { token, nome: usuario.nome };
  }