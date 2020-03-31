import React, { useRef, useEffect, useState } from 'react';
import api from '../../services/api';

import { Container, Modal } from './styles';

export default function ModalAnswer({
  problem_id,
  visible,
  hide,
  handleOrderChange,
}) {
  const [description] = useState('');
  const [deliveryproblems, setDeliveryman] = useState([]);
  const ref = useRef();

  useEffect(() => {
    async function getHelpOrderInfo() {
      if (visible) {
        const response = await api.get(`deliveryproblems/${problem_id}`, {
          params: { description },
        });

        setDeliveryman(response.data);
      }
    }
    getHelpOrderInfo();
  }, [description, problem_id, visible]);

  function handleOverlayClick(event) {
    if (event.target === ref.current) {
      hide();
    }
  }

  return (
    <Container visible={visible} ref={ref} onClick={handleOverlayClick}>
      <Modal visibleEffect>
        <strong>VISUALIZAR PROBLEMA</strong>
        <p>
          {deliveryproblems &&
            deliveryproblems.map(deliveryproblem => (
              <tr key={deliveryproblem.id}>
                <td>{deliveryproblem.description}</td>
              </tr>
            ))}
        </p>
      </Modal>
    </Container>
  );
}
