import { GraphQLString as StringType } from 'graphql';
import AudioItemType from '../types/AudioItemType';
import * as mm from 'music-metadata';
import util from 'util';
import path from 'path';
let items;
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const audio = {
  type: AudioItemType,
  resolve() {

    if (lastFetchTask) {
      return lastFetchTask;
    }
    if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
      const pathAudio = path.resolve(__dirname, '../public/01 Baba Yetu.flac');
      lastFetchTime = new Date();
      lastFetchTask = mm.parseFile(pathAudio, {native: true})
        .then(metadata => {
          console.log(util.inspect(metadata.common, {
            showHidden: false,
            depth: null
          }));
          //  const base64data = new Buffer(metadata.common.picture[0].data).toString('base64');
          console.log(Math.random())

          items = metadata.common;
          items.picture[0].data = new Buffer(metadata.common.picture[0].data).toString('base64');
          return items;
        })
        .catch(err => {
          console.error(err.message);
          throw err;
        });
        if (items.length) {
          return items;
        }
        return lastFetchTask;
    }
    return items;
  },
};

export default audio;
