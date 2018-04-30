# Dutch X Bots
When we start the application, it will start also 3 bots.

Every bot is createad with one goal, so once they are up, the will try to do 
their job.

# Sell Liquidity Bot
This bot will make sure we meet the minimun liquidity required
by the smart contract for the auction to start.

In other words, it makes sure the auction starts automatically filling the 
missing sell volume.

The smart contract won't start the auction, unless we have more than
`$1.000` woth of the sell token.

# Buy Liquidity Bot
This bot will make sure the auction closes when we reach the market price.

If nobody bids when the auction is on the market price, the price will continue
to go down, and eventually, after 24h, could get to 0.

To avoid this situation, the buy bot will buy automatically when the token price
is at a right price.

## How does the bot know what is the market price?
Right now the buy bot can check in any of these exchanges:

* binance
* huobi
* kraken
* bitfinex

Depending on the token pair, we can configure an strategy for getting the 
market price.

## Strategies for getting the price
The current strategy implemented by the bots is called `sequence`, but more
strategies could be implemented for future versions.

For example, we could configure the bots with the following strategies:
```js
const EXCHANGE_PRICE_FEED_STRATEGIES_DEFAULT = {
  strategy: 'sequence', // TODO: More strategies can be implemented. i.e. averages, median, ponderated volumes, ...
  feeds: ['binance', 'huobi', 'kraken', 'bitfinex']
}

const EXCHANGE_PRICE_FEED_STRATEGIES = {
  'WETH-OMG': {
    strategy: 'sequence',
    feeds: ['binance', 'huobi', 'bitfinex']
  },
  'WETH-RDN': {
    strategy: 'sequence',
    feeds: ['huobi', 'binance', 'bitfinex']
  }
}
```

For the `sequence` strategy we can define a sorted list of the exchanges we want
to use for getting the price.

The buy bot will try to get the price from the first exchange, if it's down or 
unresponsive, it will try to get the price from the second one, and so on.

The idea is to pick the order using first the most trusted exchanges, for 
example we could use the trade volume to help us decide.

## Buy liquidity rules
Another important part of the buy liquidity bot, is the buy rules.

These riles allow the bot to decide how much they should buy, and in what 
pricise moment.

For example, we could define these rules:
* Ensure that `1/3` of the sell volume is bought when the **price equals the 
market price**.
* Ensure that `2/3` of the sell volume is bought when the **price is 2% below
the market price**.
* Ensure that the wholesell volume is bought when the **price is 4% below
the market price**.

This rules can be specified using this configuration:

```js
const BUY_LIQUIDITY_RULES = [
  // Buy 1/3 if price equals market price
  {
    marketPriceRatio: {
      numerator: 1,
      denominator: 1
    },
    buyRatio: {
      numerator: 1,
      denominator: 3
    }
  },

  // Buy 2/3 if price falls below 98%
  {
    marketPriceRatio: {
      numerator: 98,
      denominator: 100
    },
    buyRatio: {
      numerator: 2,
      denominator: 3
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
```

# CheckBalanceBot
The liquidity bots are very useful, but in order to operate, the need to have
enough tokens to perform the bids and asks, and also some Ether so they can 
pay the gas costs for the transactions.

This bot will check periodically the balances for the bots and will show a 
warning message when we are below the defined theshold.

> In the future, we will provide a way to send the notification using Slack or 
> mail.

# Balance thresholds
For example, the rules could be:
* `$5000` worth of any tokens
* `0.4 Ether`

So we would have this configuration:
```js
const MINIMUM_AMOUNT_IN_USD_FOR_TOKENS = 5000 // $5000
const MINIMUM_AMOUNT_FOR_ETHER = 0.4 * 1e18 // 0.4 Ether
````