export interface TokenInfo {
  symbol: string;
  name: string;
  type: string;
  address: string;
  decimals: number;
}

/**
 * Get the token info.
 *
 * @param symbol The token symbol, e.g., USDT, BNB, LINK, etc.
 * @returns The TokenInfo, undefined if not exists
 */
export declare function getTokenInfo(symbol: string): TokenInfo | undefined;
