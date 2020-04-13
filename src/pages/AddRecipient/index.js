import React from 'react';
import * as Yup from 'yup';
import { Input, Form } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';
import InputMask from '../../components/InputMask';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  street: Yup.string().required('A rua é obrigatório'),
  number: Yup.number()
    .positive()
    .required('O número é obrigatório'),
  complement: Yup.string(),
  state: Yup.string().required('O Estado é obrigatório'),
  city: Yup.string().required('A cidade é obrigatório'),
  cep: Yup.string().required('O CEP é obrigatório'),
});

export default function AddRecipient() {
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
      const numberCep = parseInt(cep.replace(/[^A-Z\d\s]/gi, ''), 10);
      await api.post(`/recipients`, {
        name,
        street,
        number,
        complement,
        state,
        city,
        cep: numberCep,
      });

      toast.success('Destinatário cadastrado com sucesso');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Cadastro de destinatário</span>
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
        <Form schema={schema} onSubmit={handleSubmit} id="recipients-form">
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
          <InputMask
            name="cep"
            type="text"
            placeholder="15710-000"
            mask="99999-999"
          />
        </Form>
      </ActionContent>
    </>
  );
}
