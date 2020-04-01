import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link, useHistory } from 'react-router-dom';
import { FaPlus, FaEllipsisH, FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { Avatar, Initial, MyMenu, MyMenuItem } from './styles';
import ActionContent from '~/components/ActionContent';
import ActionHeader from '~/components/ActionHeader';
import DefaultTable from '~/components/DefaultTable';

export default function Deliveryman() {
  const [name] = useState('');
  const [deliverymen, setDeliveryman] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [deliverymenFiltered, setDeliverymenFiltered] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  useEffect(() => {
    async function getDeliveryman() {
      try {
        const response = await api.get(`deliverymen`, {
          params: { name },
        });

        const data = response.data.map(deliveryman => {
          let initial = '';

          initial = deliveryman.name
            .split(' ')
            .map(n => n[0])
            .join('');

          return {
            ...deliveryman,

            initial,
          };
        });

        setDeliveryman(data);
      } catch (err) {
        toast.error('Nenhum entregador foi encontrado');
      }
    }

    getDeliveryman();
  }, [name]);

  useEffect(() => {
    function searchFilter() {
      if (!searchText) return setDeliverymenFiltered(deliverymen);

      const filtered = deliverymen.filter(item => {
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
      return setDeliverymenFiltered(filtered);
    }

    searchFilter();
  }, [deliverymen, searchText]);

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
          <span>Gerenciando entregadores</span>
        </div>
        <div>
          <aside className="blocoPesquisa">
            <input
              type="search"
              onChange={e => setSearchText(e.target.value)}
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
            {deliverymenFiltered &&
              deliverymenFiltered.map(deliveryman => (
                <tr key={deliveryman.id}>
                  <td>#0{deliveryman.id}</td>
                  <td>
                    {deliveryman.avatar ? (
                      <>
                        <Avatar src={deliveryman.avatar.url} alt="avatar" />
                        <div>{deliveryman.name}</div>
                      </>
                    ) : (
                      <Initial>{deliveryman.initial}</Initial>
                    )}
                  </td>
                  <td>{deliveryman.name}</td>
                  <td>{deliveryman.email}</td>
                  <td>
                    <FaEllipsisH
                      size={17}
                      color="#C6C6C6"
                      onClick={handleClick}
                    />
                    <MyMenu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'top',
                      }}
                    >
                      <MyMenuItem
                        onClick={() => history.push(`orders/${deliveryman.id}`)}
                      >
                        <FaEdit size={13} color="#4D85EE" />
                        Editar
                      </MyMenuItem>
                      <MyMenuItem onClick={() => confirmDelete(deliveryman.id)}>
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
