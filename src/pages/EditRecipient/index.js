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
  street: Yup.string().required('A rua é obrigatório'),
  number: Yup.number()
    .positive()
    .required('O número é obrigatório'),
  complement: Yup.string(),
  state: Yup.string().required('O Estado é obrigatório'),
  city: Yup.string().required('A cidade é obrigatório'),
  cep: Yup.number()
    .positive()
    .required('O CEP é obrigatório'),
});

export default function EditRecipient() {
  const [recipientData, setRecipientData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getRecipientData() {
      const response = await api.get(`recipients/${id}`);
      const initialData = {
        name: response.data[0].name,
        street: response.data[0].street,
        number: response.data[0].number,
        complement: response.data[0].complement,
        state: response.data[0].state,
        city: response.data[0].city,
        cep: response.data[0].cep,
      };

      setRecipientData(initialData);
    }
    getRecipientData();
  }, [id]);

  async function handleSubmit({
    name,
    street,
    number,
    complement,
    state,
    city,
    cep,
  }) {
    try {
      await api.put(`recipients/${id}`, {
        name,
        street,
        number,
        complement,
        state,
        city,
        cep,
      });

      toast.success('Destinatário alterado com sucesso');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Edição de Destinatários</span>
          <aside>
            <Link className="prevPage" to="/recipients">
              <MdKeyboardArrowLeft size={20} color="#fff" />
              VOLTAR
            </Link>
            <button type="submit" form="recipients-form">
              <MdCheck size={20} color="#fff" />
              SALVAR
            </button>
          </aside>
        </div>
      </ActionHeader>
      <ActionContent>
        <Form
          onSubmit={handleSubmit}
          initialData={recipientData}
          schema={schema}
          id="recipients-form"
        >
          <label htmlFor="name">Nome</label>
          <Input name="name" type="text" placeholder="Ludwig van Beethoven" />
          <label htmlFor="street">Rua</label>
          <Input name="street" type="text" placeholder="Rua Beethoven" />
          <label htmlFor="number">Número</label>
          <Input name="number" type="number" placeholder="1729" />
          <label htmlFor="complement">Complemento</label>
          <Input name="complement" type="text" />
          <label htmlFor="city">Cidade</label>
          <Input name="city" type="text" placeholder="Ludwig van Beethoven" />
          <label htmlFor="state">Estado</label>
          <Input name="state" type="text" placeholder="Ludwig van Beethoven" />
          <label htmlFor="cep">CEP</label>
          <Input name="cep" type="number" placeholder="09960-580" />
        </Form>
      </ActionContent>
    </>
  );
}
