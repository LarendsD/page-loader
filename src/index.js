import axios from 'axios';
import fs from 'fs/promises';
import { cwd } from 'process';
import fileNameBuilder from './fileBuilder.js';

async function pageLoad(url, pathToDir = cwd()) {
  const fullPath = `${pathToDir}/${fileNameBuilder(url)}`;
  await axios.get(url)
    .then((response) => fs.writeFile(fullPath, response.data));
  return fullPath;
}

export default pageLoad;
