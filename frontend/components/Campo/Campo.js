import styles from "./Campo.module.css";

// Um campo de formulário completo: rótulo, entrada e a mensagem de erro embaixo.
// multilinha: vira <textarea>. Com opções dentro (children): vira <select>.
export default function Campo({
  rotulo,
  id,
  erro,
  multilinha = false,
  children,
  ...resto
}) {
  let Tag = "input";
  if (multilinha) Tag = "textarea";
  if (children) Tag = "select";

  return (
    <div className={styles.campo}>
      <label htmlFor={id}>{rotulo}</label>
      <Tag
        id={id}
        className={erro ? styles.comErro : styles.entrada}
        aria-invalid={erro ? true : undefined}
        {...resto}
      >
        {children}
      </Tag>
      {erro && <span className={styles.erro}>{erro}</span>}
    </div>
  );
}
