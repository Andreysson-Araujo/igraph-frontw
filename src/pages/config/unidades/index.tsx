import { useState, useEffect } from 'react';
import { Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { MdDelete } from "react-icons/md";
import { BiSolidMessageEdit } from "react-icons/bi";
import ModalCreate from './components/ModalCreate'; 
import ModalUpdate from './components/ModalUpdate'; 
import Menu from '@/pages/menu';
import Unidade from "./interface/Unidade";
import styles from "./styles/Unidade.module.css"

export default function Unidades() {
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [unidadeSelecionada, setUnidadeSelecionada] = useState<Unidade | null>(null);

  useEffect(() => {
    fetch('http://localhost:3333/unidades')
      .then((response) => response.json())
      .then((data) => setUnidades(data))
      .catch((error) => console.error('Erro ao buscar unidades:', error));
  }, []);

  const handleAddUnidade = (nome: string, data_inaugural: string) => {
    console.log("Nova Unidade:", nome, data_inaugural);
  };

  const handleUpdateUnidade = (id: string, nome: string, data_inaugural: string) => {
    fetch(`http://localhost:3333/unidades/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, data_inaugural }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Unidade atualizada com sucesso:', data);
        setUnidades((prevUnidades) =>
          prevUnidades.map((unidade) =>
            unidade.id === Number(id) ? { ...unidade, nome, data_inaugural } : unidade
          )
        );
        setIsModalUpdateOpen(false);
        setUnidadeSelecionada(null);
      })
      .catch((error) => console.error('Erro ao atualizar unidade:', error));
  };

  const handleDeleteUnidade = (id: number) => {
    fetch(`http://localhost:3333/unidades/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao apagar unidade');
        }
        console.log('Unidade apagada com sucesso');
        setUnidades((prevUnidades) =>
          prevUnidades.filter((unidade) => unidade.id !== id)
        );
      })
      .catch((error) => console.error('Erro ao apagar unidade:', error));
  };

  const openUpdateModal = (unidade: Unidade) => {
    setUnidadeSelecionada(unidade);
    setIsModalUpdateOpen(true);
  };

  return (
    <Box display="flex">
      <Box
        w="20%"
        bg="#f4f4f4"
        p={5}
        boxShadow="2px 0 5px rgba(0, 0, 0, 0.1)"
      >
        <Menu />
      </Box>
      <Box w="80%" p={5} display="flex" flexDirection="column" alignItems="center">
        <Heading as="h1" mb={6} >Unidades</Heading>
        <Table variant="striped" colorScheme="teal" bg="#fff"  borderRadius="10px" className={styles.table} >
          <Thead className={styles.head}>
            <Tr bg="green" borderRadius="10px" border={'2px solid green'}>
              <Th color="#f4f4f4" fontSize="2xl" >Nome</Th>
              <Th color="#f4f4f4" fontSize="2xl">Inaugurada em</Th>
              <Th color="#f4f4f4" fontSize="2xl">Ações</Th>
            </Tr>
          </Thead>
          <Tbody className={styles.thead}>
            {unidades.map((unidade) => (
              <Tr key={unidade.id}>
                <Td textAlign="center" fontSize="lg" >{unidade.nome}</Td>
                <Td textAlign="center" fontSize="lg">{new Date(unidade.data_inaugural).toLocaleDateString()}</Td>
                <Td textAlign="center">
                  <Button
                    className={styles.edit}
                    onClick={() => openUpdateModal(unidade)}
                  >
                    Editar
                    <BiSolidMessageEdit />
                  </Button>
                  <Button
                    className={styles.delete}
                    onClick={() => handleDeleteUnidade(unidade.id)}
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
          className={styles.create}
          onClick={() => setIsModalCreateOpen(true)}
        >
          Adicionar Unidade
        </Button>
        
        <ModalCreate 
          isOpen={isModalCreateOpen} 
          onClose={() => setIsModalCreateOpen(false)} 
          onSubmit={handleAddUnidade} 
        />

        {unidadeSelecionada && (
          <ModalUpdate 
            isOpen={isModalUpdateOpen} 
            onClose={() => setIsModalUpdateOpen(false)} 
            unidadeId={unidadeSelecionada.id.toString()} 
            nomeInicial={unidadeSelecionada.nome} 
            dataInicial={unidadeSelecionada.data_inaugural.split('T')[0]} 
            onSubmit={handleUpdateUnidade} 
          />
        )}
      </Box>
    </Box>
  );
}
