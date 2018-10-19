// Markets
const DEFAULT_GAS_PRICE_USED = 'fast' // safeLow, average, fast
const MARKETS = [
  { tokenA: 'WETH', tokenB: 'RDN' }
]

// Token addresses
const TOKEN_ADDRESSES = {
  WETH_TOKEN_ADDRESS: '0xc58b96a0278bd2c77bc93e01b148282fb8e753a5',
  RDN_TOKEN_ADDRESS: '0x3615757011112560521536258c1e7325ae3b48ae'
}

// Buy bot rules
const BUY_LIQUIDITY_RULES_DEFAULT = [
  // Buy 1/2 if price falls below 99%
  {
    marketPriceRatio: {
      numerator: 99,
      denominator: 100
    },
    buyRatio: {
      numerator: 1,
      denominator: 2
    }
  },

  // Buy the 100% if price falls below 96%
  {
    marketPriceRatio: {
      numerator: 96,
      denominator: 100
    },
    buyRatio: {
      numerator: 1,
      denominator: 1
    }
  }
]

// Buy bots
const MAIN_BOT_ACCOUNT = 0
const BUY_LIQUIDITY_BOTS = [{
  name: 'Main buyer bot',
  markets: MARKETS,
  accountIndex: MAIN_BOT_ACCOUNT,
  rules: BUY_LIQUIDITY_RULES_DEFAULT,
  notifications: [{
    type: 'slack',
    channel: '' // If none provided uses SLACK_CHANNEL_BOT_TRANSACTIONS
  }],
  checkTimeInMilliseconds: 10 * 1000 // 60s
}]

// Sell Bots
const SELL_LIQUIDITY_BOTS = [{
  name: 'Main seller bot',
  markets: MARKETS,
  accountIndex: MAIN_BOT_ACCOUNT,
  notifications: [{
    type: 'slack',
    channel: '' // If none provided uses SLACK_CHANNEL_BOT_TRANSACTIONS
  }],
  checkTimeInMilliseconds: 60 * 1000 // 60s
}]

const EXCHANGE_PRICE_FEED_STRATEGIES_DEFAULT = {
  strategy: 'sequence', // TODO: More strategies can be implemented. i.e. averages, median, ponderated volumes, ...
  feeds: ['binance', 'huobi', 'kraken', 'bitfinex']
}

const EXCHANGE_PRICE_FEED_STRATEGIES = {
  'WETH-RDN': {
    strategy: 'sequence',
    feeds: ['huobi', 'binance', 'bitfinex']
  }
}


// Bots API Port
BOTS_API_PORT = 8081

module.exports = {
  // Market and tokens
  MARKETS,
  ...TOKEN_ADDRESSES,
  DEFAULT_GAS_PRICE_USED,

  // Bot config
  MAIN_BOT_ACCOUNT,
  BUY_LIQUIDITY_RULES_DEFAULT,
  BUY_LIQUIDITY_BOTS,
  SELL_LIQUIDITY_BOTS,
  BOTS_API_PORT,

  // Price feed config
  EXCHANGE_PRICE_FEED_STRATEGIES_DEFAULT,
  EXCHANGE_PRICE_FEED_STRATEGIES,
}
