"use client";
import { useState } from 'react';
import styles from '../detalhes.module.css';
import { Button } from '@/components/ui/button';

// Define as opções de status
const OPCOES_STATUS_PECA = ["Pronta", "Em Produção", "Em Transporte"];
const OPCOES_ORIGEM_PECA = ["Nacional", "Importada"];

type ModalPecaProps = {
  onClose: () => void;
  onAdicionar: (novaPeca: any) => void;
}

export default function ModalAdicionarPeca({ onClose, onAdicionar }: ModalPecaProps) {
  // State interno para o formulário
  const [nome, setNome] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [origem, setOrigem] = useState(OPCOES_ORIGEM_PECA[0]);
  const [status, setStatus] = useState(OPCOES_STATUS_PECA[0]);

  const handleSubmit = () => {
    // Validação simples
    if (!nome || !fornecedor) {
      alert('Nome e Fornecedor são obrigatórios.');
      return;
    }
    
    // Cria o novo objeto Peça
    const novaPeca = {
      id: `p-${Math.random().toString(36).substring(7)}`, // ID aleatório 
      nome,
      fornecedor,
      origem,
      status,
    };
    
    onAdicionar(novaPeca); // Envia o novo objeto para o pai
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Adicionar Nova Peça</h3>
          <button onClick={onClose} className={styles.modalCloseButton}>X</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome da Peça:</label>
            <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="fornecedor">Fornecedor:</label>
            <input id="fornecedor" type="text" value={fornecedor} onChange={(e) => setFornecedor(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="origem">Origem:</label>
            <select id="origem" value={origem} onChange={(e) => setOrigem(e.target.value)}>
              {OPCOES_ORIGEM_PECA.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">Status Inicial:</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              {OPCOES_STATUS_PECA.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <Button onClick={handleSubmit} >
            Adicionar Peça
          </Button>
        </div>
      </div>
    </div>
  );
}