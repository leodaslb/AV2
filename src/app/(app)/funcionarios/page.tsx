'use client';
import { Button } from '@/components/ui/button';
import styles from './funcionarios.module.css'; // Crie um CSS para esta página
import { useState } from 'react';
import { mockFuncionarios as funcionariosIniciais } from '@/lib/mocks'; // Importa do mock
import ModalCadastrarFuncionario from '@/components/modals/ModalCadastrarFuncionario'; // Importa o modal

export default function FuncionariosPage() {
  // Coloca os funcionários no state
  const [funcionarios, setFuncionarios] = useState(funcionariosIniciais);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler para adicionar o novo funcionário ao state
  const handleAdicionarFuncionario = (novoFunc: any) => {
  
    if (funcionarios.find(f => f.usuario === novoFunc.usuario)) {
      alert('Erro! Já existe um funcionário com este nome de usuário.');
      return;
    }
    setFuncionarios(funcsAtuais => [
      ...funcsAtuais,
      novoFunc
    ]);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Lista Funcionários</h1>
      
          <Button onClick={() => setIsModalOpen(true)}>
            + Adicionar Funcionário
          </Button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Função</th>
              <th>Telefone</th>
              <th>Usuário</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapeia os funcionários do state */}
            {funcionarios.map((func) => (
              <tr key={func.id}>
                <td>{func.nome}</td>
                <td>{func.funcao}</td>
                <td>{func.telefone}</td>
                <td>{func.usuario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Renderização condicional do modal */}
      {isModalOpen && (
        <ModalCadastrarFuncionario
          onClose={() => setIsModalOpen(false)}
          onAdicionar={handleAdicionarFuncionario}
        />
      )}
    </>
  );
}