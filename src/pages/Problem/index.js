import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';

import ActionHeader from '~/components/ActionHeader';
import ActionContent from '~/components/ActionContent';
import DefaultTable from '~/components/DefaultTable';
import Modal from '~/components/Modal';

export default function DeliveryProblems() {
  const [description] = useState('');
  const [visible, setVisible] = useState(false);
  const [problemId, setProblemId] = useState(null);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function getProblems() {
      try {
        const response = await api.get(`deliveryproblems`, {
          params: { description },
        });

        setProblems(response.data);
      } catch (err) {
        toast.error('Ocorreu um erro ao obter os problemas');
      }
    }
    getProblems();
  }, [description]);

  function handleOrderChange(id) {
    const updatedProblems = problems.filter(ord => ord.id !== id);
    setProblems(updatedProblems);
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Problemas na entrega</span>
        </div>
      </ActionHeader>
      <ActionContent>
        <DefaultTable>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {problems &&
              problems.map(problem => (
                <tr key={problem.id}>
                  <td>{problem.order.id}</td>
                  <td>{problem.description}</td>
                  <td />
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setProblemId(problem.id);
                        setVisible(true);
                      }}
                    >
                      Visualizar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </DefaultTable>
      </ActionContent>
      <Modal
        visible={visible}
        problem_id={problemId}
        hide={() => setVisible(false)}
        handleOrderChange={handleOrderChange}
      />
    </>
  );
}
