import * as cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import _ from 'lodash';
import FileNameFormatter from './FileNameFormatter.js';

const imageLoad = (response, pathToFiles) => {
  const $ = cheerio.load(response.data);
  ($('img')
    .map((i, el) => {
      let linkToImage = $(el).attr('src');
      if (_.startsWith($(el).attr('src'), '/')) {
        linkToImage = `${response.request.protocol}//${response.request.host}${$(el).attr('src')}`;
      }
      const linkToFile = new FileNameFormatter(linkToImage);
      const prom = axios({
        method: 'get',
        url: linkToImage,
        responseType: 'stream',
      })
        .then((resp) => fs.writeFile(path.join(pathToFiles, linkToFile.image()), resp.data))
        .catch(() => null);
      $(el).attr('src', `${pathToFiles}/${linkToFile.image()}`);
      return prom;
    }));
  return $.html();
};

export default imageLoad;
