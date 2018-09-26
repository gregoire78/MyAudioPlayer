import { GraphQLList as List } from 'graphql';
import * as mm from 'music-metadata';
import util from 'util';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import AudioItemType from '../types/AudioItemType';

let item = [];
Array.prototype.clean = function(deleteValue) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
function walk(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (error, files) => {
      if (error) {
        return reject(error);
      }
      Promise.all(
        files.map(
          file =>
            new Promise((resolve, reject) => {
              const filepath = path.join(dir, file);

              fs.stat(filepath, (error, stats) => {
                if (error) {
                  return reject(error);
                }
                if (stats.isDirectory()) {
                  walk(filepath).then(resolve);
                } else if (stats.isFile()) {
                  if (
                    path.extname(filepath) == '.flac' ||
                    path.extname(filepath) == '.mp3'
                  ) {
                    resolve(filepath);
                  } else {
                    resolve(null);
                  }
                }
              });
            }),
        ),
      ).then(foldersContents => {
        resolve(
          foldersContents.reduce(
            (all, folderContents) => all.concat(folderContents).clean(null),
            [],
          ),
        );
      });
    });
  });
}
const audio = {
  type: new List(AudioItemType),
  resolve() {
    // const pathAudio = path.resolve(__dirname, '../public/01 Baba Yetu.flac');
    // const pathAudio = path.resolve('public/01 Baba Yetu.flac');
    walk('public')
      .then(resp =>
        Promise.all(
          resp.map(
            audioFile =>
              new Promise((resolve, reject) => {
                mm.parseFile(audioFile, { native: true })
                  .then(metadata => {
                    if (__DEV__) {
                      console.log(
                        util.inspect(metadata.common, {
                          showHidden: false,
                          depth: null,
                        }),
                      );
                      console.log(Math.random());
                    }
                    const itemso = metadata.common;
                    if (metadata.common.picture) {
                      itemso.picture[0].data = new Buffer(
                        metadata.common.picture[0].data,
                      ).toString('base64');
                    }
                    resolve(itemso);
                  })
                  .catch(err => {
                    if (__DEV__) {
                      console.error(err.message);
                    }
                    throw err;
                  });
              }),
          ),
        ),
      )
      .then(itemss => {
        item = _.chain(itemss)
          .groupBy('album')
          .toPairs()
          .map(currentItem => _.zipObject(['album', 'tracks'], currentItem))
          .value();
        if (__DEV__) console.log(item);
      });
    // mm.parseFile(pathAudio, { native: true })
    //  .then(metadata => {
    //    if (__DEV__) {
    //      //console.log(util.inspect(metadata.common, {showHidden: false,depth: null}));
    //      ////  const base64data = new Buffer(metadata.common.picture[0].data).toString('base64');
    //      //console.log(Math.random())
    //    }
    //    items = metadata.common;
    //    items.picture[0].data = new Buffer(metadata.common.picture[0].data).toString('base64');
    //    return items;
    //  })
    //  .catch(err => {
    //    if (__DEV__) { console.error(err.message); }
    //    throw err;
    //  });
    if (item.length) {
      return item;
    }
    return item;
  },
};

export default audio;
