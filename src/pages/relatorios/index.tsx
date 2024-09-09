import { useState } from 'react';
import { 
  Box, Button, FormControl, FormLabel, Heading, Input, Flex, useDisclosure
} from '@chakra-ui/react';
import Menu from '@/pages/menu';
import ModalRelatorio from './componets/Modal';
import Modal from './componets/Modal';

export default function Relatorios() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controle de abertura e fechamento do modal
  const [inicio, setInicio] = useState(''); // Data de início
  const [fim, setFim] = useState(''); // Data de fim
  const [relatorio, setRelatorio] = useState<any[]>([]); // Armazena os dados do relatório

  // Função chamada ao enviar o formulário
  const handleSubmit = async () => {
    try {
      const dataInicio = new Date(inicio);
      const dataFim = new Date(fim);

      if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
        console.error('Datas inválidas');
        return;
      }

      const mesInicio = dataInicio.getMonth() + 1; // Mês (1 a 12)
      const anoInicio = dataInicio.getFullYear();
      const mesFim = dataFim.getMonth() + 1;
      const anoFim = dataFim.getFullYear();

      let url = '';

      if (anoInicio === anoFim && mesInicio === mesFim) {
        url = `http://localhost:3333/atendimentos/${mesInicio}/${anoInicio}`;
      } else if (anoInicio === anoFim) {
        url = `http://localhost:3333/atendimentos/ano/${anoInicio}`;
      } else {
        console.error('Selecione um intervalo de mês e ano válido');
        return;
      }

      const response = await fetch(url);
      const data = await response.json();

      setRelatorio(data);
      onOpen(); // Abre o modal com os resultados
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
    }
  };

  return (
    <Flex>
      <Menu /> {/* Incluindo o menu lateral */}
      <Box p="6" maxW="800px" mx="auto" ml={['0', '0', '300px']} w={['100%', '100%', 'calc(100% - 300px)']}>
        <Heading mb="6">Relatórios</Heading>

        <FormControl mb="4">
          <FormLabel>Data de Início:</FormLabel>
          <Input
            type="date"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)} // Atualiza o estado com a data de início
          />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Data de Fim:</FormLabel>
          <Input
            type="date"
            value={fim}
            onChange={(e) => setFim(e.target.value)} // Atualiza o estado com a data de fim
          />
        </FormControl>

        <Button colorScheme="pink" onClick={handleSubmit}>Gerar Relatório</Button>

        {/* Modal que será aberto com os resultados */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          relatorio={relatorio} unidades={[]}        />
      </Box>
    </Flex>
  );
}
