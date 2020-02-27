import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <nav>
          <img src={logo} alt="FastFeet" />
          <Link to="/order">ENCOMENDAS</Link>
        </nav>
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
