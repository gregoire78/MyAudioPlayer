import React from 'react';
import JPlayer, {
  Gui, SeekBar, BufferBar,
  Poster, Audio, Title, FullScreen, Mute, Play, PlayBar,
  VolumeBar, Duration, CurrentTime, Download, BrowserUnsupported,
} from 'react-jplayer';
import JPlaylist, {
  initializeOptions, Playlist, Shuffle, Next, Previous, Repeat,
  TogglePlaylist, Remove, MediaLink, Title as PlaylistTitle,
} from 'react-jplaylist';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as jPlayers } from 'react-jplayer';
import { reducer as jPlaylists } from 'react-jplaylist';
// Styles the jPlaylist to look nice
import d from 'react-jplaylist/src/less/skins/sleek.less';
// Styles Play/Pause/Mute etc when icons (<i />) are used for them
import f from 'react-jplaylist/src/less/controls/iconControls.less';

const store = createStore(combineReducers({ jPlayers, jPlaylists }));

const jPlayerOptions = {
  id: 'AudioPlaylist',
  verticalVolume: true,
  bufferColour:'grey',
  volume: 1,
};

const jPlaylistOptions = {
  hidePlaylist: true,
  playlist: [
    {
      id: 0,
      title: 'Bubble',
      artist: 'Miaow',
      sources: {
        m4a: 'https://filerun.gregoirejoncour.xyz/wl/?id=4UcTByKJ4jb2iiYmZvOfDs9FhXuzqNDX',
      },
      free: true,
    },
    {
      id: 1,
      title: 'Tempered Song',
      artist: 'Miaow',
      sources: {
        mp3: 'http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3',
        oga: 'http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg',
      },
    },
    {
      id: 2,
      title: 'Cro Magnon Man',
      artist: 'The Stark Palace',
      sources: {
        m4a: 'https://filerun.gregoirejoncour.xyz/wl/?id=hj90whhENNX2KykziXmejchAgVoMISKA',
      },
      poster: 'http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png',
    },
  ],
};

initializeOptions(jPlayerOptions, jPlaylistOptions);
class AudioPlaylist extends React.Component {
render() {
  return (
    <Provider store={store}>
    <JPlaylist id={jPlayerOptions.id}>
      < JPlayer className="jp-sleek">
        <Audio />
        <Gui>
          <div className="jp-controls jp-icon-controls">
            <Previous><i className="fa fa-step-backward" /></Previous>
            <Play><i className="fa">{/* Icon set in css */}</i></Play>
            <Next><i className="fa fa-step-forward" /></Next>
            <Repeat>
              <i className="fa">{/* Icon set in css */}</i>
              <i className="fa fa-repeat" />
          </Repeat>
          <Shuffle><i className="fa fa-random" /></Shuffle>
          <div className="jp-progress" style={{backgroundColor: "lightGrey"}}>
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
          <div  className="jp-playlist-container">
      <Playlist>
        <Remove />
        <MediaLink>
          <PlaylistTitle />
              </MediaLink>
            </Playlist>
            <TogglePlaylist><i className="fa fa-ellipsis-h" /></TogglePlaylist>
          </div>
          <FullScreen Screen><i className="fa fa-expand" /></FullScreen>
    <Download><i className="fa fa-download" /></Download>
    <div className="jp-title-container">
      <Poster />
      <Title />
          </div>
        </div> 
        <BrowserUnsupported serUnsupported />
      </Gui>
    </JPlayer>
  </JPlaylist >
  </Provider>
    )
}
}

export default withStyles(d, f)(AudioPlaylist);
