// components/Modal.tsx
import { useState } from 'react';
import styles from './ModalCreate.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (nome: string, nickname:string, email:string, nivel:number, status:number, password: string) => void;
}

const ModalCreate: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [nome, setNome] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [nivel, setNivel] = useState('');
  const [status, setStatus] = useState(''); 
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Enviar os dados para a API
    //converte os tipos para number
    const nivelNumber = Number(nivel);
    const statusNumber = Number(status);

    fetch('http://localhost:3333/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, nickname, email, nivel: nivelNumber, status: statusNumber, password}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Unidade adicionada com sucesso:', data);
        onSubmit(nome, nickname, email, nivelNumber, statusNumber, password); // Chama a função onSubmit passada como prop
        setNome('');
        setNickname('');
        setEmail('');
        setNivel('');
        setStatus('');
        setPassword('');
        onClose();
      })
      .catch((error) => {
        console.error('Erro ao adicionar servico:', error);
      });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Adicionar Usuario</h2>
        <input 
          type="text" 
          placeholder="Nome:" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Usuario:" 
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
          onChange={(e) => setNivel(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="status:" 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleSubmit}>Adicionar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModalCreate;
