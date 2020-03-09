import React from 'react';

import * as Yup from 'yup';
import { Input, Form } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
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

export default function AddDeliveryman() {
  async function handleSubmit({ name, email, avatar_id }) {
    try {
      await api.post(`/deliverymen`, {
        name,
        email,
        avatar_id,
      });

      toast.success('Entregador cadastrado com sucesso');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Cadastro de Entregadores</span>
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
        <Form schema={schema} id="deliverymen-form" onSubmit={handleSubmit}>
          <AvatarInput name="avatar_id" />
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
