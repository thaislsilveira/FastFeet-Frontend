import React, { useRef, useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import api from '../../services/api';
import { Container, Modal, Signature, SignatureBlock, Text } from './styles';

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
        {orders &&
          orders.map(order => (
            <tr key={order.id}>
              <p>
                <td>
                  {order.recipient.street}
                  {', '}
                  {order.recipient.number}
                </td>
              </p>
              <p>
                {' '}
                <td>
                  {order.recipient.city}
                  {' - '}
                  {order.recipient.state}
                </td>
              </p>
              <p>
                {' '}
                <td>{order.recipient.cep}</td>
              </p>
            </tr>
          ))}

        <br />
        <strong>Datas</strong>
        <p>
          {orders &&
            orders.map(order => (
              <tr key={order.id}>
                <p>
                  {' '}
                  <td>
                    <strong>Retirada:</strong>
                    {order.start_date
                      ? format(parseISO(order.start_date), ' dd/MM/yyyy')
                      : ' - - / - - / - -'}
                  </td>
                </p>
                <p>
                  {' '}
                  <td>
                    <strong>Entrega:</strong>
                    {order.end_date
                      ? format(parseISO(order.end_date), ' dd/MM/yyyy')
                      : ' - - / - - / - -'}
                  </td>
                </p>
              </tr>
            ))}
        </p>

        <br />
        <strong>Assinatura do destinatário</strong>
        <p>
          {orders &&
            orders.map(order => (
              <div key={order.id}>
                <p>
                  {' '}
                  {order.signature ? (
                    <SignatureBlock>
                      <Signature src={order.signature.url} alt="signature" />
                    </SignatureBlock>
                  ) : (
                    <SignatureBlock>
                      <Text>Não existe assinatura cadastrada!</Text>
                    </SignatureBlock>
                  )}
                </p>
              </div>
            ))}
        </p>
      </Modal>
    </Container>
  );
}
