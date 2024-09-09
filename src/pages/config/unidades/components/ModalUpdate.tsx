import { useState, useEffect } from 'react';
import styles from './ModalCreate.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  unidadeId: string;
  nomeInicial: string;
  dataInicial: string;
  onSubmit: (id: string,nome: string, data_inaugural: string) => void;
}

const ModalUpdate: React.FC<ModalProps> = ({ isOpen, onClose, unidadeId, nomeInicial, dataInicial }) => {
  const [nome, setNome] = useState(nomeInicial);
  const [data_inaugural, setData] = useState(dataInicial);

  useEffect(() => {
    if (isOpen) {
      setNome(nomeInicial);
      setData(dataInicial);
    }
  }, [isOpen, nomeInicial, dataInicial]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3333/unidades/${unidadeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, data_inaugural }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar unidade');
      }

      const updatedUnidade = await response.json();
      console.log('Unidade atualizada com sucesso:', updatedUnidade);

      // Fechar o modal e limpar os campos
      setNome('');
      setData('');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao atualizar unidade:', error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.editM}>Editar Unidade</h2>
        <input 
          type="text" 
          placeholder="Nome da Unidade" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          type="date" 
          placeholder="Data de Inauguração" 
          value={data_inaugural} 
          onChange={(e) => setData(e.target.value)} 
        />
        <button onClick={handleSubmit} className={styles.edit}>Atualizar</button>
        <button onClick={onClose} className={styles.cancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModalUpdate;
