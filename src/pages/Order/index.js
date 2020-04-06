import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link, useHistory } from 'react-router-dom';
import { FaPlus, FaEllipsisH, FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { toast } from 'react-toastify';
import {
  Avatar,
  AvatarName,
  Initial,
  MyMenu,
  MyMenuItem,
  Status,
} from './styles';

import api from '~/services/api';

import ActionContent from '~/components/ActionContent';
import ActionHeader from '~/components/ActionHeader';
import DefaultTable from '~/components/DefaultTable';
import ModalOrder from '~/components/ModalOrder';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [ordersFiltered, setOrdersFiltered] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await api.get(`orders`);

        const data = response.data.map(order => {
          let statusText = '';
          let initial = '';

          if (order.canceled_at) {
            statusText = 'Cancelado';
          } else if (order.end_date) {
            statusText = 'Entregue';
          } else if (order.start_date !== null) {
            statusText = 'Retirada';
          } else {
            statusText = 'Pendente';
          }

          initial = order.deliveryman.name
            .split(' ')
            .map(n => n[0])
            .join('');

          return {
            ...order,
            statusText,
            initial,
          };
        });

        setOrders(data);
      } catch (err) {
        toast.error('Nenhuma encomenda foi encontrada');
      }
    }

    getOrders();
  }, []);

  useEffect(() => {
    function searchFilter() {
      if (!searchText) return setOrdersFiltered(orders);

      const filtered = orders.filter(item => {
        return Object.keys(item).some(key => {
          if (item[key] === null) return false;
          if (key === 'recipient') {
            return Object.keys(item[key]).some(
              keyItem =>
                item[key][keyItem]
                  .toString()
                  .toLowerCase()
                  .search(searchText.toLowerCase()) !== -1
            );
          }
          return (
            item[key]
              .toString()
              .toLowerCase()
              .search(searchText.toLowerCase()) !== -1
          );
        });
      });
      return setOrdersFiltered(filtered);
    }

    searchFilter();
  }, [orders, searchText]);

  async function handleDelete(id) {
    try {
      await api.delete(`/orders/${id}`);

      const updatedList = orders.filter(order => order.id !== id);

      setOrders(updatedList);

      toast.success('A encomenda foi excluída');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  function confirmDelete(id) {
    confirmAlert({
      title: 'Confirmação de exclusão',
      message: 'Você quer mesmo excluir essa encomenda?',
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

  function handleOrderChange(id) {
    const updatedProblems = orders.filter(ord => ord.id !== id);
    setOrders(updatedProblems);
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Gerenciando encomendas</span>
        </div>
        <div>
          <aside className="blocoPesquisa">
            <input
              type="search"
              onChange={e => setSearchText(e.target.value)}
              placeholder="Buscar por encomendas"
            />
            <Link to="/register/orders">
              <FaPlus size={13} color="#fff" />
              CADASTRAR
            </Link>
          </aside>
        </div>
      </ActionHeader>
      <ActionContent>
        <DefaultTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {ordersFiltered &&
              ordersFiltered.map(order => (
                <tr key={order.id}>
                  <td>#0{order.id}</td>

                  <td>{order.recipient.name}</td>
                  <td>
                    {order.deliveryman.avatar ? (
                      <AvatarName>
                        <Avatar
                          src={order.deliveryman.avatar.url}
                          alt="avatar"
                        />
                        <div>{order.deliveryman.name}</div>
                      </AvatarName>
                    ) : (
                      <AvatarName>
                        <Initial>{order.initial}</Initial>
                        {order.deliveryman.name}
                      </AvatarName>
                    )}
                  </td>
                  <td>{order.recipient.city}</td>
                  <td>{order.recipient.state}</td>
                  <td>
                    <Status status={order.statusText}>
                      {order.statusText}
                    </Status>
                  </td>
                  <td>
                    <PopupState variant="popover" popupId={`${order.id}`}>
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
                                setOrderId(order.id);
                                setVisible(true);
                              }}
                            >
                              <FaEye size={13} color="#8E5BE8" />
                              Visualizar
                            </MyMenuItem>
                            <MyMenuItem
                              onClick={() => history.push(`orders/${order.id}`)}
                            >
                              <FaEdit size={13} color="#4D85EE" />
                              Editar
                            </MyMenuItem>
                            <MyMenuItem
                              onClick={() => {
                                popupState.close();
                                confirmDelete(order.id);
                              }}
                            >
                              <FaTrash size={13} color="#DE3B3B" />
                              Excluir
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
      <ModalOrder
        visible={visible}
        order_id={orderId}
        hide={() => setVisible(false)}
        handleOrderChange={handleOrderChange}
      />
    </>
  );
}
