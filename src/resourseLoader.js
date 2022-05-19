import * as cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import _ from 'lodash';
import Listr from 'listr';
import FileNameFormatter from './FileNameFormatter.js';

const source = {
  img: 'src',
  link: 'href',
  script: 'src',
};

const resourseLoad = (response, pathToFiles, url) => {
  const $ = cheerio.load(response);
  const promises = ($('img, link, script')
    .map((i, el) => {
      const { name } = el;
      const linkToResourse = new URL($(el).attr(source[name]), url.origin);
      if (linkToResourse.origin !== url.origin) {
        return null;
      }
      const linkToFile = new FileNameFormatter(linkToResourse.href);
      const fullPath = path.join(pathToFiles, linkToFile.resourse());
      const task = new Listr([
        {
          title: linkToResourse.href,
          task: () => {
            const promise = axios({
              method: 'get',
              url: linkToResourse.href,
              responseType: 'stream',
            })
              .then((resp) => fs.writeFile(fullPath, resp.data));
            $(el).attr(source[name], `${_.last(pathToFiles.split('/'))}/${new FileNameFormatter(linkToResourse.href).resourse()}`);
            return promise;
          },
        },
      ]);
      return task.run();
    })
  );
  const result = Promise.all(promises);
  return result.then(() => $);
};

export default resourseLoad;
