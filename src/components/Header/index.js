import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.png';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <Link to="/order">ENCOMENDAS</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>Administrador</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
