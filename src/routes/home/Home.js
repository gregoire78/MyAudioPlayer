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
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  pad(data, size) {
    let s = String(data);
    while (s.length < (size || 2)) {
      s = `0${s}`;
    }
    return s;
  }

  render() {

    return (
      <Container fluid={true} className={s.homeContainer}>
        <Row>
          {this.props.audio.map((item, i) => (
            <Col key={i}
              onClick={() => this.setState({ [`key${i}`]: !this.state[`key${i}`] })}
              aria-controls="example-collapse-text"
              aria-expanded={this.state[`key${i}`]}
              className={s.albums}
            >
              {item.tracks[0].picture && (
                <img
                  src={`data:image/jpeg;base64,${
                    item.tracks[0].picture[0].data
                    }`}
                  alt="cover"
                  width="300"
                  height="300"
                  title={item.album}
                />
              ) || (<div className={s.cover}>{item.album || "album inconnu"}</div>)}

              <Collapse in={this.state[`key${i}`]}>
                <div id="example-collapse-text">
                  {item.tracks.map((track, l) => (
                    <div key={l}>
                      <p>
                        {track.picture && (<Image src={`data:image/jpeg;base64,${
                          track.picture[0].data
                          }`} width="20px" height="20px"/>)} {this.pad(track.track.no, 2)} - {track.title}
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

export default withStyles(s)(Home);
