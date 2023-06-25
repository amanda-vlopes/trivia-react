import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const NUMBER = 3;
    const feedbackMsg = assertions >= NUMBER ? 'Well Done!' : 'Could be better...';

    return (
      <div>
        <Header />
        Feedback testes
        <div data-testid="feedback-total-score">
          { score }
        </div>
        <div data-testid="feedback-total-question">
          { assertions }
        </div>

        <div data-testid="feedback-text">
          {feedbackMsg}
        </div>
        <button
          data-testid="btn-play-again"
          onClick={ this.handlePlayAgain }
        >
          Play Again
        </button>

        <button
          data-testid="btn-ranking"
          onClick={ this.goToRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
  score: globalState.player.score,
});

export default connect(mapStateToProps)(Feedback);
