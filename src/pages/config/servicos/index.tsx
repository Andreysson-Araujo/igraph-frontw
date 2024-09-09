import { useState, useEffect } from 'react';
import { Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex } from '@chakra-ui/react';
import ModalCreate from './components/ModalCreate'; 
import ModalUpdate from './components/ModalUpdate'; 
import { MdDelete } from "react-icons/md";
import { BiSolidMessageEdit } from "react-icons/bi";
import Menu from '@/pages/menu';
import styles from "./styles/Servico.module.css";
import Servico from './interface/Servico';

export default function Servicos() {
  const [servico, setServicos] = useState<Servico[]>([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3333/servicos')
      .then((response) => response.json())
      .then((data) => setServicos(data))
      .catch((error) => console.error('Erro ao buscar unidades:', error));
  }, []);

  const handleAddServico = (nome: string) => {
    console.log("Nova Unidade:", nome);
  };

  const handleUpdateServico = (id: string, nome: string) => {
    fetch(`http://localhost:3333/servicos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Servico atualizado com sucesso:', data);
        setServicos((prevServicos) =>
          prevServicos.map((servico) =>
            servico.id === Number(id) ? { ...servico, nome } : servico
          )
        );
        setIsModalUpdateOpen(false);
        setServicoSelecionado(null);
      })
      .catch((error) => console.error('Erro ao atualizar unidade:', error));
  };

  const handleDeleteServico = (id: number) => {
    fetch(`http://localhost:3333/servicos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao apagar servico');
        }
        console.log('Servico apagado com sucesso');
        setServicos((prevServicos) =>
          prevServicos.filter((servico) => servico.id !== id)
        );
      })
      .catch((error) => console.error('Erro ao apagar unidade:', error));
  };

  const openUpdateModal = (servico: Servico) => {
    setServicoSelecionado(servico);
    setIsModalUpdateOpen(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Flex className={styles.container}>
      <Box className={`${styles.menu} ${isSidebarOpen ? styles.menuOpen : styles.menuClosed}`}>
        <Menu />
        
      </Box>
      <Box className={styles.content}>
        <Heading as="h1" size="xl">Serviços</Heading>
        <Table className={styles.table}>
          <Thead className={styles.head}>
            <Tr className={styles.tr}>
              <Th className={styles.th}>Serviços</Th>
              <Th className={styles.th}>Ações:</Th>
            </Tr>
          </Thead>
          <Tbody className={styles.tbody}>
            {servico.map((servico) => (
              <Tr key={servico.id} className={styles.tr}>
                <Td className={styles.td}>{servico.nome}</Td>
                <Td>
                  <Button 
                    onClick={() => openUpdateModal(servico)} 
                    className={styles.edit}
                    size="sm" 
                    colorScheme="blue" 
                    mr="2"
                  >
                    Editar
                    <BiSolidMessageEdit />
                  </Button>
                  <Button 
                    onClick={() => handleDeleteServico(servico.id)} 
                    className={styles.delete}
                    size="sm" 
                    colorScheme="red"
                  >
                    Apagar
                    <MdDelete />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button 
          onClick={() => setIsModalCreateOpen(true)} 
          className={styles.create}
          colorScheme="green" 
          mt="4"
        >
          Adicionar Serviços
        </Button>
        
        <ModalCreate
          isOpen={isModalCreateOpen} 
          onClose={() => setIsModalCreateOpen(false)} 
          onSubmit={handleAddServico} 
        />
        {servicoSelecionado && (
          <ModalUpdate 
            isOpen={isModalUpdateOpen} 
            onClose={() => setIsModalUpdateOpen(false)} 
            servicoId={servicoSelecionado.id.toString()} 
            nomeInicial={servicoSelecionado.nome}
            onSubmit={handleUpdateServico} 
          />
        )}
      </Box>
    </Flex>
  );
}
