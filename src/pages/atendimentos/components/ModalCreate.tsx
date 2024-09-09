import { useState, useEffect } from 'react';
import styles from './ModalCreate.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data_de_atendimento: string, quantidade: number, servicos_id: number, unidades_id: number, usuarios_id: number, comentarios: string) => void;
}

interface Unidade {
  id: number;
  nome: string;
}

interface Servico {
  id: number;
  nome: string;
}

interface Usuario {
  id: number;
  nome: string;
}

const ModalCreate: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [data_de_atendimento, setData] = useState('');
  const [quantidade, setQuantitade] = useState('');
  const [unidades_id, setUnidades] = useState('');
  const [servicos_id, setServicos] = useState('');
  const [usuarios_id, setUsuarios] = useState('');
  const [comentarios, setComentario] = useState('');
  const [unidades, setUnidadesData] = useState<Unidade[]>([]);
  const [servicos, setServicosData] = useState<Servico[]>([]);
  const [usuarios, setUsuariosData] = useState<Usuario[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchUnidades();
      fetchServicos();
      fetchUsuarios();
    }
  }, [isOpen]);

  const fetchUnidades = () => {
    fetch('http://localhost:3333/unidades')
      .then(response => response.json())
      .then(data => setUnidadesData(data))
      .catch(error => console.error('Erro ao buscar unidades:', error));
  };

  const fetchServicos = () => {
    fetch('http://localhost:3333/servicos')
      .then(response => response.json())
      .then(data => setServicosData(data))
      .catch(error => console.error('Erro ao buscar servicos:', error));
  };

  const fetchUsuarios = () => {
    fetch('http://localhost:3333/usuarios')
      .then(response => response.json())
      .then(data => setUsuariosData(data))
      .catch(error => console.error('Erro ao buscar usuarios:', error));
  };

  const handleSubmit = () => {
    const quantidadeNumber = Number(quantidade);
    const servicoNumber = Number(servicos_id);
    const unidadeNumber = Number(unidades_id);
    const usuarioNumber = Number(usuarios_id);

    fetch('http://localhost:3333/atendimentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data_de_atendimento, quantidade: quantidadeNumber, servicos_id: servicoNumber, unidades_id: unidadeNumber, usuarios_id: usuarioNumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Atendimento adicionado com sucesso:', data);
        onClose();
        window.location.reload()

        // Envia o comentário para a rota de comentários, referenciando o ID do atendimento criado
        fetch('http://localhost:3333/comentarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comentarios, atendimentos_id: data.id }), // Envia o comentário com o ID do atendimento
        })
          .then(response => response.json())
          .then(dataComentario => {
            console.log('Comentário adicionado com sucesso:', dataComentario);
            onSubmit(data_de_atendimento, quantidadeNumber, servicoNumber, unidadeNumber, usuarioNumber, comentarios);
            setData('');
            setQuantitade('');
            setServicos('');
            setUnidades('');
            setUsuarios('');
            setComentario('');
            onClose();
            window.location.reload()
          })
          .catch(error => {
            console.error('Erro ao adicionar Comentário:', error);
          });

      })
      .catch((error) => {
        console.error('Erro ao adicionar Atendimento:', error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Adicionar Atendimento</h2>
        <h4>Realizados em:</h4>
        <input 
          type="date" 
          value={data_de_atendimento} 
          onChange={(e) => setData(e.target.value)} 
        />

        <h4>Quantidade:</h4>
        <input 
          type="number" 
          value={quantidade} 
          onChange={(e) => setQuantitade(e.target.value)} 
        />

        <h4>Serviço:</h4>
        <select value={servicos_id} onChange={(e) => setServicos(e.target.value)}>
          <option value="">Selecione um serviço</option>
          {servicos.map(servico => (
            <option key={servico.id} value={servico.id}>{servico.nome}</option>
          ))}
        </select>

        <h4>Unidades:</h4>
        <select value={unidades_id} onChange={(e) => setUnidades(e.target.value)}>
          <option value="">Selecione uma unidade</option>
          {unidades.map(unidade => (
            <option key={unidade.id} value={unidade.id}>{unidade.nome}</option>
          ))}
        </select>

        <h4>Usuários:</h4>
        <select value={usuarios_id} onChange={(e) => setUsuarios(e.target.value)}>
          <option value="">Selecione um usuário</option>
          {usuarios.map(usuario => (
            <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
          ))}
        </select>

        <h4>Comentário:</h4>
        <textarea 
          value={comentarios} 
          onChange={(e) => setComentario(e.target.value)} 
          placeholder="Adicione um comentário"
        ></textarea>
        <button onClick={handleSubmit}>Adicionar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModalCreate;
