// components/Modal.tsx
import { useState } from 'react';
import styles from './ModalCreate.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (nome: string, data_inaugural: string) => void;
}

const ModalCreate: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [nome, setNome] = useState('');
  const [data_inaugural, setData] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Enviar os dados para a API
    fetch('http://localhost:3333/unidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, data_inaugural }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Unidade adicionada com sucesso:', data);
        onSubmit(nome, data_inaugural); // Chama a função onSubmit passada como prop
        setNome('');
        setData('');
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error('Erro ao adicionar unidade:', error);
      });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.adcModal}>Adicionar Unidade</h2>
        <input 
          type="text" 
          placeholder="Nome da Unidade" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          type="date" 
          placeholder="Data de inauguração" 
          value={data_inaugural} 
          onChange={(e) => setData(e.target.value)} 
        />
        <div className={styles.divB}>
          <button onClick={handleSubmit} className={styles.create}>Adicionar</button>
          <button onClick={onClose} className={styles.cancel}>Cancelar</button>
        </div>
        
      </div>
    </div>
  );
};

export default ModalCreate;
