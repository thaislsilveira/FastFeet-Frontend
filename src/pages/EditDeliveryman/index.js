import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Input, Form } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function EditDeliveryman() {
  const [deliverymanData, setDeliverymanData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getDeliverymanData() {
      const response = await api.get(`deliverymen/${id}`);
      const initialData = {
        name: response.data[0].name,
        email: response.data[0].email,
      };

      setDeliverymanData(initialData);
    }
    getDeliverymanData();
  }, [id]);

  async function handleSubmit({ name, email }) {
    try {
      await api.put(`deliverymen/${id}`, {
        name,
        email,
      });

      toast.success('Entregador alterado com sucesso');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Edição de Entregadores</span>
          <aside>
            <Link className="prevPage" to="/deliverymen">
              <MdKeyboardArrowLeft size={20} color="#fff" />
              VOLTAR
            </Link>
            <button type="submit" form="deliverymen-form">
              <MdCheck size={20} color="#fff" />
              SALVAR
            </button>
          </aside>
        </div>
      </ActionHeader>
      <ActionContent>
        <Form
          onSubmit={handleSubmit}
          initialData={deliverymanData}
          schema={schema}
          id="deliverymen-form"
        >
          <label htmlFor="name">Nome</label>
          <Input name="name" type="text" placeholder="John Doe" />
          <label htmlFor="name">Email</label>
          <Input
            name="email"
            type="email"
            placeholder="exemplo@rocketseat.com"
          />
        </Form>
      </ActionContent>
    </>
  );
}
