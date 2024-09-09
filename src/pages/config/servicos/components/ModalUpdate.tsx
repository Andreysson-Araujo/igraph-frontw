import { useState, useEffect } from 'react';
import styles from './ModalCreate.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  servicoId: string;
  nomeInicial: string;
  onSubmit: (id: string,nome: string) => void;
}

const ModalUpdate: React.FC<ModalProps> = ({ isOpen, onClose, servicoId, nomeInicial}) => {
  const [nome, setNome] = useState(nomeInicial);
  

  useEffect(() => {
    if (isOpen) {
      setNome(nomeInicial);
    }
  }, [isOpen, nomeInicial]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3333/servicos/${servicoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar unidade');
      }

      const updatedServico = await response.json();
      console.log('Servico atualizado com sucesso:', updatedServico);

      // Fechar o modal e limpar os campos
      setNome('');
      onClose();
      window.location.reload()
    } catch (error) {
      console.error('Erro ao atualizar servico:', error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.editM}>Editar Servico</h2>
        <input 
          type="text" 
          placeholder="Nome do Servico" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
        />
        <button onClick={handleSubmit} className={styles.edit}>Atualizar</button>
        <button onClick={onClose} className={styles.cancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModalUpdate;
