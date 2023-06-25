import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../CSS/Header.css';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const Hash = md5(email).toString();
    const gravatar = `https://www.gravatar.com/avatar/${Hash}`;
    return (
      <header className="header-container">
        <div className="Header-player-info">
          <img
            data-testid="header-profile-picture"
            className="header-profile-picture"
            alt="gravatar"
            src={ gravatar }
          />
          <div
            data-testid="header-player-name"
            className="header-player-name"
          >
            { name }
          </div>
        </div>
        <div
          data-testid="header-score"
          className="header-score"
        >

          {score}

        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
