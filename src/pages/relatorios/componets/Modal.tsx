import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import styles from './Modal.module.css'

interface ModalRelatorioProps {
  isOpen: boolean;
  onClose: () => void;
  relatorio: any[]; // Array de objetos que representa os dados do relatório
  unidades: { id: string, nome: string }[]; // Array de unidades
}

const ModalRelatorio: React.FC<ModalRelatorioProps> = ({ isOpen, onClose, relatorio, unidades }) => {

  // Função para pegar o nome da unidade baseado no id
  const getUnidadeNome = (unidadeId: string) => {
    const unidade = unidades.find(u => u.id === unidadeId);
    return unidade ? unidade.nome : 'Unidade não encontrada';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay className={styles.modalOverlay} />
      <ModalContent className={styles.modal}>
        <ModalHeader className={styles.adcModal}>Resultados do Relatório</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {relatorio.length > 0 ? (
            relatorio.map((item, index) => (
              <Box key={index} mb="4">
                {/* Exibe o nome da unidade com base no unidade_id */}
                <Text><strong>Unidade:</strong> {getUnidadeNome(item.unidade_id)}</Text>
                <Text><strong>Data:</strong> {new Date(item.data_de_atendimento).toLocaleDateString()}</Text>
                <Text><strong>Detalhes:</strong> {item.detalhes}</Text>
                <hr />
              </Box>
            ))
          ) : (
            <Text>Nenhum dado encontrado.</Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button className={styles.cancel} onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalRelatorio;
