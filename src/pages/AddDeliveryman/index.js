import React from 'react';
import * as Yup from 'yup';
import { Input, Form } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function AddDeliveryman() {
  async function handleSubmit({ name, email }) {
    try {
      await api.post(`/deliverymen`, {
        name,
        email,
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
        <Form schema={schema} onSubmit={handleSubmit} id="deliverymen-form">
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
