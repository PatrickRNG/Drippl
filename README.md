# anti-fraud-crawler

### How to run

1. Run `$ yarn start:client` -> Will start the React app
2. Run `$ yarn start:electron` -> Will start the Electron

### How to build

To build the project and create a runnable package, follow the following steps.

#### Linux

1. Run `$ yarn build` -> To build the React app
2. Run `$ yarn build:electron` -> To copy `electron` and `src/shared` folders to the `build` folder.
3. Run the below command to build the app with Docker (so you don't need to have all the dependencies locally)

```
docker run --rm -ti \
 --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_') \
 --env ELECTRON_CACHE="/root/.cache/electron" \
 --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
 -v ${PWD}:/project \
 -v ${PWD##*/}-node-modules:/project/node_modules \
 -v ~/.cache/electron:/root/.cache/electron \
 -v ~/.cache/electron-builder:/root/.cache/electron-builder \
 electronuserland/builder

```

4. Inside Docker, run `$ yarn && yarn pack:linux`
5. After that, a `release` folder will be created in the project, which will have the app in `AppImage` or `.deb` format

#### Windows

1. Run `$ yarn build` -> To build the React app
2. Run `$ yarn build:electron` -> To copy `electron` and `src/shared` folders to the `build` folder.
3. Run the below command to build the app with Docker (so you don't need to have all the dependencies locally)

```
docker run --rm -ti \
 --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_') \
 --env ELECTRON_CACHE="/root/.cache/electron" \
 --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
 -v ${PWD}:/project \
 -v ${PWD##*/}-node-modules:/project/node_modules \
 -v ~/.cache/electron:/root/.cache/electron \
 -v ~/.cache/electron-builder:/root/.cache/electron-builder \
 electronuserland/builder:wine

```

4. Inside Docker, run `$ yarn && yarn pack:windows`
5. After that, a `release` folder will be created in the project, which will have the app in `AppImage` or `.deb` format
