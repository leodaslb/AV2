"use client";
import styles from '../detalhes.module.css';
import { Button } from '@/components/ui/button';
import { mockFuncionarios } from '@/lib/mocks'; 

type ModalProps = {
  etapa: any;
  onClose: () => void;
  onAssociar: (etapaId: string, funcionarioId: string) => void;
}

export default function ModalAssociarFunc({ etapa, onClose, onAssociar }: ModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Associar Funcionário</h3>
          <p>Etapa: {etapa.nome}</p>
          <button onClick={onClose} className={styles.modalCloseButton}>X</button>
        </div>
        <div className={styles.modalBody}>
          <h4>Selecione um funcionário:</h4>
          <ul className={styles.funcionarioList}>
            {mockFuncionarios.map(func => (
              <li key={func.id} className={styles.funcionarioItem}>
                <span>{func.nome} ({func.funcao})</span>
                <Button 
                  onClick={() => onAssociar(etapa.id, func.id)}
                >
                  Associar
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}