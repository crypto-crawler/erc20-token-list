#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { utils } = require('ethers'); // eslint-disable-line import/no-extraneous-dependencies
const stringify = require('json-stable-stringify'); // eslint-disable-line import/no-extraneous-dependencies

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error('Usage: generate <ethereum-lists/src/tokens/eth/>');
  process.exit(0);
}

const erc20Dir = args[0];

/**
 * Validate an ETH address.
 *
 * @param {string} address An ETH address
 * @returns {boolean} True if valie, false if invalid
 */
function isETHAddress(address) {
  try {
    utils.getAddress(address);
    return true;
  } catch (error) {
    return false;
  }
}

/** @type {Object.<string, string>} */
const whitelist = {
  AURA: 'AURA Token',
  BCBC: 'Beercoin',
  BKB: 'BitKeep Token',
  BNC: 'Bionic',
  BOA: 'BOSAGORA',
  BOX: 'BOX Token',
  BTM: 'Bytom',
  BTR: 'Bitether',
  BTT: 'Blocktrade.com',
  CAS: 'Cashaa',
  CDX: 'CDX Network',
  COSS: 'Coss Token',
  CPT: 'Contents Protocol Token',
  CTT: 'CASTWEET TOKEN',
  DRP: 'Dripcoin',
  DTH: 'dether',
  EGT: 'Egretia Token',
  EVN: 'Envion AG',
  EXC: 'Eximchain Token',
  GTC: 'Game.com',
  HOT: 'HoloToken',
  IMT: 'MoneyToken',
  KEY: 'SelfKey',
  KICK: 'KickToken',
  LCT: 'LiquorChain Token',
  LEO: 'Bitfinex LEO Token',
  LG: 'LGame',
  MDS: 'MediShares',
  MESH: 'BlockMesh',
  MTC: 'MTC Mesh Network',
  NCC: 'NeuroChain Clausius',
  NIO: 'Autonio',
  NTK: 'NeuroToken',
  PASS: 'Blockpass',
  PCH: 'POPCHAIN CASH',
  PRO: 'Propy',
  SGT: 'SelfieYo Gold Token',
  SKM: 'Skrumble Network', // TODO: there is a Skrumble Network V2
  SKRP: 'Skraps',
  SMT: 'SmartMesh',
  TEL: 'Telcoin',
  TGT: 'Target Coin',
  TIC: 'Thinschain',
  TICO: 'TICOEX Token',
  TRC: 'Terracoin',
  WOLK: 'Wolk Token',
  YUP: 'YUPIE',
};

const files = fs.readdirSync(erc20Dir);

/** @type {Object.<string, any>} */
const result = {};

files.forEach((file) => {
  const absolutePath = path.join(erc20Dir, file);
  const obj = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));

  if (obj.decimals <= 0 || !obj.address) return;

  if (!isETHAddress(obj.address)) {
    throw new Error(`Invalid ETH address ${obj.address} in file ${absolutePath}`);
  }
  obj.address = utils.getAddress(obj.address);

  if (obj.symbol in result) {
    if (obj.symbol in whitelist) {
      if (obj.name === whitelist[obj.symbol]) {
        result[obj.symbol] = obj;
      } else {
        console.info(`Skipped ${obj.symbol} ${obj.name} in file ${absolutePath}`);
      }
      return;
    }

    throw new Error(`${obj.symbol} already exists, in ${absolutePath}`);
  }
  result[obj.symbol] = obj;
});

console.info('Writing to file tokens.json');
fs.writeFileSync('tokens.json', stringify(result, { space: 2 }));
