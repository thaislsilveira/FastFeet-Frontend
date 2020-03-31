import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link, useHistory } from 'react-router-dom';
import { FaPlus, FaEllipsisH, FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Avatar, MyMenu, MyMenuItem, Status } from './styles';

import api from '~/services/api';

import ActionContent from '~/components/ActionContent';
import ActionHeader from '~/components/ActionHeader';
import DefaultTable from '~/components/DefaultTable';

import MyMenuModal from './Modal';

export default function Order() {
  const [product, setProduct] = useState('');
  const [orders, setOrders] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await api.get(`orders`, {
          params: { product },
        });

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
  }, [product]);

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
              onChange={e => setProduct(e.target.value)}
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
            {orders &&
              orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>

                  <td>{order.recipient.name}</td>
                  <td>
                    <Avatar
                      src={
                        order.deliveryman.avatar
                          ? order.deliveryman.avatar.url
                          : order.initial
                      }
                      alt="avatar"
                    />
                    {order.deliveryman.name}
                  </td>
                  <td>{order.recipient.city}</td>
                  <td>{order.recipient.state}</td>
                  <td>
                    <Status status={order.statusText}>
                      {order.statusText}
                    </Status>
                  </td>
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
                      <MyMenuItem>
                        <FaEye size={13} color="#8E5BE8" />
                        Vizualizar
                        <MyMenuModal data={order} />
                      </MyMenuItem>
                      <MyMenuItem
                        onClick={() => history.push(`orders/${order.id}`)}
                      >
                        <FaEdit size={13} color="#4D85EE" />
                        Editar
                      </MyMenuItem>
                      <MyMenuItem onClick={() => confirmDelete(order.id)}>
                        <FaTrash size={13} color="#DE3B3B" />
                        Excluir
                      </MyMenuItem>
                    </MyMenu>
                  </td>
                </tr>
              ))}
          </tbody>
        </DefaultTable>
      </ActionContent>
    </>
  );
}
