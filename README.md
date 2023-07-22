# QuantFrame
Inspired by [Akmayer's Warframe-Algo-Trader](https://github.com/akmayer/Warframe-Algo-Trader), this is a re-implementation using tauri. Tauri allows for easy distribution to windows & linux without technical knowledge.


## Installation
WIP, but will be under the "Releases" sidebar on github.

## Development

This project uses
- [tauri](https://tauri.app): like electron but using a [Rust](https://www.rust-lang.org/) backend and doesn't use Chromium, leading to better performance.
- [pnpm](https://pnpm.io/): due to its faster performance compared to pnpm. (`npm i -g pnpm` or `volta install pnpm`)
- [Solid](https://www.solidjs.com/): and not react do better performance and more intuitive programming model.

### Pre-Requisites

To get started you need to make sure you've installed the [Tauri Pre-requisites](https://tauri.app/v1/guides/getting-started/prerequisites).

If you're using **Windows**, you CANNOT use WSL for this project. You MUST install pre-requisites on windows, not WSL.

### Getting started

```bash
pnpm i # install nodejs dependencies.
pnpm tauri dev # start development server
```
