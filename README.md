<p align="center">
  <img width="350px" src="http://dutchx.readthedocs.io/en/latest/_static/DutchX-logo_blue.svg" />
</p>

# Run Bots - DutchX
This is just a simple project that shows how to run the DutchX bots to ensure
liquidity for any ERC20 token pair list.

To make it easier, we provide a `Docker` image with all the **bots** and a
**CLI**.

Follow through this document to run your own bots and learn how to operate on
the DutchX.

If you follow through, you'll get:

* The liquidity bots, up and running
* You'll known how to fund them so they can operate
* You'll learn how to use the CLI (command line interface)
    * To check the state of the auctions
    * To interact with the DX: Claim, buy, sell, etc.

# Documentation
Checkout the [DutchX Documentation](http://dutchx.readthedocs.io/en/latest).
You can also check how to request a new price feed if you need it
[Adding a price feed](https://dutchx.readthedocs.io/en/latest/bots-price-feed.html)

# Run the bots
An easy way to run the bots is to fork this project, or create a blank one with:
1. The config for the bots
2. The script to run the bots

## 1. Create the config file for the bots
Create a config file for the bots, like the one in
[conf/bots.js](./conf/bots.js), where:

* `MARKETS`: List of the ERC20 token pairs you want the bots to watch.
  * Format: `<token1>-<token2>[,<tokenN>-<tokenM>]*`
  * Example: `WETH-RDN,WETH-OMG`
  * It's important that for every distinct token provided, you also provide the
  address, the can be passed either in the config file or as ENV_VAR:
  * **WETH_TOKEN_ADDRESS**: `0xc58b96a0278bd2c77bc93e01b148282fb8e753a5`
  * **RDN_TOKEN_ADDRESS**: `0x3615757011112560521536258c1e7325ae3b48ae`
  * **OMG_TOKEN_ADDRESS**: `0x00df91984582e6e96288307e9c2f20b38c8fece9`
* `MAIN_BOT_ACCOUNT`:
  * Select the main bot account (account index of the ones generated from the `MNEMONIC`)
  * The main bot account that will be used to generate reports
* `BUY_LIQUIDITY_BOTS`:
  * **name**: The name to display in notifications and messages
  * **markets**: An object selecting the markets to watch (explained above)
  * **accountIndex**: The accountIndex from the accounts generated from the `MNEMONIC` that is going to be used by this bot
  * **rules**: The rules to indicate the bot when to do buys
  * **notifications**: The notification system to be used by the bot. For now only `slack` is available
* `SELL_LIQUIDITY_BOTS`: Same parameters as `BUY_LIQUIDITY_BOTS` except the don't need **rules**

WARNING: If you create a new file for your configuration make sure you update [base-command](./base-command#L24) in order to use your own configuration.


## 2. Create the run script
You can create a copy of [base-command](./base-command) script.

Fill the environment variables in `base-command` with your own configuration:

* `MNEMONIC`:
  * Use your secret BIP39 mnemonic.
  * The bot address will be the first
account generated by that mnemonic.
* `ETHEREUM_RPC_URL`:
  * Url for a Ethereum node
  * You can use your own node or setup infura for example:
  `https://rinkeby.infura.io`
* `MARKETS`: List of the ERC20 token pairs you want the bots to watch.
  * Format: `<token1>-<token2>[,<tokenN>-<tokenM>]*`
    * Example: `WETH-RDN,WETH-OMG`
  * It's important that for every distinct token provided, you also provide the
    addresses, in the case of the previous example:
    * **WETH_TOKEN_ADDRESS**: `0xc58b96a0278bd2c77bc93e01b148282fb8e753a5`
    * **RDN_TOKEN_ADDRESS**: `0x3615757011112560521536258c1e7325ae3b48ae`
    * **OMG_TOKEN_ADDRESS**: `0x00df91984582e6e96288307e9c2f20b38c8fece9`
* `NODE_ENV`:
  * Optional, `local` is the default
  * Can be one of the following: `local`, `dev`, `pre` or `pro`

WARNING: If you create a new `base-command` file make sure you change the name in [bots](./bots#L3)

Once you have it ready you can run `./bots`.

When you run it for the first time, you should see something similar to:

![alt text](./docs/img/run-docker.png "Run the bots with docker")

Don't worry for now about the **WARN** message shown at the bottom, we'll deal
with it in the **Fund the bots** section.

This script will:

* Start **3** bots that will ensure the liquidity: `SellLiquidityBot`,
`BuyLiquidityBot` and `BalanceBot` (more info about these bots in
[DutchX Bots](./docs/bots.md)
)
* Runs a simple API server that exposes basic information:
[http://localhost:8081]()

# Fund the bots
The bots automatically participate in the auctions performing bids and asks when
the time is right.

In order to do this bids and asks, they need to have a balance in the `DutchX`
smart contract.

For founding the bots, we need to know their Ethereum address, this is
determined by the secret mnemonic you've used to run the bots.

An easy way to know the address is just to visit the about endpoint:

* [http://localhost:8081]()

You should see among other information, the accounts used by the bots:

![alt text](./docs/img/bot-account.png "Get the account of the bots")

Once you have the **bot account**, your **secret mnemonic** and the
**bots running**, you are all set for the funding.

> The easiest way is to use the **DutchX CLI**.
>
> Check out the **Deposit** section in [https://github.com/gnosis/dx-cli](https://github.com/gnosis/dx-cli)

# DutchX CLI (Command Line Interface)
In the docker image, it's also available a CLI, with some basic operations for
using the DutchX.

You can use it for getting the state of a token pair, or to trade in an auction
among other things.

> Checkout the CLI documentation to learn how to use it.
> * [https://github.com/gnosis/dx-cli](https://github.com/gnosis/dx-cli)

This sample project also provides a simple [CLI script](./cli) you can use.

## State of a DutchX Auction
There's a basic command in the CLI that is very helpful to get the state of the
auctions.

**Example: Get the state of the WETH-RDN aution**
```bash
./cli state WETH-RDN
```

We would get something similar to:

![alt text](./docs/img/state-of-auction.png "State of an auction")


> For other methods, or to learn how to use the CLI go to:
> * [DutchX Cli page](./docs/cli.md)

# DutchX Bots
There are 3 bots:

* `SellLiquidityBot`
* `BuyLiquidityBot`
* `CheckBakanceBot`

Find out more about them in:
* [DutchX Bots page](./docs/bots.md)

# Debug
To increase the debug level, you can change the bot script to run with
`run bots-dev` instead of `run bots`.

> Don't forget to change it back for the production script.
