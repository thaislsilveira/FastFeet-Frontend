import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '~/services/api';

import ActionContent from '~/components/ActionContent';
import ActionHeader from '~/components/ActionHeader';
import DefaultTable from '~/components/DefaultTable';

export default function Order() {
  const [product, setProduct] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await api.get(`orders`, {
          params: { product },
        });

        setOrders(response.data.rows);
      } catch (err) {
        toast.error('Nenhuma encomenda foi encontrada');
      }
    }

    getOrders();
  }, [product]);

  async function handleDelete(id) {
    try {
      await api.delete(`/order/${id}`);

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
              <th>Produto</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.product}</td>
                <td>{order.recipient_id.name}</td>
                <td>{order.deliveryman_id.name}</td>
                <td>{order.recipient_id.city}</td>
                <td>{order.recipient_id.state}</td>
                <td />
                <td>
                  <Link to={`orders/${order.id}`}>editar</Link>
                </td>
                <td>
                  <button type="button" onClick={() => confirmDelete(order.id)}>
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </DefaultTable>
      </ActionContent>
    </>
  );
}
