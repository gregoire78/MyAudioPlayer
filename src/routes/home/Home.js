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

import { connect } from 'react-redux';
import { actions as playerActions } from 'react-jplayer';
import { actions as playlistActions } from 'react-jplaylist';

import { Container, Row, Col, Image, Collapse } from 'react-bootstrap';
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    audio: PropTypes.arrayOf(
      PropTypes.shape({
        album: PropTypes.string.isRequired,
        tracks: PropTypes.array.isRequired,
      }),
    ).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  pad(data, size) {
    let str = String(data);
    while (str.length < (size || 2)) {
      str = `0${str}`;
    }
    return str;
  }

  handleClick(i) {
    this.setState({ [`key${i}`]: !this.state[`key${i}`] });
  }

  handlePlaylist(i, tracks) {
    const track = tracks[i];
    this.props.dispatch(
      playerActions.setOption('AudioPlaylist', 'media', {
        sources: { m4a: track.filepath },
        title: track.title,
        artist: track.artist,
        poster:
          track.picture && `data:image/jpeg;base64,${track.picture[0].data}`,
        free: false,
      }),
    );

    const playlist = [];
    tracks.map((trackList, l) =>
      playlist.push({
        id: l,
        sources: { m4a: trackList.filepath },
        title: trackList.title,
        artist: trackList.artist,
        poster:
          trackList.picture &&
          `data:image/jpeg;base64,${trackList.picture[0].data}`,
        free: false,
      }),
    );
    this.props.dispatch(playlistActions.clear('AudioPlaylist'));
    this.props.dispatch(playlistActions.setPlaylist('AudioPlaylist', playlist));
    this.props.dispatch(playlistActions.play('AudioPlaylist', i));
  }

  handleAddToPlaylist(track) {
    this.props.dispatch(
      playlistActions.add('AudioPlaylist', {
        sources: { m4a: track.filepath },
        title: track.title,
        artist: track.artist,
        poster:
          track.picture && `data:image/jpeg;base64,${track.picture[0].data}`,
        free: false,
      }),
    );
  }

  render() {
    return (
      <Container fluid className={s.homeContainer}>
        <Row>
          {this.props.audio.map((item, i) => (
            <Col key={i} className={s.albums}>
              {(item.tracks[0].picture && (
                <img
                  onClick={() => this.handleClick(i)}
                  aria-controls="example-collapse-text"
                  aria-expanded={this.state[`key${i}`]}
                  src={`data:image/jpeg;base64,${
                    item.tracks[0].picture[0].data
                  }`}
                  alt="cover"
                  width="300"
                  height="300"
                  title={item.album}
                />
              )) || (
                <div
                  onClick={() => this.handleClick(i)}
                  aria-controls="example-collapse-text"
                  aria-expanded={this.state[`key${i}`]}
                  className={s.cover}
                >
                  {item.album || 'album inconnu'}
                </div>
              )}

              <Collapse in={this.state[`key${i}`]}>
                <div id="example-collapse-text">
                  {item.tracks.map((track, l) => (
                    <div key={l}>
                      <p
                        className={s.trackLink}
                        onClick={() => this.handlePlaylist(l, item.tracks)}
                      >
                        {track.picture && (
                          <Image
                            src={`data:image/jpeg;base64,${
                              track.picture[0].data
                            }`}
                            width="20px"
                            height="20px"
                          />
                        )}{' '}
                        {this.pad(track.track.no, 2)} - {track.title}
                      </p>
                    </div>
                  ))}
                </div>
              </Collapse>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  showRemainingDuration: state.jPlayers.AudioPlaylist.showRemainingDuration,
  media: state.jPlayers.AudioPlaylist.media,
});
const ComponentToogleDuration = ({ showRemainingDuration, dispatch }) => (
  <div
    onClick={() =>
      dispatch(
        playerActions.setOption(
          'AudioPlaylist',
          'showRemainingDuration',
          !showRemainingDuration,
        ),
      )
    }
  >
    Toggle Duration
  </div>
);
const ToogleDuration = connect(mapStateToProps)(ComponentToogleDuration);

// const ComponentToogleMedia = ({ dispatch }) =>
//  <div onClick={() => dispatch(playerActions.setOption('AudioPlaylist', 'media', {
//    sources: { m4a: "/musics/03 LUV U NEED U.flac" },
//    title: "lol",
//    artist: "lol",
//    poster: null,
//    free: false,
//    tracks: [],
//  }))}>
//    Toggle Change
//  </div>;
// const ToogleMedia = connect(mapStateToProps)(ComponentToogleMedia)
export default withStyles(s)(connect(mapStateToProps)(Home));
