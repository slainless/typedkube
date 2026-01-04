# typedkube

> [!NOTE]
> 🚧 KubeJS type definitions are still WIP. Based on version KubeJS 2101.7.2, MC 1.21.1

Augment [KubeJS](https://kubejs.com/) workspace with opinionated, ready to use typescript setup, fast bundler and correct type definitions setup.

This setup enables code sharing, ESM support, modern ECMAScript languange features[^1], and limited Node modules support[^2]. 

[^1]: All features that are pure language features and transpilable such as `class`, block scoping, arrow functions, template literals, etc. `Promise` is currently not supported.
[^2]: [Node modules support](#node-modules-support)

## Get started

> [!WARNING]
> Make backup of the existing KubeJS directory. KubeJS directory will be cleared for every build cycle except `exported` and `documentation` directory.

Clone this repository inside MC's root instance, by default should be cloned as `typedkube`:
```
minecraft/
├─ typedkube/
├─ kubejs/
```

Install Node dependencies with any package manager, then run the build script with `npm run build` or `npm run dev`.

## Directory structure

All executed scripts should be in these directories:
```
- typedkube/scripts/client  -> kubejs/client_scripts
- typedkube/scripts/server  -> kubejs/server_scripts
- typedkube/scripts/startup -> kubejs/startup_scripts
```

For example, script at `typedkube/scripts/server/custom_recipes/create.ts` will output to `kubejs/server_scripts/custom_recipes/create.js`

`typedkube/root` directory will be mapped directly to KubeJS root. All directories placed in this directory will be copied to KubeJS root as-is. For example:
```
- typedkube/root/assets`  -> kubejs/assets
- typedkube/root/config`  -> kubejs/config
- typedkube/root/data`    -> kubejs/data
```

It is possible to insert raw js script in `typedkube/root/xxx_scripts`, essentially bypassing bundler processing.

## Typescript support

This workspace is configured to limit the global variables available based on currently exposed APIs of KubeJS.
The ES5 types definition is provided directly from microsoft's Typescript, minus the unsupported features (mostly browser's features).
All unsupported features are omitted from the type definitions.

Partial ES6 is also provided, following the current implementation of KubeJS's Rhino.

KubeJS type definitions will be added gradually, following my own needs.

## Node modules support

While ESM support is possible, it is still very limited to what kind of module you can load from node modules.
Specifically, modules that calls for unsupported ECMAScript features such as Intl, Reflect, IntArray, etc. will almost guaranteed not to work. Refer to [ES5 table](https://compat-table.github.io/compat-table/es5/) and [ES6 table](https://mozilla.github.io/rhino/compat/engines.html).

## Bundler and Rhino quirkiness

The current bundler is intentionally configured the way it is, skipping minimization and chunking, since the way Rhino and KubeJS works prevent both bundler features to work as expected.

Also, since chunking is not enabled, so is module-level memory. Sharing memory between module must be done via global variables, either using KubeJS `globalThis.global` or directly with `globalThis` (refer to `./libs/global.ts` for example how to get global object reference).