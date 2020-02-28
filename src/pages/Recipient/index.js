import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '~/services/api';

import ActionContent from '~/components/ActionContent';
import ActionHeader from '~/components/ActionHeader';
import DefaultTable from '~/components/DefaultTable';

export default function Recipient() {
  const [name, setName] = useState('');
  const [recipients, setRecipient] = useState([]);

  useEffect(() => {
    async function getRecipient() {
      try {
        const response = await api.get(`recipients`, {
          params: { name },
        });

        setRecipient(response.data);
      } catch (err) {
        toast.error('Nenhum destinatário foi encontrado');
      }
    }

    getRecipient();
  }, [name]);

  async function handleDelete(id) {
    try {
      await api.delete(`/recipietns/${id}`);

      const updatedList = recipients.filter(recipient => recipient.id !== id);

      setRecipient(updatedList);

      toast.success('O destinatário foi excluído');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  function confirmDelete(id) {
    confirmAlert({
      title: 'Confirmação de exclusão',
      message: 'Você quer mesmo excluir esse destinatário?',
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
          <span>Gerenciando destinatários</span>
        </div>
        <div>
          <aside className="blocoPesquisa">
            <input
              type="search"
              onChange={e => setName(e.target.value)}
              placeholder="Buscar por destinatários"
            />
            <Link to="/register/recipients">
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
              <th>Nome</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {recipients &&
              recipients.map(recipient => (
                <tr key={recipient.id}>
                  <td>{recipient.id}</td>
                  <td>{recipient.name}</td>
                  <td>
                    {recipient.street}
                    {recipient.number}
                    {recipient.state}
                    {recipient.city}
                  </td>

                  <td>
                    <Link to={`recipients/${recipient.id}`}>editar</Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => confirmDelete(recipient.id)}
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
