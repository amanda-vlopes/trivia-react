import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Login from "../pages/Login";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('A aplicação possui uma tela de Login', () =>{
  const button = 'btn-play';

  it('Será verificado se é renderizado um elemento para que o usuário insira o seu nome e o seu email', () => {
    renderWithRouterAndRedux(<Login />);

    expect(screen.getByTestId('input-player-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-gravatar-email')).toBeInTheDocument();
    expect(screen.getByTestId(button)).toBeInTheDocument();
  });

  it('Será verificado se é renderizado um botão com o texto Play, que inicialmente está desabilitado', () => {
    renderWithRouterAndRedux(<Login />);
    expect(screen.getByTestId(button)).toBeInTheDocument();
    expect(screen.getByTestId(button)).toBeDisabled();    
  });

  it('Será verificado se o botão "Play" está habilitado quando a pessoa jogadora preencher os campos de nome e email', () => {
    renderWithRouterAndRedux(<Login />);
    userEvent.type(screen.getByTestId('input-player-name'), 'Jogador1');
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'jogador1@email.com');
    
    expect(screen.getByTestId(button)).toBeEnabled();    
  });

  it('Será verificado se existe um botão na página que leva para a página de configurações', () => {
    renderWithRouterAndRedux(<Login />);
    expect(screen.getByTestId('btn-settings')).toBeInTheDocument();
  });
})