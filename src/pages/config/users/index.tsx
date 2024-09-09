import { useState, useEffect } from 'react';
import ModalCreate from './components/ModalCreate'; 
import ModalUpdate from './components/ModalUpdate'; 
import Menu from '@/pages/menu';
import styles from '../users/styles/Users.module.css'

interface Users {
  id: number;
  nome: string;
  email: string;
  nickname: string;
  nivel: number;
  status:number;
}

export default function Users() {
  const [usuario, setUsuarios] = useState<Users[]>([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Users | null>(null);

  useEffect(() => {
    fetch('http://localhost:3333/usuarios')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Erro ao buscar usuarios:', error));
  }, []);

  const handleAddSUsuario = (nome: string) => {
    console.log("Novo usuario adicionado:", nome,);
  };

  const handleUpdateUsuario = (id: string, nome: string) => {
    fetch(`http://localhost:3333/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Servico atualizado com sucesso:', data);
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.id === Number(id) ? { ...usuario, nome } : usuario
          )
        );
        setIsModalUpdateOpen(false);
        setUsuarioSelecionado(null);
      })
      .catch((error) => console.error('Erro ao atualizar unidade:', error));
  };

  const handleDeleteUsuario = (id: number) => {
    fetch(`http://localhost:3333/usuarios/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao apagar servico');
        }
        console.log('Usuario apagado com sucesso');
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((user) => user.id !== id)
        );
      })
      .catch((error) => console.error('Erro ao apagar unidade:', error));
  };

  const openUpdateModal = (user: Users) => {
    setUsuarioSelecionado(user);
    setIsModalUpdateOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Menu />
      </div>
      <div className={styles.content}>
        
      <h1>Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Nivel</th>
            <th>Status</th>
            <th>Ações:</th>
          </tr>
        </thead>
        <tbody>
          {usuario.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nickname}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.nivel}</td>
              <td>{usuario.status}</td>
              <td>
                <button onClick={() => openUpdateModal(usuario)}>Editar</button>
                <button onClick={() => handleDeleteUsuario(usuario.id)}>Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setIsModalCreateOpen(true)}>Adicionar Usuarios</button>
      
      <ModalCreate
        isOpen={isModalCreateOpen} 
        onClose={() => setIsModalCreateOpen(false)} 
        onSubmit={handleAddSUsuario} 
      />
     {usuarioSelecionado && (
        <ModalUpdate 
          isOpen={isModalUpdateOpen}
          onClose={() => setIsModalUpdateOpen(false)}
          usuarioId={usuarioSelecionado.id.toString()}
          nomeInicial={usuarioSelecionado.nome}
          nicknameIncial={usuarioSelecionado.nickname}
          emailInicial={usuarioSelecionado.email}
          nivelInicial={usuarioSelecionado.nivel}
          statusIncial={usuarioSelecionado.status}
          onSubmit={handleUpdateUsuario}         />
     )}
      </div>
    </div>
  );
}
