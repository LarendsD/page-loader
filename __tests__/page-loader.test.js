/* eslint-disable jest/no-conditional-expect */
import fs from 'fs/promises';
import path from 'path';
import nock from 'nock';
import os from 'os';
import pageLoad from '../src/index.js';

let beforeFile;
let afterFile;
let testDir;

beforeAll(async () => {
  testDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
  beforeFile = await fs.readFile('./__fixtures__/ru-hexlet-io-courses.html', 'utf-8');
  afterFile = await fs.readFile('./__fixtures__/ru-hexlet-io-coursesComplete.html', 'utf-8');
});

test('pageLoadAndImageLoad', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, beforeFile);
  await pageLoad('https://ru.hexlet.io/courses', testDir);
  const html = await fs.readFile(path.join(testDir, 'ru-hexlet-io-courses.html'), 'utf-8');
  expect(html).toBe(afterFile);
});

test('when the filepath fails', async () => {
  await expect(pageLoad('https://ru.hexlet.io/courses', '/undefined')).rejects.toThrow('Access Error! Please, check your output directory and rights to this directory!');
});

test('when the url fails', async () => {
  nock('https://ru.hexlet.io')
    .get('/courfault')
    .replyWithError({
      response: {
        status: 404,
        statusText: 'Not Found',
      },
      config: {
        url: 'https://ru.hexlet.io/courfault',
      },
    });
  await expect(pageLoad('https://ru.hexlet.io/courfault', testDir)).rejects.toThrow('Error 404 Not Found with https://ru.hexlet.io/courfault');
});

afterAll(async () => {
  await fs.rm(testDir, { recursive: true, force: true });
});
