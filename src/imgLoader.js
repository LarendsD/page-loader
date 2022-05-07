import * as cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import _ from 'lodash';
import FileNameFormatter from './FileNameFormatter.js';

const imageLoad = (response, pathToFiles, url) => {
  const $ = cheerio.load(response.data);
  const arrayOfPromises = ($('img')
    .map((i, el) => {
      const linkToImage = new URL($(el).attr('src'), url.origin);
      if (linkToImage.origin !== url.origin) {
        return null;
      }
      const linkToFile = new FileNameFormatter(linkToImage.href);
      const promise = axios({
        method: 'get',
        url: linkToImage.href,
        responseType: 'stream',
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

export default imageLoad;
