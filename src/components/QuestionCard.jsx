import PropTypes from 'prop-types';
import React, { Component } from 'react';
import he from 'he';

import '../CSS/QuestionCard.css';

import { connect } from 'react-redux';
import { addAssertions, addScore } from '../redux/actions';

const ONE_SECOND = 1000;
const THREE = 3;
const TWO = 2;
const ONE = 1;

class QuestionCard extends Component {
  state = {
    selected: false,
    answersSorted: [],
    seconds: 30,
    disabled: false,
    next: false,
  };

  componentDidMount() {
    this.sortAnswers();
    this.setTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    if (prevState.selected === false && prevState.seconds === 0) {
      this.setState({
        disabled: true,
        seconds: prevState.seconds,
      });
    } else if (prevProps.query !== query) {
      this.sortAnswers();
    }
  }

  sortAnswers = () => {
    const { query } = this.props;
    const answers = [...query.incorrect_answers, query.correct_answer];
    const num = 0.5;
    const answersSorted = answers.sort(() => Math.random() - num);
    this.setState({
      answersSorted,
    });
  };

  getDifficulty = () => {
    const { query } = this.props;
    if (query.difficulty === 'hard') {
      return THREE;
    } if (query.difficulty === 'medium') {
      return TWO;
    }
    return ONE;
  };

  setTimer = () => {
    setInterval(() => {
      this.setState((prev) => ({
        seconds: prev.seconds - 1,
      }));
    }, ONE_SECOND);
  };

  verifyAnswer = ({ target }) => {
    this.setState({
      selected: true,
      next: true,
    });
    const { query, dispatch } = this.props;
    const { seconds } = this.state;
    if (target.textContent === query.correct_answer) {
      dispatch(addScore(seconds, this.getDifficulty()));
      dispatch(addAssertions());
    }
  };

  clickNext = () => {
    const { nextQuestion } = this.props;
    nextQuestion();
    this.setState({
      selected: false,
      seconds: 30,
      next: false,
    });
  };

  setColor = (answer, correctAnswer) => {
    const { selected } = this.state;
    if (selected) {
      if (correctAnswer === answer) {
        return 'correct_answer';
      }
      return 'wrong_answer';
    }
    return '';
  };

  render() {
    const { query } = this.props;
    const { answersSorted, seconds, disabled, next } = this.state;
    const { category, question,
      correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } = query;
    return (
      <div className="question-card-container">
        <h1 className="question-category" data-testid="question-category">{category}</h1>
        <p className="question-text" data-testid="question-text">{he.decode(question)}</p>
        <div className="answer-options" data-testid="answer-options">
          { answersSorted.map((answer, index) => (
            <button
              data-testid={ incorrectAnswers.includes(answer)
                ? `wrong-answer-${index}` : 'correct-answer' }
              key={ index }
              onClick={ this.verifyAnswer }
              className={ this.setColor(answer, correctAnswer) }
              disabled={ disabled }
            >
              { he.decode(answer) }
            </button>
          ))}
        </div>

        <p className="timer">{`Tempo: ${seconds}`}</p>
        { next && <button data-testid="btn-next" onClick={ this.clickNext }>Next</button>}
      </div>
    );
  }
}

QuestionCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  query: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
  }).isRequired,
};

export default connect()(QuestionCard);
