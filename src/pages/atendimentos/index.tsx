import { useState, useEffect } from "react";
import Atendimento from "./interfaces/Atendimento";
import ModalCreate from "./components/ModalCreate";
import Menu from "../menu";
import styles from "./styles/Atendimento.module.css";
import ModalUpdate from "./components/ModalUpdate";

export default function Atendimentos() {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [unidadeSelecionada, setUnidadeSelecionada] =
    useState<Atendimento | null>(null);

  useEffect(() => {
    fetch("http://localhost:3333/atendimentos")
      .then((response) => response.json())
      .then((data) => setAtendimentos(data))
      .catch((error) => console.error("Erro ao buscar Atendimentos:", error));
  }, []);

  const handleAddAtendimento = (
    data_de_atendimento: string,
    quantidade: number,
    servicos_id: number,
    unidades_id: number,
    usuarios_id: number,
    comentario: string
  ) => {
    const dataAtendimento = new Date(data_de_atendimento);
    console.log(
      "Novo Atendimento:",
      dataAtendimento,
      quantidade,
      servicos_id,
      unidades_id,
      usuarios_id,
      comentario
    );
    // Lógica adicional para adicionar o atendimento pode ser implementada aqui
  };

  const handleDeleteAtendimento = (id: number) => {
    fetch(`http://localhost:3333/atendimentos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao apagar unidade");
        }
        console.log("Atendimento apagado com sucesso");
        setAtendimentos((prevAtendimentos) =>
          prevAtendimentos.filter((atendimento) => atendimento.id !== id)
        );
      })
      .catch((error) => console.error("Erro ao apagar Atendimento:", error));
  };

  const openUpdateModal = (atendimento: Atendimento) => {
    setUnidadeSelecionada(atendimento);
    setIsModalUpdateOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Menu />
      </div>
      <div className={styles.content}>
        <h1>Atendimentos</h1>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr className={styles.tr}>
              <th className={styles.th}>Registrado em</th>
              <th className={styles.th}>Quantidade</th>
              <th className={styles.th}>Serviço</th>
              <th className={styles.th}>Comentários</th>
              <th className={styles.th}>Unidade</th>
              <th className={styles.th}>Feito por</th>
              <th className={styles.th}>Ações:</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {atendimentos.map((atendimento) => (
              <tr key={atendimento.id} className={styles.tr}>
                <td className={styles.td}>
                  {new Date(
                    atendimento.data_de_atendimento
                  ).toLocaleDateString()}
                </td>
                <td className={styles.td}>{atendimento.quantidade}</td>
                <td className={styles.td}>{atendimento.servico_name}</td>
                <td className={styles.td}>
                  {atendimento.comentarios.map((comentario) => (
                    <div key={comentario.id}>
                      <p>{comentario.comentarios}</p>
                    </div>
                  ))}
                </td>
                <td className={styles.td}>{atendimento.unidade_name}</td>
                <td className={styles.td}>{atendimento.usuario_name}</td>
                <td className={styles.td}>
                  <button onClick={() => openUpdateModal(atendimento)} className={styles.edit}>
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteAtendimento(atendimento.id)} className={styles.delete}
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setIsModalCreateOpen(true)} className={styles.create}>
          Adicionar Atendimento
        </button>
        <ModalCreate
          isOpen={isModalCreateOpen}
          onClose={() => setIsModalCreateOpen(false)}
          onSubmit={handleAddAtendimento}
        />
      </div>
    </div>
  );
}
