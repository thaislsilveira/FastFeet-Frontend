import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { Avatar } from './styles';
import ActionContent from '~/components/ActionContent';
import ActionHeader from '~/components/ActionHeader';
import DefaultTable from '~/components/DefaultTable';

export default function Deliveryman() {
  const [name, setName] = useState('');
  const [deliverymen, setDeliveryman] = useState([]);

  useEffect(() => {
    async function getDeliveryman() {
      try {
        const response = await api.get(`deliverymen`, {
          params: { name },
        });

        setDeliveryman(response.data);
      } catch (err) {
        toast.error('Nenhum entregador foi encontrado');
      }
    }

    getDeliveryman();
  }, [name]);

  async function handleDelete(id) {
    try {
      await api.delete(`/deliverymen/${id}`);

      const updatedList = deliverymen.filter(
        deliveryman => deliveryman.id !== id
      );

      setDeliveryman(updatedList);

      toast.success('O entregador foi excluído');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  function confirmDelete(id) {
    confirmAlert({
      title: 'Confirmação de exclusão',
      message: 'Você quer mesmo excluir esse entregador?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleDelete(id),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Gerenciando entregadores</span>
        </div>
        <div>
          <aside className="blocoPesquisa">
            <input
              type="search"
              onChange={e => setName(e.target.value)}
              placeholder="Buscar por entregadores"
            />
            <Link to="/register/deliverymen">
              <FaPlus size={13} color="#fff" />
              CADASTRAR
            </Link>
          </aside>
        </div>
      </ActionHeader>
      <ActionContent>
        <DefaultTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {deliverymen &&
              deliverymen.map(deliveryman => (
                <tr key={deliveryman.id}>
                  <td>{deliveryman.id}</td>
                  <td>
                    <Avatar
                      src={
                        deliveryman.avatar
                          ? deliveryman.avatar.url
                          : 'https://api.adorable.io/avatars/100/abott@adorable.png'
                      }
                      alt="avatar"
                    />
                  </td>
                  <td>{deliveryman.name}</td>
                  <td>{deliveryman.email}</td>
                  <td>
                    <Link to={`deliverymen/${deliveryman.id}`}>editar</Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => confirmDelete(deliveryman.id)}
                    >
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </DefaultTable>
      </ActionContent>
    </>
  );
}
