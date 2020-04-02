import React, { useRef, useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import api from '../../services/api';
import { Container, Modal } from './styles';

export default function ModalAnswer({
  order_id,
  visible,
  hide,
  handleOrderChange,
}) {
  const [start_date] = useState('');
  const [orders, setOrders] = useState([]);
  const ref = useRef();

  useEffect(() => {
    async function getHelpOrderInfo() {
      if (visible) {
        const response = await api.get(`orders/${order_id}`, {
          params: { start_date },
        });

        setOrders(response.data);
      }
    }
    getHelpOrderInfo();
  }, [order_id, start_date, visible]);

  function handleOverlayClick(event) {
    if (event.target === ref.current) {
      hide();
    }
  }

  return (
    <Container visible={visible} ref={ref} onClick={handleOverlayClick}>
      <Modal visibleEffect>
        <strong>Informações da encomenda</strong>
        <p>
          {orders &&
            orders.map(order => (
              <tr key={order.id}>
                <td>
                  {order.recipient.street}
                  {', '}
                  {order.recipient.number}
                </td>
                <td>
                  {order.recipient.city}
                  {' - '}
                  {order.recipient.state}
                </td>
                <td>{order.recipient.cep}</td>
              </tr>
            ))}
        </p>
        <br />
        <strong>Datas</strong>
        <p>
          {orders &&
            orders.map(order => (
              <tr key={order.id}>
                <td>
                  Retirada: {format(parseISO(order.start_date), 'dd/MM/yyyy')}
                </td>
                <td>
                  Entrega:{' '}
                  {order.end_date !== null
                    ? format(parseISO(order.end_date), 'dd/MM/yyyy')
                    : ' - - / - - / - -'}
                </td>
              </tr>
            ))}
        </p>

        <br />
        <strong>Assinatura do destinatário</strong>
        <p>
          {orders &&
            orders.map(order => (
              <tr key={order.id}>
                <td>{order.signature_id}</td>
              </tr>
            ))}
        </p>
      </Modal>
    </Container>
  );
}
