import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import * as Yup from 'yup';
import { Input, Form } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';

const schema = Yup.object().shape({
  product: Yup.string().required('O Nome do Produto é obrigatório'),
});

export default function AddOrder() {
  const [deliverymanName, setDeliverymanName] = useState('');
  const [deliverymanSelected, setDeliverymanSelected] = useState(null);
  const [recipientName, setRecipientName] = useState('');
  const [recipientSelected, setRecipientSelected] = useState(null);
  const [orderProduct, setOrderProduct] = useState('');

  async function handleSubmit() {
    try {
      await schema.validate(
        {
          product: orderProduct,
        },
        {
          abortEarly: false,
        }
      );
    } catch (err) {
      err.inner.forEach(error => {
        toast.error(error.message);
      });
      return;
    }

    try {
      await api.post(`orders`, {
        deliveryman_id: deliverymanSelected,
        recipient_id: recipientSelected,
        product: orderProduct,
      });
      toast.success('Encomenda efetuada com sucesso');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  const loadDeliverymen = async () => {
    const response = await api.get(`deliverymen?name=${deliverymanName}`);
    console.log(response);
    return response.data;
  };

  async function loadRecipients() {
    const response = await api.get(`recipients?name=${recipientName}`);
    console.log(response);
    return response.data;
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Cadastro de encomendas</span>
          <aside>
            <Link className="prevPage" to="/orders">
              <MdKeyboardArrowLeft size={20} color="#fff" />
              VOLTAR
            </Link>
            <button type="submit" form="orders-form">
              <MdCheck size={20} color="#fff" />
              SALVAR
            </button>
          </aside>
        </div>
      </ActionHeader>
      <ActionContent>
        <Form schema={schema} onSubmit={handleSubmit} id="orders-form">
          <label>Destinatário</label>
          <AsyncSelect
            placeholder="Busque pelo nome do destinatário"
            name="recipient_id"
            loadOptions={loadRecipients}
            defaultOptions
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            onInputChange={v => setRecipientName(v)}
            onChange={s => setRecipientSelected(s.id)}
          />
          <label>Entregador</label>
          <AsyncSelect
            placeholder="Busque pelo nome do entregador"
            name="deliveryman_id"
            loadOptions={loadDeliverymen}
            defaultOptions
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            onInputChange={v => setDeliverymanName(v)}
            onChange={s => setDeliverymanSelected(s.id)}
          />
          <label htmlFor="product">Nome do Produto</label>
          <Input
            name="product"
            type="text"
            placeholder="Yamaha SX7"
            onChange={e => setOrderProduct(e.target.value)}
          />
        </Form>
      </ActionContent>
    </>
  );
}
