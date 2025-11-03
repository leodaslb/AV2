
"use client"; 

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import styles from './detalhes.module.css';
import { mockAeronaves, mockPecas, mockEtapas, mockTestes } from '@/lib/mocks';
import { ArrowLeft } from 'lucide-react';
import AbaPecas from './components/abaPecas';
import AbaEtapas from './components/abaEtapas';
import AbaTestes from './components/abaTestes';
import ModalAssociarFunc from './components/modalAssociarFunc';
import ModalAdicionarPeca from './components/modalAdicionarPeca';
import ModalAdicionarEtapa from './components/modalAdicionarEtapa';
import ModalAdicionarTeste from './components/modalAdicionarTeste';

export default function DetalhesAeronave() {
  const params = useParams();
  const { id } = params;
  const [abaAtiva, setAbaAtiva] = useState('pecas');

  const aeronave = mockAeronaves.find(a => a.id === id);

  // States para os dados
  const [pecas, setPecas] = useState(() => mockPecas.filter(p => p.aeronaveId === id));
  const [etapas, setEtapas] = useState(() => mockEtapas.filter(e => e.aeronaveId === id));
  const [testes, setTestes] = useState(() => mockTestes.filter(t => t.aeronaveId === id));
  
  // States para os modais
  const [isModalFuncOpen, setIsModalFuncOpen] = useState(false);
  const [etapaSelecionada, setEtapaSelecionada] = useState<any>(null);
  const [isModalPecaOpen, setIsModalPecaOpen] = useState(false);
  const [isModalEtapaOpen, setIsModalEtapaOpen] = useState(false);
  const [isModalTesteOpen, setIsModalTesteOpen] = useState(false);


  const OPCOES_RESULTADO_TESTE = ["Pendente", "Aprovado", "Reprovado"];

  // Handlers para Peças
  const handleStatusPecaChange = (pecaId: string, novoStatus: string) => {
    setPecas(pecasAtuais => 
      pecasAtuais.map(peca => 
        peca.id === pecaId ? { ...peca, status: novoStatus } : peca
      )
    );
  };
  const handleAdicionarPeca = (novaPeca: any) => {
    // Adiciona a nova peça ao state
    setPecas(pecasAtuais => [...pecasAtuais, { ...novaPeca, aeronaveId: id }]);
  };
  
  // Handlers para Etapas
  const handleAdicionarEtapa = (novaEtapa: any) => {
    setEtapas(etapasAtuais => [...etapasAtuais, { ...novaEtapa, aeronaveId: id }]);
  };

  const handleIniciarEtapa = (etapaId: string) => {
    setEtapas(etapasAtuais =>
      etapasAtuais.map(etapa =>
        etapa.id === etapaId
          ? { ...etapa, status: 'Em Andamento' }
          : etapa
      )
    );
  };
  const handleConcluirEtapa = (etapaId: string) => {
    setEtapas(etapasAtuais =>
      etapasAtuais.map(etapa =>
        etapa.id === etapaId
          ? { ...etapa, status: 'Concluída' }
          : etapa
      )
    );
  };

  // Handlers para Testes
  const handleAdicionarTeste = (novoTeste: any) => {
    setTestes(testesAtuais => [...testesAtuais, { ...novoTeste, aeronaveId: id }]);
  };

  // Handlers para Modal de Funcionário
  const handleOpenModalFunc = (etapa: any) => {
    setEtapaSelecionada(etapa);
    setIsModalFuncOpen(true);
  };
  const handleCloseModalFunc = () => {
    setIsModalFuncOpen(false);
    setEtapaSelecionada(null);
  };
  const handleAssociarFuncionario = (etapaId: string, funcionarioId: string) => {
    console.log(`Associando funcionário ${funcionarioId} à etapa ${etapaId}`);
    alert('Funcionário associado (simulação)!');
    handleCloseModalFunc();
  };

  const handleResultadoTesteChange = (testeId: string, novoResultado: string) => {
    setTestes(testesAtuais =>
      testesAtuais.map(teste =>
        teste.id === testeId ? { ...teste, resultado: novoResultado } : teste
      )
    );
  };

  if (!aeronave) {
    return <div>Aeronave não encontrada.</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.info}>
        <h2>Aeronave: {aeronave.modelo}</h2>
        <p>Codigo: {aeronave.id} | Modelo: {aeronave.modelo}</p>
        </div>
        <Link href="/aeronaves">
        <div className={styles.voltar}> <ArrowLeft />Voltar</div>
        </Link>
           
      </header>
      

      <nav className={styles.navAbas}>
        <button 
          onClick={() => setAbaAtiva('pecas')}
          className={abaAtiva === 'pecas' ? styles.abaAtiva : styles.abaInativa}
        >
          Peças
        </button>
        <button 
          onClick={() => setAbaAtiva('etapas')}
          className={abaAtiva === 'etapas' ? styles.abaAtiva : styles.abaInativa}
        >
          Etapas
        </button>
        <button 
          onClick={() => setAbaAtiva('testes')}
          className={abaAtiva === 'testes' ? styles.abaAtiva : styles.abaInativa}
        >
          Testes
        </button>
      </nav>

     <main className={styles.mainContent}>
        {abaAtiva === 'pecas' && (
          <AbaPecas 
            pecas={pecas} 
            onStatusChange={handleStatusPecaChange}
            onAdicionarClick={() => setIsModalPecaOpen(true)}
          />
        )}
        {abaAtiva === 'etapas' && (
          <AbaEtapas 
            etapas={etapas} 
            onAssociarClick={handleOpenModalFunc}
            onAdicionarClick={() => setIsModalEtapaOpen(true)}
            onIniciarEtapa={handleIniciarEtapa}   
            onConcluirEtapa={handleConcluirEtapa}
          />
        )}
        {abaAtiva === 'testes' && (
          <AbaTestes 
            testes={testes}
            onAdicionarClick={() => setIsModalTesteOpen(true)} 
            onResultadoChange={handleResultadoTesteChange}
          />
        )}
      </main>

      {/* Renderização de todos os modais */}
      {isModalFuncOpen && etapaSelecionada && (
        <ModalAssociarFunc 
          etapa={etapaSelecionada}
          onClose={handleCloseModalFunc}
          onAssociar={handleAssociarFuncionario}
        />
      )}
      
      {isModalPecaOpen && (
        <ModalAdicionarPeca 
          onClose={() => setIsModalPecaOpen(false)}
          onAdicionar={handleAdicionarPeca}
        />
      )}
      
      {isModalEtapaOpen && (
        <ModalAdicionarEtapa 
          onClose={() => setIsModalEtapaOpen(false)}
          onAdicionar={handleAdicionarEtapa}
        />
      )}
      
      {isModalTesteOpen && (
        <ModalAdicionarTeste 
          onClose={() => setIsModalTesteOpen(false)}
          onAdicionar={handleAdicionarTeste}
        />
      )}
    </div>
  );
}