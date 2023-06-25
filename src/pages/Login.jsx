import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearScore, savePlayer } from '../redux/actions';
import logo from '../trivia.png';

import '../CSS/Login.css';
import { fetchToken } from '../services/fetchAPI';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  saveUserInfo = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  verifyButton = () => {
    const { name, email } = this.state;
    const isNameValid = name.length > 0;
    const isEmailValid = email.length > 0;
    return !(isNameValid && isEmailValid);
  };

  goToGame = async () => {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    const data = await fetchToken();
    dispatch(savePlayer(name, email));
    history.push('/game');
    localStorage.setItem('token', data.token);
    dispatch(clearScore());
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email } = this.state;
    return (
      <div className="login-container">
        <img src={ logo } className="App-logo" alt="logo" />
        <p data-testid="login-title">SUA VEZ</p>

        <input
          type="text"
          name="name"
          id="name"
          data-testid="input-player-name"
          className="login-input"
          placeholder="Nome"
          onChange={ this.saveUserInfo }
          value={ name }
        />

        <input
          type="text"
          name="email"
          id="email"
          data-testid="input-gravatar-email"
          className="login-input"
          placeholder="E-mail"
          onChange={ this.saveUserInfo }
          value={ email }
        />

        <button
          data-testid="btn-play"
          className="login-button"
          disabled={ this.verifyButton() }
          onClick={ this.goToGame }

        >
          Play
        </button>

        <button
          data-testid="btn-settings"
          className="login-button"
          onClick={ this.handleClick }
        >
          Settings
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  ...globalState.token,
});

export default connect(mapStateToProps)(Login);
