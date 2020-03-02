import React, { useRef, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import api from '../../services/api';

import { Container, Modal } from './styles';

const schema = Yup.object().shape({
  answer: Yup.string().required('A mensagem é obrigatória'),
});

export default function ModalAnswer({
  order_id,
  visible,
  hide,
  handleOrderChange,
}) {
  const [studentQuestion, setStudentQuestion] = useState('');
  const ref = useRef();

  useEffect(() => {
    async function getHelpOrderInfo() {
      if (visible) {
        const response = await api.get(`help-orders/students/${order_id}`);
        const { question } = response.data;
        setStudentQuestion(question);
      }
    }
    getHelpOrderInfo();
  }, [order_id, visible]);

  async function handleSubmit({ answer }) {
    try {
      await api.post(`/help-orders/${order_id}/answer`, {
        answer,
      });
      setStudentQuestion('');
      handleOrderChange(order_id);
      hide();
      toast.success('A resposta foi enviada ao aluno!');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  function handleOverlayClick(event) {
    if (event.target === ref.current) {
      hide();
    }
  }

  return (
    <Container visible={visible} ref={ref} onClick={handleOverlayClick}>
      <Modal visibleEffect>
        <strong>PERGUNTA DO ALUNO</strong>
        <p>{studentQuestion}</p>
        <Form schema={schema} onSubmit={handleSubmit}>
          <strong>SUA RESPOSTA</strong>
          <Input
            name="answer"
            placeholder="Digite a resposta para o aluno"
            multiline
            type="text"
          />
          <button type="submit">Responder aluno</button>
        </Form>
      </Modal>
    </Container>
  );
}
