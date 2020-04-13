import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import * as Yup from 'yup';
import { Input, Form } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';

const schema = Yup.object().shape({
  product: Yup.string().required('O Nome do Produto é obrigatório'),
});

export default function EditOrder() {
  const [orderData, setOrderData] = useState([]);
  const [deliverymanName, setDeliverymanName] = useState('');
  const [deliverymanSelected, setDeliverymanSelected] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientSelected, setRecipientSelected] = useState('');
  const [orderProduct, setOrderProduct] = useState('');

  const { id } = useParams();

  useEffect(() => {
    async function getOrderData() {
      const response = await api.get(`orders/${id}`);

      const initialData = {
        product: response.data[0].product,
        recipient_id: response.data[0].recipient,
        deliveryman_id: response.data[0].deliveryman,
      };

      setOrderProduct(initialData.product);
      setRecipientName(initialData.recipient_id.name);
      setRecipientSelected(initialData.recipient_id.id);

      setDeliverymanSelected(initialData.deliveryman_id.id);
      setDeliverymanName(initialData.deliveryman_id.name);
      setOrderData(initialData);
    }
    getOrderData();
  }, [id]);

  async function handleSubmit({
    product,
    recipientSelected: recipient_id,
    deliverymanSelected: deliveryman_id,
  }) {
    try {
      await api.put(`orders/${id}`, {
        product,
        recipient_id: recipientSelected,
        deliveryman_id: deliverymanSelected,
      });

      toast.success('Encomenda alterado com sucesso');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  const loadDeliverymen = async () => {
    const response = await api.get(`deliverymen?name=${deliverymanName}`);
    return new Promise(resolve => resolve(response.data));
  };

  async function loadRecipients() {
    const response = await api.get(`recipients?name=${recipientName}`);
    return new Promise(resolve => resolve(response.data));
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Edição de encomendas</span>
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
        <Form
          onSubmit={handleSubmit}
          initialData={orderData}
          schema={schema}
          id="orders-form"
        >
          <label>Destinatário</label>
          <AsyncSelect
            placeholder="Busque pelo nome do destinatário"
            name="recipient_id"
            loadOptions={loadRecipients}
            defaultOptions
            value={{ id: recipientSelected, name: recipientName }}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            onChange={s => {
              setRecipientSelected(s.id);
              setRecipientName(s.name);
            }}
          />
          <label>Entregador</label>
          <AsyncSelect
            placeholder="Busque pelo nome do entregador"
            name="deliveryman_id"
            loadOptions={loadDeliverymen}
            defaultOptions
            value={{ id: deliverymanSelected, name: deliverymanName }}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            onChange={s => {
              setDeliverymanSelected(s.id);
              setDeliverymanName(s.name);
            }}
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
