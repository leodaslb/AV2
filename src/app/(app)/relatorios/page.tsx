'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import styles from './relatorios.module.css'; 

import { mockAeronaves, mockEtapas } from '@/lib/mocks';

export default function RelatoriosPage() {

  const [selectedAeronaveId, setSelectedAeronaveId] = useState<string>('');
  const [nomeCliente, setNomeCliente] = useState<string>('');
  
  // State para exibir mensagens de sucesso ou erro
  const [message, setMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);

  const handleGerarRelatorio = () => {
    setMessage(null); // Limpa mensagens antigas

 
    if (!selectedAeronaveId || !nomeCliente) {
      setMessage({ type: 'error', text: 'Por favor, selecione uma aeronave e digite o nome do cliente.' });
      return;
    }


    // Busca todas as etapas da aeronave selecionada
    const etapasDaAeronave = mockEtapas.filter(e => e.aeronaveId === selectedAeronaveId);

    // Verifica se existe alguma etapa que nao esteja Concluída
    const algumaEtapaPendente = etapasDaAeronave.some(e => e.status !== 'Concluída');

    if (etapasDaAeronave.length === 0 || algumaEtapaPendente) {
      setMessage({ type: 'error', text: 'Erro: Não é possível gerar o relatório. Nem todas as etapas de produção da aeronave foram concluídas.' });
      return;
    }

 

    const aeronave = mockAeronaves.find(a => a.id === selectedAeronaveId);
    setMessage({ type: 'success', text: `Sucesso! Relatório para ${aeronave?.modelo} (Cliente: ${nomeCliente}) gerado.` });
    

    setSelectedAeronaveId('');
    setNomeCliente('');
  };

  return (
    <div className={styles.container}>
      <h1>Gerar Relatório</h1>
      <p>Selecione uma aeronave e insira o nome do cliente para gerar o relatório final.</p>
      
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="aeronave">Selecionar Aeronave (somente concluídas):</label>
      
      
          <select 
            id="aeronave" 
            value={selectedAeronaveId} 
            onChange={(e) => setSelectedAeronaveId(e.target.value)}
            className={styles.selectInput}
          >
            <option value="" disabled>-- Escolha uma aeronave --</option>
            {mockAeronaves.map(a => (
              <option key={a.id} value={a.id}>
                {a.modelo} ({a.id})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cliente">Nome do Cliente:</label>
          <input 
            id="cliente" 
            type="text" 
            value={nomeCliente} 
            onChange={(e) => setNomeCliente(e.target.value)}
            className={styles.textInput}
          />
        </div>

        <Button onClick={handleGerarRelatorio}>
          Gerar Relatório
        </Button>

    
        {message && (
          <div className={message.type === 'error' ? styles.messageError : styles.messageSuccess}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}