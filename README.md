# erc20-token-list

List of all ERC20 tokens. This library is forked from [ethereum-lists/src/tokens/eth/](https://github.com/MyEtherWallet/ethereum-lists/tree/master/src/tokens/eth)

## How to use

```javascript
/* eslint-disable import/no-unresolved,no-console */
const { getTokenInfo } = require('erc20-token-list');

console.info(getTokenInfo('USDT'));
```

## API Manual

There is only one API in this library:

```typescript
/**
 * Get the token info.
 *
 * @param symbol The token symbol, e.g., USDT, BNB, LINK, etc.
 * @returns The TokenInfo, undefined if not exists
 */
export declare function getTokenInfo(symbol: string): TokenInfo;
```

Which returns an `TokenInfo`:

```typescript
export interface TokenInfo {
  symbol: string;
  name: string;
  type: string;
  address: string;
  decimals: number;
}
```

## Quick Start

```bash
npx erc20-token-list USDT
```
