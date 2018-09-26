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
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    news: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        content: PropTypes.string,
      }),
    ).isRequired,
    audio: PropTypes.arrayOf(
      PropTypes.shape({
        album: PropTypes.string.isRequired,
        tracks: PropTypes.array.isRequired,
      }),
    ).isRequired,
  };
  pad(data, size) {
    let s = String(data);
    while (s.length < (size || 2)) {
      s = `0${s}`;
    }
    return s;
  }
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>News</h1>

          {this.props.audio.map(item => (
            <div>
              <h3>{item.album}</h3>
              {item.tracks[0].picture && (
                <img
                  src={`data:image/jpeg;base64,${
                    item.tracks[0].picture[0].data
                  }`}
                  alt="cover"
                  width="300"
                  height="300"
                />
              )}
              {item.tracks.map(track => (
                <div>
                  <p>
                    {this.pad(track.track.no, 2)} - {track.title}
                  </p>
                </div>
              ))}
            </div>
          ))}
          {/* this.props.news.map(item => (
            <article key={item.link} className={s.newsItem}>
              <h1 className={s.newsTitle}>
                <a href={item.link}>{item.title}</a>
              </h1>
              <div
                className={s.newsDesc}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </article>
          )) */}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
