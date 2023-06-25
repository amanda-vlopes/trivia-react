import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Ranking extends Component {
  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const players = JSON.parse(localStorage.getItem('players')) || [];
    const rankingPlayers = players
      .sort((player1, player2) => player2.score - player1.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {rankingPlayers.map(({ name, image, score }, index) => (
            <li key={ index }>
              <h3 data-testid={ `player-name-${index}` }>{ name }</h3>
              <img src={ image } alt={ name } />
              <h3 data-testid={ `player-score-${index}` }>{ score }</h3>
            </li>
          ))}
        </ul>
        <button
          data-testid="btn-go-home"
          onClick={ this.handlePlayAgain }
        >
          Inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
