import { FC } from 'react';
import { Box, Button } from '@chakra-ui/react';
import styles from './Modal.module.css';

interface RelatorioModalProps {
  isOpen: boolean;
  onClose: () => void;
  relatorio: any[];
}

const RelatorioModal: FC<RelatorioModalProps> = ({ isOpen, onClose, relatorio }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Relatório de Atendimentos</h2>
        <Box>
          {relatorio.length > 0 ? (
            <ul>
              {relatorio.map((item, index) => (
                <li key={index}>
                  <strong>Atendimento ID:</strong> {item.id} <br />
                  <strong>Data de Atendimento:</strong> {new Date(item.data_de_atendimento).toLocaleDateString()} <br />
                  <strong>Quantidade:</strong> {item.quantidade} <br />
                  <strong>Serviço:</strong> {item.servico ? item.servico.nome : 'Serviço não encontrado'} <br />
                  <strong>Usuário ID:</strong> {item.usuarios_id} <br />
                  <strong>Unidade:</strong> {item.unidade ? item.unidade.nome : 'Unidade não encontrada'} <br />
                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum dado encontrado.</p>
          )}
        </Box>
        <Button className={styles.cancel} onClick={onClose}>Fechar</Button>
      </div>
    </div>
  );
};

export default RelatorioModal;
