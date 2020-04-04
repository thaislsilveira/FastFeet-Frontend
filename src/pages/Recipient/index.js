import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link, useHistory } from 'react-router-dom';
import { FaPlus, FaEllipsisH, FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { MyMenu, MyMenuItem } from './styles';

import ActionContent from '~/components/ActionContent';
import ActionHeader from '~/components/ActionHeader';
import DefaultTable from '~/components/DefaultTable';

export default function Recipient() {
  const [name] = useState('');
  const [recipients, setRecipient] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [recipientFiltered, setRecipientFiltered] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

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

  useEffect(() => {
    function searchFilter() {
      if (!searchText) return setRecipientFiltered(recipients);

      const filtered = recipients.filter(item => {
        return Object.keys(item).some(key => {
          if (item[key] === null) return false;

          return (
            item[key]
              .toString()
              .toLowerCase()
              .search(searchText.toLowerCase()) !== -1
          );
        });
      });
      return setRecipientFiltered(filtered);
    }

    searchFilter();
  }, [recipients, searchText]);

  async function handleDelete(id) {
    try {
      await api.delete(`/recipients/${id}`);

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

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              onChange={e => setSearchText(e.target.value)}
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
            {recipientFiltered &&
              recipientFiltered.map(recipient => (
                <tr key={recipient.id}>
                  <td>#0{recipient.id}</td>
                  <td>{recipient.name}</td>
                  <td>
                    {recipient.street}
                    {', '}
                    {recipient.number}
                    {', '}
                    {recipient.city}
                    {' - '}
                    {recipient.state}
                  </td>

                  <td>
                    <FaEllipsisH
                      size={17}
                      color="#C6C6C6"
                      onClick={handleClick}
                    />
                    <MyMenu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      getContentAnchorEl={null}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MyMenuItem
                        onClick={() =>
                          history.push(`recipients/${recipient.id}`)
                        }
                      >
                        <FaEdit size={13} color="#4D85EE" />
                        Editar
                      </MyMenuItem>
                      <MyMenuItem onClick={() => confirmDelete(recipient.id)}>
                        <FaTrash size={13} color="#DE3B3B" />
                        Excluir
                      </MyMenuItem>
                    </MyMenu>
                  </td>
                </tr>
              ))}
          </tbody>
        </DefaultTable>
      </ActionContent>
    </>
  );
}
