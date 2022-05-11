import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import _ from 'lodash';
import Listr from 'listr';
import FileNameFormatter from './FileNameFormatter.js';

const scriptLoad = ($, pathToFiles, url) => {
  const arrayOfPromises = ($('script')
    .map((i, el) => {
      const linkToScript = new URL($(el).attr('src'), url.origin);
      if (linkToScript.origin !== url.origin || $(el).attr('src') === undefined) {
        return null;
      }
      const linkToFile = new FileNameFormatter(linkToScript.href);
      const fullPath = path.join(pathToFiles, linkToFile.other());
      const task = new Listr([
        {
          title: linkToScript.href,
          task: () => {
            const promise = axios({
              method: 'get',
              url: linkToScript.href,
              responseType: 'json',
            })
              .then((resp) => fs.writeFile(fullPath, resp.data))
              .catch(() => null);
            $(el).attr('src', `${_.last(pathToFiles.split('/'))}/${linkToFile.other()}`);
            return promise;
          },
        },
      ]);
      return task.run();
    }));
  const result = Promise.all(arrayOfPromises);
  return result.then(() => $);
};

export default scriptLoad;
