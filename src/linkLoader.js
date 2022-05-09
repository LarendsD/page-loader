import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import _ from 'lodash';
import FileNameFormatter from './FileNameFormatter.js';

const linkLoad = ($, pathToFiles, url) => {
  const arrayOfPromises = ($('link')
    .map((i, el) => {
      const linkToLink = new URL($(el).attr('href'), url.origin);
      if (linkToLink.origin !== url.origin) {
        return null;
      }
      const linkToFile = new FileNameFormatter(linkToLink.href);
      const promise = axios.get(linkToLink.href)
        .then((resp) => {
          if (_.isObject(resp.data)) {
            fs.writeFile(path.join(pathToFiles, linkToFile.other()), JSON.stringify(resp.data));
          } else {
            fs.writeFile(path.join(pathToFiles, linkToFile.other()), resp.data);
          }
        })
        .then(() => null)
        .catch(() => null);
      $(el).attr('href', `${_.last(pathToFiles.split('/'))}/${linkToFile.other()}`);
      return promise;
    }));
  const result = Promise.all(arrayOfPromises);
  return result.then(() => $);
};

export default linkLoad;
