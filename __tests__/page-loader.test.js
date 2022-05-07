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

afterAll(async () => {
  await fs.rm(testDir, { recursive: true, force: true });
});
