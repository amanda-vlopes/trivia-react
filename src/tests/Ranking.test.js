import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Ranking from '../pages/Ranking';

describe('Testes Ranking.jsx', () => {
  test('testa se esta exibindo o título', () => {
    render(<Ranking history={{ push: jest.fn() }} />);
    const titleElement = screen.getByTestId('ranking-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe('Ranking');
  });

  test('testa se esta redirecionando para a página inicial', () => {
    const mockPush = jest.fn();
    render(<Ranking history={{ push: mockPush }} />);
    const playAgainButton = screen.getByTestId('btn-go-home');
    fireEvent.click(playAgainButton);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  test('testa se esta exibindo a lista de jogadores corretamente', () => {
    const players = [
      { name: 'Player 1', image: 'player1.jpg', score: 100 },
      { name: 'Player 2', image: 'player2.jpg', score: 200 },
    ];
    localStorage.setItem('players', JSON.stringify(players));
    render(<Ranking history={{ push: jest.fn() }} />);

    const playerNames = screen.getAllByTestId(/^player-name-/);
    expect(playerNames).toHaveLength(players.length);
    expect(playerNames[0]).toHaveTextContent('Player 1');
    expect(playerNames[1]).toHaveTextContent('Player 2');

    const playerScores = screen.getAllByTestId(/^player-score-/);
    expect(playerScores).toHaveLength(players.length);
    expect(playerScores[0]).toHaveTextContent('100');
    expect(playerScores[1]).toHaveTextContent('200');
  });

});