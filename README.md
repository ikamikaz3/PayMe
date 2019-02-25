# Payme

## Overview

This project uses [Expo](https://github.com/expo/expo) platform to build a Native IOS and Android project using Javascript & React.

See [Get Started](https://expo.io/learn) for steps to install `expo-cli` and start building this application

## Dependencies

| Package | Version |
|---|---|
| expo | 32.0.0 |
| prop-types | 15.6.2 |
| react  | 16.5.0  |
| react-native  |  https://github.com/expo/react-native/archive/sdk-32.0.0.tar.gz |
| react-navigation | 2.3.0 |
| react-navigation-redux-helpers | 2.0.0 |
| react-redux | 6.0.0 |
| redux | 4.0.1 |
| redux-logger | 3.0.6 |
| redux-thunk | 2.0.1 |

## Installation

- Install package dependencies :
```
yarn install
```

- Start development server :
```
yarn start
```

## Utils

This project uses eslint and prettier with `airbnb`'s configurations:
```
    // package.json
    "eslint": "^5.12.0",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-config-prettier": "^3.5.0",
    "eslint-plugin-import": "^2.14.0",
    "eslint-plugin-jsx-a11y": "^6.1.2",
    "eslint-plugin-prettier": "^3.0.1",
    "eslint-plugin-react": "^7.12.4",
    "prettier": "^1.15.3"
```

### Run Eslint
```
yarn lint
```
this will fix any error inside `/src`
