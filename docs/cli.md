# DutchX Cli (Command Line Interface)
In the docker image, it's also avaliable a CLI, with some basic operations for 
using the DutchX.

You can use it for getting the state of a token pair, or to trade in an auction
among other things.

## Create a script for the cli
It's simpler to use, if we just create a basic script.

You can use [this one](../cli) as a template.

> Remember to grant it with execution permissions:
>
> `chmod +x ./cli`

## Get started with the cli

To check that the script is working, run the `version` command:
```bash
./cli --version
```

You should get the version of the CLI.

To get a complete list of the operations, use the help:

```bash
./cli -h
```

You will get the list of commands and the syntax for them:

```bash
Commands:
  cli.js state <token-pair>                          Get the state for a given pair (i.e. WETH-RDN)
  cli.js price <token-pair>                          Get the current price for a token pair
  cli.js market-price <token-pair>                   Get the market price for a token pair
  cli.js closing-prices <token-pair> [count]         Get the closing prices for a given pair (i.e. WETH-RDN)
  cli.js seller-balances <token-pairs>               Get the seller balances for the las auctions (i.e. claimable-tokens WETH-RDN,WETH-OMG)
  cli.js claimable-tokens <token-pairs> [count]      Get the claimable tokens for a list of token pair (i.e. claimable-tokens WETH-RDN,WETH-OMG)
  cli.js send <amount> <token> <account>             Send tokens to another account
  cli.js deposit <amount> <token>                    Deposit the DX account depositing tokens into it
  cli.js buy <amount> <token-pair> [auction-index]   Buy in a auction for a token pair
  cli.js sell <amount> <token-pair> [auction-index]  Sell in a auction for a token pair
  cli.js sell-liquidity <token-pair>                 Ensure the sell liquidity for a token pair
  cli.js buy-liquidity <token-pair>                  Ensure the buy liquidity for a token pair
```

There's many operations, and more to come, we will show here just some of them.

## State
Shows the of a token pair.

It displays a lot of useful information, like:
* State: `Running` or `Waiting for funding`
* Auction Index
* Start time
* Time when we will reach the theoretical market price (6h aprox)
* Total volumes (buy, sell)
* Bought percentage from the sell volume

For example, to get the state of the `WETH-RDN` token pair:

```bash
./cli state WETH-RDN
```

## Deposit
Allows you to deposit tokens in the DutchX, so you have balance to operate on 
it.

To fund the bots, it's important to use this function. 

This operation does two things:
* It invokes the `approve` operation of the ERC20 token to allow the DutchX 
contract to use the funds for the specified amount.
* It invokes the `deposit` operation of the DutchX contract, so the contract
adds the tokens into the user's balance.

There's a special consideration if the token is `WETH` (Wrapped Ether).
* If the token is WETH, it will check if the user has enough balance on the 
ERC20 token to invoke the `approve` function, if it doesn't it will wrap ether
automatically (just the amount that is missing).


For example, to deposit `0.8 WETH` and `1500 RDN`:

```bash
./cli deposit 0.8 WETH
./cli deposit 1500 RDN
```

## Market price
Get the market price for a token pair.

For example, to show the current market price for `WETH-RDN` pair:

```bash
./cli market-price WETH-RDN
```

## Sell
Allows to create a ask operation in an auction.

For example, to be a seller in `WETH-RDN` with `1.2 ETH` we can execute:

```bash
./cli sell 1.2 WETH-RDN
```

## Buy
Allows to create a bid operation in an auction.

For example, to be a bider in `WETH-RDN` with `500 RDN` we can execute:

```bash
./cli buy 12 WETH-RDN
```
