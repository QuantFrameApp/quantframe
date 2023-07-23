# Developer Documentation

How the app works, on a technical level.

The app requires you to signin to warframe.market, as the API is a pretty fundamental part of the app.

The first thing the app does is get you to sign into WFM and store the Access Token. This gets stored in the `settings.dat` file, which also stores other info, **but not the user's password** (we only use it once, to sign in).

## Reverse Engineering [Warframe-Algo-Trading](https://github.com/akmayer/Warframe-Algo-Trader) - Notes

The app's main file is [inventoryApi.py](https://github.com/akmayer/Warframe-Algo-Trader/blob/main/inventoryApi.py). This is a fastApi instance

Warframe.market stuff
- [getWFMtoken.py](https://github.com/akmayer/Warframe-Algo-Trader/blob/main/getWFMtoken.py)
- [AccessingWFMarket.py](https://github.com/akmayer/Warframe-Algo-Trader/blob/main/AccessingWFMarket.py)

