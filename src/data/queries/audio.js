import { GraphQLString as StringType } from 'graphql';
import AudioItemType from '../types/AudioItemType';
import * as mm from 'music-metadata';
import util from 'util';
import path from 'path';
let items;
const audio = {
  type: StringType,
  resolve() {
    const pathAudio = path.resolve(__dirname, '../public/01 Baba Yetu.flac');
    mm.parseFile(pathAudio, { native: true })
    .then(metadata => {
      console.log(util.inspect(metadata.common, { showHidden: false, depth: null }));
      //  const base64data = new Buffer(metadata.common.picture[0].data).toString('base64');
      console.log(Math.random())
      return items = metadata.common.title;
    })
    .catch(err => {
      console.error(err.message);
      return items;
    });
    return items;
  },
};

export default audio;
