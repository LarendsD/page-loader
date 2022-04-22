import fs from 'fs/promises';
import path from 'path';
import nock from 'nock';
import os from 'os';
import _ from 'lodash';
import pageLoad from '../src/index.js';

const pathToTmpFile = path.join(os.tmpdir(), 'ru-hexlet-io-courses.html');

beforeAll(async () => {
  await fs.unlink(pathToTmpFile).catch(_.noop);
});

test('pageLoaderGet', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, 'Response success!');
  await pageLoad('https://ru.hexlet.io/courses', os.tmpdir());
  const result = await fs.readFile(pathToTmpFile, 'utf-8');
  const expected = 'Response success!';
  expect(result).toBe(expected);
});
