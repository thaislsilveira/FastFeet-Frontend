import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { FaEllipsisH, FaTrash, FaEye } from 'react-icons/fa';
import api from '../../services/api';

import ActionHeader from '~/components/ActionHeader';
import ActionContent from '~/components/ActionContent';
import DefaultTable from '~/components/DefaultTable';
import Modal from '~/components/Modal';

import { MyMenu, MyMenuItem } from './styles';

export default function DeliveryProblems() {
  const [description] = useState('');
  const [visible, setVisible] = useState(false);
  const [problemId, setProblemId] = useState(null);
  const [problems, setProblems] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

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
  async function handleDelete(id) {
    // try {
    //   await api.delete(`/recipients/${id}`);
    //   const updatedList = recipients.filter(recipient => recipient.id !== id);
    //   setRecipient(updatedList);
    //   toast.success('O destinatário foi excluído');
    // } catch (err) {
    //   toast.error(err.response.data.error);
    // }
  }

  function confirmDelete(id) {
    // confirmAlert({
    //   title: 'Confirmação de exclusão',
    //   message: 'Você quer mesmo excluir esse destinatário?',
    //   buttons: [
    //     {
    //       label: 'Sim',
    //       onClick: () => handleDelete(id),
    //     },
    //     {
    //       label: 'Não',
    //       onClick: () => {},
    //     },
    //   ],
    // });
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                  <td>#0{problem.order.id}</td>
                  <td>{problem.description}</td>
                  <td>
                    <FaEllipsisH
                      size={17}
                      color="#C6C6C6"
                      onClick={handleClick}
                    />
                    <MyMenu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'top',
                      }}
                    >
                      <MyMenuItem
                        type="button"
                        onClick={() => {
                          setProblemId(problem.id);
                          setVisible(true);
                        }}
                      >
                        <FaEye size={13} color="#4D85EE" />
                        Vizualizar
                      </MyMenuItem>
                      <MyMenuItem onClick={() => confirmDelete(problem.id)}>
                        <FaTrash size={13} color="#DE3B3B" />
                        Cancelar encomenda
                      </MyMenuItem>
                    </MyMenu>
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
