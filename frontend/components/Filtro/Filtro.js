import styles from "./Filtro.module.css";

export default function Filtro({ modalidades, valorSelecionado, aoMudar }) {
  return (
    <div className={styles.container}>
      <label htmlFor="filtro-modalidade" className={styles.label}>
        Filtrar por modalidade:
      </label>

      <select
        id="filtro-modalidade"
        className={styles.select}
        value={valorSelecionado}
        onChange={(e) => aoMudar(e.target.value)}
      >
        <option value="">Todas as modalidades</option>

        {modalidades.map((modalidade) => (
          <option key={modalidade.id} value={modalidade.id}>
            {modalidade.nome}
          </option>
        ))}
      </select>
    </div>
  );
}