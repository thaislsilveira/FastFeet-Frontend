import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link, useHistory } from 'react-router-dom';
import { FaPlus, FaEllipsisH, FaTrash, FaEdit } from 'react-icons/fa';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
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
      if (
        err.response.data.error.message ===
        'null value in column "recipient_id" violates not-null constraint'
      ) {
        toast.error(
          'Não foi possível deletar o destinatário por fazer parte de uma entrega.'
        );
      } else {
        toast.error('Não foi possível deletar o destinatário');
      }
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
                  <td>#{recipient.id}</td>
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
                    <PopupState variant="popover" popupId={`${recipient.id}`}>
                      {popupState => (
                        <>
                          <FaEllipsisH
                            size={17}
                            color="#C6C6C6"
                            {...bindTrigger(popupState)}
                          />
                          <MyMenu
                            id="simple-menu"
                            {...bindMenu(popupState)}
                            keepMounted
                            getContentAnchorEl={null}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                            }}
                          >
                            <MyMenuItem
                              onClick={() =>
                                history.push(`recipients/${recipient.id}`)
                              }
                            >
                              <FaEdit size={13} color="#4D85EE" />
                              Editar
                            </MyMenuItem>
                            <MyMenuItem
                              onClick={() => confirmDelete(recipient.id)}
                            >
                              <FaTrash size={13} color="#DE3B3B" />
                              Excluir
                            </MyMenuItem>
                          </MyMenu>
                        </>
                      )}
                    </PopupState>
                  </td>
                </tr>
              ))}
          </tbody>
        </DefaultTable>
      </ActionContent>
    </>
  );
}
