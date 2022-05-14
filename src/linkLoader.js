import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import _ from 'lodash';
import Listr from 'listr';
import FileNameFormatter from './FileNameFormatter.js';

const linkLoad = ($, pathToFiles, url) => {
  const arrayOfPromises = ($('link')
    .map((i, el) => {
      const linkToLink = new URL($(el).attr('href'), url.origin);
      if (linkToLink.origin !== url.origin) {
        return null;
      }
      const linkToFile = new FileNameFormatter(linkToLink.href);
      const fullPath = path.join(pathToFiles, linkToFile.other());
      const task = new Listr([
        {
          title: linkToLink.href,
          task: () => {
            const promise = axios({
              method: 'get',
              url: linkToLink.href,
              responseType: 'json',
            })
              .then((resp) => fs.writeFile(fullPath, resp.data));
            $(el).attr('href', `${_.last(pathToFiles.split('/'))}/${linkToFile.other()}`);
            return promise;
          },
        },
      ]);
      return task.run();
    }));
  const result = Promise.all(arrayOfPromises);
  return result.then(() => $);
};

export default linkLoad;
