import { useState, useEffect } from 'react';
import styles from './ModalCreate.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  usuarioId: string;
  nomeInicial: string;
  nicknameIncial: string;
  emailInicial:string;
  nivelInicial:number;
  statusIncial:number;
  onSubmit: (nome: string, nickname:string, email:string, nivel:number, status:number, password: string) => void;
}

const ModalUpdate: React.FC<ModalProps> = ({ isOpen, onClose, usuarioId, nomeInicial, nicknameIncial, emailInicial, nivelInicial, statusIncial}) => {
  const [nome, setNome] = useState(nomeInicial);
  const [nickname, setNickname] = useState(nicknameIncial);
  const [email, setEmail] = useState(emailInicial);
  const [nivel, setNivel] = useState(nivelInicial);
  const [status, setStatus] = useState(statusIncial); 

  useEffect(() => {
    if (isOpen) {
      setNome(nomeInicial);
      setNickname(nicknameIncial);
      setEmail(emailInicial);
      setNivel(nivelInicial);
      setStatus(statusIncial);
    }
  }, [isOpen, nomeInicial, nicknameIncial, emailInicial, nivelInicial, statusIncial]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3333/usuarios/${usuarioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, nickname, email, nivel, status}),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar unidade');
      }

      const updatedServico = await response.json();
      console.log('Servico atualizado com sucesso:', updatedServico);

      // Fechar o modal e limpar os campos
      setNome('');
      setNickname('');
      setEmail('');
      setNivel(nivelInicial);
      setStatus(statusIncial);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar servico:', error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Editar Usuario</h2>
        <input 
          type="text" 
          placeholder="Nome do usuario" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Nome do usuario" 
          value={nickname} 
          onChange={(e) => setNickname(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Email:" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="nivel:" 
          value={nivel} 
          onChange={(e) => setNivel(Number(e.target.value))} 
        />
        <input 
          type="text" 
          placeholder="status:" 
          value={status} 
          onChange={(e) => setStatus(Number(e.target.value))} 
        />
        
        <button onClick={handleSubmit}>Atualizar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModalUpdate;
