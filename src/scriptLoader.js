import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import _ from 'lodash';
import FileNameFormatter from './FileNameFormatter.js';

const scriptLoad = ($, pathToFiles, url) => {
  const arrayOfPromises = ($('script')
    .map((i, el) => {
      const linkToScript = new URL($(el).attr('src'), url.origin);
      if (linkToScript.origin !== url.origin || $(el).attr('src') === undefined) {
        return null;
      }
      const linkToFile = new FileNameFormatter(linkToScript.href);
      const promise = axios({
        method: 'get',
        url: linkToScript.href,
        responseType: 'json',
      })
        .then((resp) => fs.writeFile(path.join(pathToFiles, linkToFile.other()), resp.data))
        .then(() => null)
        .catch(() => null);
      $(el).attr('src', `${_.last(pathToFiles.split('/'))}/${linkToFile.other()}`);
      return promise;
    }));
  const result = Promise.all(arrayOfPromises);
  return result.then(() => $);
};

export default scriptLoad;
