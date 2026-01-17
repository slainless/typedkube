# typedkube

Augment [KubeJS](https://kubejs.com/) workspace with: 
  - Opinionated, ready to use typescript setup
  - Fast bundler
  - Correct type definitions setup
  - Fully typed KubeJS APIs, directly sourced from runtime Java reflection dumps (Thanks to [KubeJS Offline](https://github.com/Hunter19823/kubejsoffline-core))

This setup also enables code sharing, ESM support, modern ECMAScript languange features[^1], and limited Node modules support[^2].

[^1]: All features that are pure language features and transpilable such as `class`, block scoping, arrow functions, template literals, etc. `Promise` is currently not supported.
[^2]: [Node modules support](#node-modules-support)

## Get started

### Clone this repository

Clone this repository inside MC's root instance, by default should be cloned as `typedkube`:
```
minecraft/
├─ typedkube/
├─ kubejs/
```

Then, install Node dependencies with any package manager.

### KubeJS Offline

This step is optional, but highly recommended to get the full typescript experience. 
To get the full typings support for java APIs, we need to use KubeJS Offline to dump the runtime Java reflection. 
Tooling is provided in this repository to allow JSON extraction from KubeJS Offline's output and to convert them into typescript type definitions.

Follow the instructions in [KubeJS Offline](https://www.curseforge.com/minecraft/mc-mods/kubejs-offline) to install and run KubeJS Offline.
If the setup is successful, there should be a directory `documentation/` and an `index.html` file inside, generated in KubeJS directory.

### Type generation

> [!WARNING]
> This will generate a huge amount of files and may also takes pretty big chunk of storage space depending on the size of the dump.

This requires prior kubejs offline dump to be generated.

To generate the type definitions, run the following command:
```bash
npm run typegen
```

This will generate the full type definitions to `typings/typegen/` directory.

Be warned that this process may or may not takes a while to complete, depending on the size of the dump (linear to how many mods are installed).
It will also generate a huge amount of files depending on how many java packages there are that are discovered from runtime reflection.

The command by default use Deno runtime, but both Bun and Node.js (v22+) runtimes are also supported. 
For Node.js though, the `--experimental-transform-types` flag is probably needed to run the command correctly depending on the Node.js version.

### Develop and build

> [!WARNING]
> During each build cycle, the `kubejs` directory is automatically cleared by the build process.
> Any files that are not located in the `exported/` or `documentation/` directories <ins>will be deleted</ins>.
> 
> Users are responsible for backing up their data before running the build.

Just write any codes in the `scripts/` directory, then run the build script with `npm run build` or `npm run dev`.

## Directory structure

All executed scripts should be in these directories:
```
typedkube/scripts/client    -> kubejs/client_scripts
typedkube/scripts/server    -> kubejs/server_scripts
typedkube/scripts/startup   -> kubejs/startup_scripts
```

For example, script at `typedkube/scripts/server/custom_recipes/create.ts` will output to `kubejs/server_scripts/custom_recipes/create.js`

`typedkube/root` directory will be mapped directly to KubeJS root. All directories placed in this directory will be copied to KubeJS root as-is. For example:
```
typedkube/root/assets       -> kubejs/assets
typedkube/root/config       -> kubejs/config
typedkube/root/data         -> kubejs/data
```

It is possible to insert raw js script in `typedkube/root/xxx_scripts`, essentially bypassing bundler processing.

## Typescript support

This workspace is configured to limit the global variables available based on currently exposed APIs of KubeJS.
The ES5 types definition is provided directly from microsoft's Typescript, minus the unsupported features (mostly browser's features).
All unsupported features are omitted from the type definitions.

Partial ES6 is also provided, following the current implementation of KubeJS's Rhino.

Global variables of KubeJS are fully typed, but will only work if generated type definitions are present.
Refer to [Type generation](#type-generation) for more details.

### Known limitations

1. Lower bounded wildcard type (`? super T`) is not supported. In the typescript side, it is coerced to covariant of the bound (`T`).
2. Wildcard type `?` is coerced to `any` if not fully bounded.
3. Modifiers don't maps well to typescript, so every field member will be considered public from the typescript side. Comments are provided though to hint the original modifier.
4. The mapped inner classes may or may not be symmetrical to the original java classes since this have not been fully tested yet.
5. The overall generated type definitions are not fully tested yet so expect some generation issues, incorrect typings, etc.
6. All java package exports must be referenced using fully qualified name in the typescript side.

## Node modules support

While ESM support is possible, it is still very limited to what kind of module you can load from node modules.
Specifically, modules that calls for unsupported ECMAScript features such as Intl, Reflect, IntArray, etc. will almost guaranteed not to work. Refer to [ES5 table](https://compat-table.github.io/compat-table/es5/) and [ES6 table](https://mozilla.github.io/rhino/compat/engines.html).

## Bundler and Rhino

The current bundler is intentionally configured the way it is, skipping minimization and chunking, since the way Rhino and KubeJS works prevent both bundler features to work as expected.

Also, since chunking is not enabled, so is module-level memory. Sharing memory between module must be done via global variables, either using KubeJS `globalThis.global` or directly with `globalThis` (refer to `./libs/global.ts` for example how to get global object reference).

## Technical details

The boring stuff.

### Type generation implementation

The type generation is implemented from scratch, based on the current KubeJS Offline's output. 
The process involves HTML parsing, JSON extraction, and the type generation itself. 

HTML parsing and JSON extraction is done using `htmlparser2`. 
The process is made to be as efficient as possible by using stream to do both html parsing and json extraction at the same time,
given that the html file size can be pretty large.

Each file is formatted using `dprint` to ensure consistent code style.

Typescript namespaces are used heavily to create consistent java to typescript package mapping. But the tradeoff is, all the exports must
be referenced using fully qualified name.
