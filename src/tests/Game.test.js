import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";

describe('A aplicação possui uma página Game', () => {
  const exampleName = 'Jogador1';
  const exampleEmail = 'jogador1@example.com';
  const button = 'btn-play';

  it('Verifica se ao clicar no botão Play a aplicação é redirecionada da página Login para a página Game', async () => {
    const { history } = renderWithRouterAndRedux(<App/>, {},'/' );
    userEvent.type(screen.getByTestId('input-player-name'), exampleName);
    userEvent.type(screen.getByTestId('input-gravatar-email'), exampleEmail);

    userEvent.click(screen.getByTestId(button));

    await waitFor(() => expect(history.location.pathname).toBe('/game'), { timeout: 2000 });
  });

  const checkForElements = async (testIds) => {
    testIds.forEach( async (testId) => {
      await waitFor(() => expect(screen.getByTestId(testId)).toBeInTheDocument(), { timeout: 6000 });
    });
  };
  
  const checkButton = async (buttonId) => {
    await waitFor(() => expect(screen.getByTestId(buttonId)).toBeEnabled());
  };
  
  const simulateClick = async (clickId) => {
    await waitFor(() => userEvent.click(screen.getByTestId(clickId)), { timeout: 4000 });
  };
  
  it('Verifica se a página contém as informações relacionadas à partida que está sendo jogada', async () => {
    const { history } = renderWithRouterAndRedux(<App/>, {},'/' );
    userEvent.type(screen.getByTestId('input-player-name'), exampleName);
    userEvent.type(screen.getByTestId('input-gravatar-email'), exampleEmail);
  
    await simulateClick(button);
  
    await checkForElements([
      'header-player-name',
      'header-score',
      'question-category',
      'question-text',
      'correct-answer',
      'btn-next'
    ]);
    
    // Jogou uma vez
    await simulateClick('correct-answer');
  
    await checkButton('btn-next');
  
    await simulateClick('btn-next');
  
    await checkForElements([
      'question-category',
      'question-text',
      'correct-answer',
    ]);
  
    // Jogou duas vezes
    await simulateClick('correct-answer');
  
    await checkButton('btn-next');

    await simulateClick('btn-next');

    // Jogou três vezes
    await simulateClick('correct-answer');

    await checkForElements([
      'question-category',
      'question-text',
      'correct-answer',
    ]);

    await simulateClick('btn-next');
  
    // Jogou quatro vezes
    await simulateClick('correct-answer');
  
    await checkButton('btn-next');

    await simulateClick('btn-next');

    // Jogou cinco vezes
    await simulateClick('correct-answer');

    await simulateClick('btn-next');

    await checkForElements([
      'feedback-text',
      'feedback-total-score',
      'feedback-total-question',
      'feedback-total-correct',
      'feedback-total-wrong',
      'btn-ranking',
      'btn-play-again'
    ]);

    await simulateClick('btn-play-again');

    expect(history.location.pathname).toBe('/');
  }, 12000);
  
  it('Verifica se a aplicação redireciona para a página de login e remove o token do localStorage caso o resultado da API seja igual a 0', async () => {
    // Quem é MacGyver perto dessa gambiarra?!?
    localStorage.setItem('token', 'token');

    const { history } = renderWithRouterAndRedux(<App/>, {},'/game' );

    await waitFor(() => expect(history.location.pathname).toBe('/'), { timeout: 2000 });

    expect(localStorage.getItem('token')).toBe(null);

    await waitFor(() => expect(screen.getByTestId('input-player-name')).toBeInTheDocument(), { timeout: 2000 });
  });
})