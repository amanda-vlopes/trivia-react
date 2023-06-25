import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { fetchQuestions } from '../services/fetchAPI';

const FOUR = 4;

class Game extends Component {
  state = {
    questions: [],
    index: 0,
    loading: true,
  };

  async componentDidMount() {
    const data = await fetchQuestions();
    if (data.results.length === 0) {
      const { history } = this.props;
      history.push('/');
      localStorage.removeItem('token');
    }
    this.setState({
      questions: data.results,
      loading: false,
    });
  }

  savePlayer = () => {
    const { gravatarEmail, name, score } = this.props;
    const Hash = md5(gravatarEmail).toString();
    const gravatar = `https://www.gravatar.com/avatar/${Hash}`;
    const player = {
      name,
      image: gravatar,
      score,
    };
    const players = JSON.parse(localStorage.getItem('players')) || [];
    players.push(player);
    localStorage.setItem('players', JSON.stringify(players));
  };

  nextQuestion = () => {
    const { history } = this.props;
    const { index } = this.state;
    this.setState((prevState) => ({
      index: prevState.index < (prevState.questions.length - 1)
        && prevState.index + 1,
    }));
    if (index === FOUR) {
      history.push('/feedback');
      this.savePlayer();
    }
  };

  render() {
    const { questions, index, loading } = this.state;
    return (
      <div>
        <Header />
        { loading
          ? <p>Loading...</p>
          : (
            <QuestionCard
              query={ questions[index] }
              nextQuestion={ this.nextQuestion }
            />
          )}
      </div>
    );
  }
}

Game.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Game);
