'use client';
import { Button } from '@/components/ui/button';
import styles from './listaAeronaves.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { mockAeronaves as aeronavesIniciais } from '@/lib/mocks'; 
import ModalAdicionarAeronave from '@/components/modals/ModalAdicionarAeronave';

export default function Aeronaves() {
  const router = useRouter();

  // Coloca os dados em state para que a lista possa ser atualizada
  const [aeronaves, setAeronaves] = useState(aeronavesIniciais);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdicionarAeronave = (novaAeronave: any) => {
    // Validação de ID duplicado 
    if (aeronaves.find(a => a.id === novaAeronave.id)) {
      alert('Erro! Já existe uma aeronave com este código.');
      return;
    }
    setAeronaves(aeronavesAtuais => [
      ...aeronavesAtuais,
      novaAeronave
    ]);
  };
  
  const handleRowClick = (id: string) => {
    router.push(`/aeronaves/${id}`);
  };
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Lista Aeronaves</h1>
          
          <Button onClick={() => setIsModalOpen(true)}>
            + Adicionar Aeronave
          </Button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Modelo</th>
              <th>Tipo</th>
              <th>Capacidade</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapeia os dados do state */}
            {aeronaves.map((aeronave) => (
              <tr
                key={aeronave.id}
                onClick={() => handleRowClick(aeronave.id)}
                className={styles.linhaClicavel}
              >
                <td>{aeronave.id}</td>
                <td>{aeronave.modelo}</td>
                <td>{aeronave.tipo}</td>
                <td>{aeronave.capacidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ModalAdicionarAeronave 
          onClose={() => setIsModalOpen(false)}
          onAdicionar={handleAdicionarAeronave}
        />
      )}
    </>
  );
}