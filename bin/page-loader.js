#!/usr/bin/env node
import { Command } from 'commander';
import pageLoad from '../src/index.js';

const pageLoader = new Command();

pageLoader
  .description('Page loader utility.')
  .argument('<url>')
  .option('-V, --version', 'output the version number')
  .helpOption('-h, --help', 'display help for command')
  .option('-o, --output [dir]', 'output dir', process.cwd())
  .action(async (url, option) => {
    console.log(await pageLoad(url, option.output));
  });

pageLoader.parse(process.argv);

export default pageLoader;
