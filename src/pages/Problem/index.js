import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';
import DefaultTable from '../../components/DefaultTable';
import PageButton from '../../components/PageButton';
import Centralizer from '../../components/Centralizer';
import Modal from '../../components/Modal';

export default function HelpOrders() {
  const [totalPages, setTotalPages] = useState(0);
  const [page, setpage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await api.get(`help-orders/students`, {
          params: { page },
        });

        const data = response.data.rows.map(order => ({
          ...order,
          formattedDate: format(
            parseISO(order.created_at),
            "d 'de' MMMM 'de ' Y",
            { locale: pt }
          ),
        }));
        setTotalPages(Math.ceil(response.data.count / 10, 1));
        setOrders(data);
      } catch (err) {
        toast.error('Ocorreu um erro ao obter os pedidos de auxílio');
      }
    }
    getOrders();
  }, [page]);

  function handleOrderChange(id) {
    const updatedOrders = orders.filter(ord => ord.id !== id);
    setOrders(updatedOrders);
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Pedidos de auxílio</span>
        </div>
      </ActionHeader>
      <Centralizer>
        <PageButton lock={page < 2} funcPage={() => setpage(page - 1)}>
          Anterior
        </PageButton>
        <span>{page}</span>
        <PageButton
          lock={page === totalPages}
          funcPage={() => setpage(page + 1)}
        >
          Proximo
        </PageButton>
      </Centralizer>
      <ActionContent>
        <DefaultTable>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>EMAIL</th>
              <th>DATA DE CRIAÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.student_order.name}</td>
                <td>{order.student_order.email}</td>
                <td>{order.formattedDate}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      setOrderId(order.id);
                      setVisible(true);
                    }}
                  >
                    responder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </DefaultTable>
      </ActionContent>
      <Modal
        visible={visible}
        order_id={orderId}
        hide={() => setVisible(false)}
        handleOrderChange={handleOrderChange}
      />
    </>
  );
}
