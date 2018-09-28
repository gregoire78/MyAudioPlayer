import React from 'react';
import JPlayer, {
  Gui,
  SeekBar,
  BufferBar,
  Poster,
  Audio,
  Title,
  FullScreen,
  Mute,
  Play,
  PlayBar,
  VolumeBar,
  Duration,
  CurrentTime,
  Download,
  BrowserUnsupported,
} from 'react-jplayer';
import JPlaylist, {
  initializeOptions,
  Playlist,
  Shuffle,
  Next,
  Previous,
  Repeat,
  TogglePlaylist,
  Remove,
  MediaLink,
  Title as PlaylistTitle,
} from 'react-jplaylist';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Styles the jPlaylist to look nice
import d from 'react-jplaylist/src/less/skins/sleek.less';
// Styles Play/Pause/Mute etc when icons (<i />) are used for them
import f from 'react-jplaylist/src/less/controls/iconControls.less';

const jPlayerOptions = {
  id: 'AudioPlaylist',
  verticalVolume: true,
  bufferColour: 'grey',
  volume: 1,
};

const jPlaylistOptions = {
  hidePlaylist: false,
  loop: 'off',
};

initializeOptions(jPlayerOptions, jPlaylistOptions);
class AudioPlaylist extends React.Component {
  render() {
    return (
      <JPlaylist id={jPlayerOptions.id}>
        <JPlayer className="jp-sleek">
          <Audio />
          <Gui>
            <div className="jp-controls jp-icon-controls">
              <Previous>
                <i className="fa fa-step-backward" />
              </Previous>
              <Play>
                <i className="fa">{/* Icon set in css */}</i>
              </Play>
              <Next>
                <i className="fa fa-step-forward" />
              </Next>
              <Repeat>
                <i className="fa">{/* Icon set in css */}</i>
                <i className="fa fa-repeat" />
              </Repeat>
              <Shuffle>
                <i className="fa fa-random" />
              </Shuffle>
              <div
                className="jp-progress"
                style={{
                  backgroundColor: 'lightGrey',
                }}
              >
                <SeekBar>
                  <BufferBar />
                  <PlayBar />
                  <CurrentTime />
                  <Duration />
                </SeekBar>
              </div>
              <div className="jp-volume-container">
                <Mute>
                  <i className="fa">{/* Icon set in css */}</i>
                </Mute>
                <div className="jp-volume-slider">
                  <div className="jp-volume-bar-container">
                    <VolumeBar />
                  </div>
                </div>
              </div>
              <div className="jp-playlist-container">
                <Playlist>
                  <Remove />
                  <MediaLink>
                    <PlaylistTitle />
                  </MediaLink>
                </Playlist>
                <TogglePlaylist>
                  <i className="fa fa-ellipsis-h" />
                </TogglePlaylist>
              </div>
              <FullScreen Screen>
                <i className="fa fa-expand" />
              </FullScreen>
              <Download>
                <i className="fa fa-download" />
              </Download>
              <div className="jp-title-container">
                <Poster />
                <Title />
              </div>
            </div>
            <BrowserUnsupported serUnsupported />
          </Gui>
        </JPlayer>
      </JPlaylist>
    );
  }
}

export default withStyles(d, f)(AudioPlaylist);
