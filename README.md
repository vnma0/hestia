Read in : [Vietnamese (tiếng Việt)](doc/README.vi-VN.md)

---

# Hestia
###### the front-end part of MIRAI

### Features 
###### `*` means back-end support must be present
- Account-based submitting & judging (requires created account beforehand) *
  - Test-by-test details available if allowed by server
- Account modification (authentication key changeable) *
- Localization support (currently `en_US` and `vi_VN` is supported)
- Scoreboard (OI and ACM mode supported with auto-updating present) *
- Code editor in-browser backed by Ace with multi-language highlighting & theme support

### Installation
- Hestia is distributed as part of [Wafter](https://github.com/vnma0/wafter), thus you will need to grab a release [there](https://github.com/vnma0/wafter/releases).

### Development setup
- ##### Prerequisites
  Your machine needs the following software installed:
    - Node.js version 9 or above, with Node Package Manager present, all in `$PATH`
    - Git version 2 or above, also in `$PATH`
    - Any other requirements set out by [Create React App](https://github.com/facebook/create-react-app)
- ##### Setting things up
  - Just `git clone` this repository, fire up a terminal and `npm install` all required modules. See [here](https://github.com/facebook/create-react-app#creating-an-app) for any other supported commands.
    - **Note** : this repository uses Git submodules (starting with commit [`078fa99fe64bc4b9d784802b81ea6d7a398258bb`](https://github.com/vnma0/hestia/commit/078fa99fe64bc4b9d784802b81ea6d7a398258bb)). Supply `--recurse-submodules` when you `clone` or do a `git submodule update --init --recursive` if you already `clone`d it and find out the submodule is missing.
  - If you want to have a compiled build, `npm run build` will produce one for you with gzipped version for each compiled file in the output directory.
    - Invoke `npx react-scripts build` manually will not produce a gzipped version. If you already did so, you can produce one with the script located [here](https://github.com/vnma0/hestia/blob/master/scripts/gzip-all.js).

### Contribution
Please use Prettier before committing - `husky` is listed as a dependency, and it will create a pre-commit hook for you, but software has bugs.

Execute `npm run prettilint` to check if you need formatting - if it says so, you can format everything in `src/` at once with `npm run format` or invoke `npx prettier` with [command-line arguments](https://prettier.io/docs/en/cli.html).

### License
Hestia is distributed under the MIT License.
