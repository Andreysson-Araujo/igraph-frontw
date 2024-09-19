import { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Flex, Heading } from '@chakra-ui/react';
import Modal from "./componets/Modal";
import Menu from '@/pages/menu';

export default function Relatorios() {
  const [inicio, setInicio] = useState<string>('');
  const [fim, setFim] = useState<string>('');
  const [ano, setAno] = useState<number | ''>('');
  const [mes, setMes] = useState<number | ''>('');
  const [unidade, setUnidade] = useState<number | ''>('');
  const [relatorio, setRelatorio] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [unidades, setUnidades] = useState<any[]>([]); // Para armazenar as unidades

  // Fetch de todas as unidades ao carregar o componente
  useEffect(() => {
    fetch('http://localhost:3333/unidades')
      .then(response => response.json())
      .then(data => setUnidades(data))
      .catch(error => console.error('Erro ao buscar Unidades:', error));
  }, []);

  const handleSubmit = async () => {
    try {
      let url = 'http://localhost:3333/atendimentos?';
      const filters = [];

      if (ano) filters.push(`ano=${ano}`);
      if (mes) filters.push(`mes=${mes}`);
      if (unidade) filters.push(`unidade_id=${unidade}`);
      if (inicio) filters.push(`inicio=${inicio}`);
      if (fim) filters.push(`fim=${fim}`);

      url += filters.join('&');

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setRelatorio(data); // Salva os dados detalhados do relatório
      setIsModalOpen(true); // Abre o modal ao receber os dados
    } catch (error) {
      console.log('Erro ao gerar relatório:', error);
    }
  };

  return (
    <>
      <Box
        w="20%"
        bg="#f4f4f4"
        p={5}
        boxShadow="2px 0 5px rgba(0, 0, 0, 0.1)"
      >
        <Menu />
      </Box>
      <Flex>
        <Box p="6" maxW="800px" mx="auto">
          <Heading mb="6">Relatórios</Heading>

          <FormControl mb="4">
            <FormLabel>Ano:</FormLabel>
            <Select
              value={ano}
              onChange={(e) => setAno(Number(e.target.value))}
              placeholder="Selecione o ano"
            >
              {/* Aqui você pode gerar os anos dinamicamente, por exemplo, de 2000 até o ano atual */}
              {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Mês:</FormLabel>
            <Select
              value={mes}
              onChange={(e) => setMes(Number(e.target.value))}
              placeholder="Selecione o mês"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>
                  {month < 10 ? `0${month}` : month}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Unidade:</FormLabel>
            <Select
              value={unidade}
              onChange={(e) => setUnidade(Number(e.target.value))}
              placeholder="Selecione a unidade"
            >
              {unidades.map(u => (
                <option key={u.id} value={u.id}>{u.nome}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Data de Início:</FormLabel>
            <Input
              type="date"
              value={inicio}
              onChange={(e) => setInicio(e.target.value)} />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Data de Fim:</FormLabel>
            <Input
              type="date"
              value={fim}
              onChange={(e) => setFim(e.target.value)} />
          </FormControl>

          <Button colorScheme="pink" onClick={handleSubmit}>Gerar Relatório</Button>
        </Box>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          relatorio={relatorio}
        />
      </Flex>
    </>
  );
}
