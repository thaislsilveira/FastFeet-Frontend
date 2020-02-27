import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <>
      <div className="panel">
        <img src={logo} alt="FastFeet" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <h3>SEU E-MAIL</h3>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <h3>SUA SENHA</h3>
          <Input name="password" type="password" placeholder="*************" />

          <button type="submit">Entrar no sistema</button>

          <Link to="/register">Criar conta gratuita</Link>
        </Form>
      </div>
    </>
  );
}
