# babel-plugin-git-info

A babel plugin that substitutes environment variables with git commit informations.

## Installation

Use yarn:

```shell
yarn add babel-plugin-git-info --dev
```

or npm:

```shell
npm install babel-plugin-git-info --save-dev
```

## Usage

### Via .babelrc (Recommended)

#### .babelrc

Without options:

```json
{
  "plugins": [
    "babel-plugin-git-info"
  ]
}
```

With options:

```json
{
  "plugins": [
    ["babel-plugin-git-info", { "hashLength": 10 } ]
  ]
}
```

### Via CLI

```shell
babel --plugins babel-plugin-git-info script.js
```

### Via Node API

```js
require("@babel/core").transform("code", {
  plugins: ["babel-plugin-git-info"]
});
```

## Options

### `hashLength`

`number`, defaults to `-1`, which remain the full length of commit hash.
