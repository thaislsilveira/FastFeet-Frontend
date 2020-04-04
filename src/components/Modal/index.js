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
    console.log(problem_id);
    async function getHelpOrderInfo() {
      if (visible) {
        const response = await api.get(`deliveryproblems/${problem_id}`, {
          params: { description },
        });

        setDeliveryman(response.data);
      }
    }
    getHelpOrderInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description, problem_id]);

  function handleOverlayClick(event) {
    if (event.target === ref.current) {
      hide();
    }
  }

  return (
    <Container visible={visible} ref={ref} onClick={handleOverlayClick}>
      <Modal visibleEffect>
        <strong>VISUALIZAR PROBLEMA</strong>
        <div>
          {deliveryproblems &&
            deliveryproblems.map(deliveryproblem => (
              <div key={deliveryproblem.id}>
                <div>{deliveryproblem.description}</div>
              </div>
            ))}
        </div>
      </Modal>
    </Container>
  );
}
