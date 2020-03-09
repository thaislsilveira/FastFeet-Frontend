import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Input, Form } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

import AvatarInput from '../AvatarInput';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  avatar_id: Yup.number(),
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
        avatar_id: response.data[0].avatar_id,
        avatar_url: response.data[0].avatar.url,
      };

      setDeliverymanData(initialData);
    }
    getDeliverymanData();
  }, [id]);

  async function handleSubmit({ name, email, avatar_id }) {
    try {
      await api.put(`deliverymen/${id}`, {
        name,
        email,
        avatar_id,
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
          <AvatarInput
            name="avatar_id"
            avatarUrl={deliverymanData && deliverymanData.avatar_url}
          />
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
