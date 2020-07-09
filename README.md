# lattices-math

## Install

You must have `node` (and `yarn` optional) installed

```shell
yarn
```

## Build

All files are in typescript, to convert them to javascript use:

```shell
yarn build
```
Then all files converted will be in `./dist/` directory.

## Run

This project has no `main` function, but you can run all the implemented functions inside `node repl`:

```shell
    node
    const {default : lattices}  = require('./dist/')
    lattices.genIntBasis(4)
```

Or you can run it without building using `ts-node repl`:

```shell
    ts-node
    import lattices from './src'
    lattices.genIntBasis(4)
```


