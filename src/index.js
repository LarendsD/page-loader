import axios from 'axios';
import fs from 'fs/promises';
import { cwd } from 'process';
import path from 'path';
import FileNameFormatter from './FileNameFormatter.js';
import imageLoad from './imgLoader.js';

function pageLoad(url, pathToDir = cwd()) {
  const formattedUrl = new FileNameFormatter(url);
  const samplePath = path.join(pathToDir, formattedUrl.dataDir());
  const resu = fs.mkdir(samplePath)
    .then(() => axios.get(url))
    .then((response) => imageLoad(response, formattedUrl.dataDir()))
    .then((result) => fs.writeFile(path.join(pathToDir, formattedUrl.html()), result));
  return resu;
}

export default pageLoad;
