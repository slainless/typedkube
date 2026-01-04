## typedkube

> [!NOTE]
> 🚧 Still WIP. Based on version KubeJS 2101.7.2, MC 1.21.1

Augment [KubeJS](https://kubejs.com/) workspace with opinionated, ready to use typescript setup, fast bundler and correct typing setup (Java-side typing is still WIP).

This setup enables code sharing, ESM support, and limited[^1] Node modules support.

[^1]: [ESM support](#esm-support)

All executed scripts should be in these directories, also support recursive placement:
- `$kubejs_src/scripts/client` -> `kubejs/client_scripts`
- `$kubejs_src/scripts/server` -> `kubejs/server_scripts`
- `$kubejs_src/scripts/startup` -> `kubejs/startup_scripts`

## Node modules support

While ESM support is possible, it is still very limited to what kind of module you can load from node modules.
Specifically, modules that calls for unsupported ECMAScript features such as Intl, Reflect, IntArray, etc. will almost guaranteed not to work. Refer to [ES5 table](https://compat-table.github.io/compat-table/es5/) and [ES6 table](https://mozilla.github.io/rhino/compat/engines.html).

## Bundler and Rhino quirkiness

The current bundler is intentionally configured the way it is, skipping minimization and chunking, since the way Rhino and KubeJS works prevent both bundler features to work as expected.

Also, since chunking is not enabled, so is modul-level memory. Sharing memory between module must be done via global variables, either using KubeJS `globalThis.global` or directly with `globalThis` (refer to `./libs/global.ts` for example how to get global object reference).