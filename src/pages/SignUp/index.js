import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignUp() {
  function handleSubmit(data) {}
  return (
    <>
      <div className="panel">
        <img src={logo} alt="FastFeet" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <h3>NOME COMPLETO</h3>
          <Input name="name" type="text" placeholder="Seu nome" />
          <h3>SEU E-MAIL</h3>
          <Input name="email" placeholder="exemplo@email.com" />
          <h3>SUA SENHA</h3>
          <Input name="password" type="password" placeholder="************* " />

          <button type="submit">Criar Conta</button>

          <Link to="/">Já tenho login</Link>
        </Form>
      </div>
    </>
  );
}
