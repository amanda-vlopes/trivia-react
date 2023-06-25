import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import Feedback from "../pages/Feedback";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('teste o componente Feedback', () => {
  it('teste se os elementos do Header sao renderizados na pagina', () => {
    renderWithRouterAndRedux (<Feedback />)

    const getImage = screen.getByTestId('header-profile-picture');
    expect(getImage).toBeInTheDocument();

    const getName = screen.getByTestId('header-player-name');
  expect(getImage).toBeInTheDocument();

  const getScore = screen.getByTestId('header-score');
  expect(getScore).toBeInTheDocument();
  });

  it('teste se se ao acertar menos de 3 perguntas a mensagem de feedback é "Could be better..."', () => {
    const initial_state = {
      player: {assertions: 2, score: 0},
    };
    renderWithRouterAndRedux (<Feedback />, initial_state);

    const getCouldBeBetter = screen.getByText(/could be better/i);
    expect(getCouldBeBetter).toBeInTheDocument();
  });

  it('teste se ao acertar 3 perguntas a mensagem de feedback é "Well Done!"', () => {
    const initital_state = {
      player: {assertions: 3, score: 0},
    }

    renderWithRouterAndRedux (<Feedback />, initital_state);

    const getWellDone = screen.getByText(/well done!/i);
    expect(getWellDone).toBeInTheDocument();

  });

  it('teste se ao acertar mais de 3 perguntas a mensagem de feedback é "Well Done!"', () => {
    const initital_state = {
      player: {assertions: 4, score: 0},
    }

    renderWithRouterAndRedux (<Feedback />, initital_state);

    const getWellDone = screen.getByText(/well done!/i);
    expect(getWellDone).toBeInTheDocument();

  });

  it('teste se  número exibido é correto quando a pessoa usuária não acerta nenhuma pergunta', () => {

    const initial_state = {
    player: {assertions: 0} 
      }

    renderWithRouterAndRedux (<Feedback />, initial_state)

    const getScore = screen.getByTestId('feedback-total-question');
    expect(getScore).toBeInTheDocument();    
  });

  it('testa se se o número exibido é correto quando a pessoa usuária acerta 2 perguntas', () => {
    const initial_state = {
      player: {assertions: 2} 
        }
  
      renderWithRouterAndRedux (<Feedback />, initial_state)
  
      const getScore = screen.getByTestId('feedback-total-question');
      expect(getScore).toBeInTheDocument();    
  });

  it('testa se se o número exibido é correto quando a pessoa usuária acerta 4 perguntas', () => {
    const initial_state = {
      player: {assertions: 4} 
        }
  
      renderWithRouterAndRedux (<Feedback />, initial_state)
  
      const getScore = screen.getByTestId('feedback-total-question');
      expect(getScore).toBeInTheDocument();    
  });

  it('teste se a pessoa é redirecionada para tela inicial ao clicar no botão "Play Again"', () => {

   const { history } = renderWithRouterAndRedux (<App />, {}, '/feedback')
   
   const getButton = screen.getByTestId('btn-play-again');
   expect(getButton).toBeInTheDocument();

   userEvent.click(getButton);
   const { pathname } = history.location;
   setTimeout(() => expect(pathname).toBe('/'), 1000) ;
  });

  it('teste se ao clicar no botão "Ranking" a pessoa é redirecionada para tela de ranking', () => {
    const { history } = renderWithRouterAndRedux (<App />, {}, '/feedback')

    const getButton = screen.getByTestId('btn-ranking');
   expect(getButton).toBeInTheDocument();

   userEvent.click(getButton);
   const { pathname } = history.location;
   setTimeout(() => expect(pathname).toBe('/ranking'), 1000) ;
  })
})

