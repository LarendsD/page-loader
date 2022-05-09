import axios from 'axios';
import fs from 'fs/promises';
import { cwd } from 'process';
import path from 'path';
import FileNameFormatter from './FileNameFormatter.js';
import imageLoad from './imgLoader.js';
import linkLoad from './linkLoader.js';
import scriptLoad from './scriptLoader.js';
import ErrorHandler from './ErrorHandler.js';

function pageLoad(url, pathToDir = cwd()) {
  const formattedUrl = new FileNameFormatter(url);
  const samplePath = path.join(pathToDir, formattedUrl.dataDir());
  return fs.mkdir(samplePath)
    .then(() => axios.get(url))
    .then((response) => imageLoad(response, samplePath, new URL(url)))
    .then(($) => linkLoad($, samplePath, new URL(url)))
    .then(($) => scriptLoad($, samplePath, new URL(url)))
    .then((result) => fs.writeFile(path.join(pathToDir, formattedUrl.html()), result.html()))
    .catch((err) => {
      process.exit(console.error(new ErrorHandler(err).message()));
    });
}

export default pageLoad;
