"use client";
import styles from '../detalhes.module.css';
import { Button } from '@/components/ui/button';

type AbaEtapasProps = {
  etapas: any[];
  onAssociarClick: (etapa: any) => void;
  onAdicionarClick: () => void;
  onIniciarEtapa: (etapaId: string) => void;  
  onConcluirEtapa: (etapaId: string) => void;
}

export default function AbaEtapas({ etapas, onAssociarClick, onAdicionarClick, onIniciarEtapa, onConcluirEtapa }: AbaEtapasProps) {
  return (
    <div className={styles.conteudoAba}>
      <div className={styles.abaHeader}>
        <h2>Lista etapas</h2>
        <Button onClick={onAdicionarClick}>+ Adicionar</Button>
      </div>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Prazo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {etapas.map(etapa => (
            <tr key={etapa.id}>
              <td>{etapa.nome}</td>
              <td>{etapa.prazo}</td>
              <td>{etapa.status}</td>
              <td className={styles.acoes}> 
                { etapa.status === 'Pendente' && <Button onClick={() => onIniciarEtapa(etapa.id)}>Iniciar</Button>}
                { etapa.status === 'Em Andamento' && <Button onClick={() => onConcluirEtapa(etapa.id)} >Concluir</Button>}
                { etapa.status === 'Concluída' && <></>}
                
                <Button onClick={() => onAssociarClick(etapa)}>
                  Associar Funcionário
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}