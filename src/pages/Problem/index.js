import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { FaEllipsisH, FaTrash, FaEye } from 'react-icons/fa';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
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
    try {
      await api.delete(`/deliveryproblems/${id}`);
      const updatedList = problems.filter(
        deliveryproblem => deliveryproblem.id !== id
      );
      setProblems(updatedList);
      toast.success('O Problema foi cancelado');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  function confirmDelete(id) {
    handleClose();
    confirmAlert({
      title: 'Confirmação de cancelamento',
      message: 'Você quer mesmo cancelar essa Encomenda?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleDelete(id),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
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
                  <td>#{problem.order.id}</td>
                  <td>{problem.description}</td>
                  <td>
                    <PopupState variant="popover" popupId={`${problem.id}`}>
                      {popupState => (
                        <>
                          <FaEllipsisH
                            size={17}
                            color="#C6C6C6"
                            {...bindTrigger(popupState)}
                          />
                          <MyMenu
                            id="simple-menu"
                            {...bindMenu(popupState)}
                            keepMounted
                            getContentAnchorEl={null}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                            }}
                          >
                            <MyMenuItem
                              type="button"
                              onClick={() => {
                                popupState.close();
                                setProblemId(problem.id);
                                setVisible(true);
                              }}
                            >
                              <FaEye size={13} color="#4D85EE" />
                              Visualizar
                            </MyMenuItem>
                            <MyMenuItem
                              onClick={() => {
                                popupState.close();
                                confirmDelete(problem.order.id);
                              }}
                            >
                              <FaTrash size={13} color="#DE3B3B" />
                              Cancelar encomenda
                            </MyMenuItem>
                          </MyMenu>
                        </>
                      )}
                    </PopupState>
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
