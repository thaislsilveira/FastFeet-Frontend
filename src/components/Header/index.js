import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="FastFeet" />
        <ul>
          <li>
            <NavLink activeClassName="nav-link" to="/orders">
              ENCOMENDAS
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="nav-link" to="/deliverymen">
              ENTREGADORES
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="nav-link" to="/recipients">
              DESTINATÁRIOS
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="nav-link" to="/problems">
              PROBLEMAS
            </NavLink>
          </li>
        </ul>
        <Profile>
          <div>
            <strong>{profile.name}</strong>
            <Link to="/" onClick={handleSignOut}>
              sair do sistema
            </Link>
          </div>
        </Profile>
      </Content>
    </Container>
  );
}
