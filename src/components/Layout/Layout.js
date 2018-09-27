/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';
import Header from '../Header';
// import Feedback from '../Feedback';
// import Footer from '../Footer';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import AudioPlaylist from '../AudioPlaylist';
import { reducer as jPlayers } from 'react-jplayer';
import { reducer as jPlaylists } from 'react-jplaylist';

const store = createStore(combineReducers({ jPlayers, jPlaylists }));

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <Provider store={store}>
        <div>
          <Header />
          {this.props.children}
          <AudioPlaylist />
        </div>
      </Provider>
    );
  }
}

export default withStyles(normalizeCss, s)(Layout);
