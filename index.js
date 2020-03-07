/**
 * Token Information.
 *
 * @typedef {Object} TokenInfo
 * @property {string} symbol
 * @property {string} name
 * @property {string} type
 * @property {string} address
 * @property {number} decimals
 */

/** @type {{[key:string]: TokenInfo}} */
const data = require('./tokens.json');

/**
 * Get the token info.
 *
 * @param symbol {string} The token symbol, e.g., USDT, BNB, LINK, etc.
 * @returns {TokenInfo | undefined} The TokenInfo, undefined if not exists
 */
function getTokenInfo(symbol) {
  return data[symbol];
}

module.exports = { getTokenInfo };
