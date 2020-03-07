#!/usr/bin/env node
const { getTokenInfo } = require('./index');

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error(`Usage: ${process.argv[1]} <symbol>`);
  process.exit(0);
}

console.info(getTokenInfo(args[0]));
