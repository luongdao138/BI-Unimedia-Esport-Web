# NextJS Typescript Boilerplate

An opinionated boilerplate to kickstart projects using NextJS

**Features**

- 👏🏼 Next 10.2.0 and webpack 5
- 🌊 Custom Document and App
- ⌨️ Type safety using TypeScript
- 💄 Write SCSS & future CSS with PostCSS + preset-env
- 🖊 SVG sprite for icons
- 👀 Lint your code with TSLint & Stylelint
- 🌈 Prettier for consistent code style
- 🔨 Jest + Enzyme for tests
- ☝️ Husky + lint-staged for code quality assurance
- ⚙️ Editorconfig file for consistent indents
- 🗄 Redux with `react-redux` and `redux-thunk` and `redux-toolkit`

## Getting started

Before you can start developing your awesome application you need to install the project's dependencies. Make sure you have Node (14.16.1) and yarn installed and run:

```sh
$ yarn install
$ yarn prepare
```

### ⌨️ Development

Once all dependencies have been installed you can start development. To start a development server on [http://localhost:3000](http://localhost:3000) run:

```sh
$ yarn dev
```

### 🖥 Production

To run your application in production make sure to run a build first:

```sh
$ yarn build
```

And then start you application with a provided port number (defaults to 3000 if not provided):

```sh
$ PORT=8080 yarn start
```

### 🧐 Linters

The boilerplate provides a couple of linters to help you keep an eye on code consistency and type safety. There are three linters: one for CSS, one for TypeScript and one for type safety. You can use each of them separately using the following commands:

```sh
$ yarn type-check
$ yarn lint
$ yarn test
```

**Prettier**

Prettier helps you to enforce consistent (opinionated) code style. If possible, you can tell your editor to format you code when you save a file. If you are not able to do this, you can run prettier manually using:

```sh
$ yarn format
```

### 🤖 Tests

You can write your tests using Jest and Enzyme. You can run all test with the following command

```sh
$ yarn test
```

### SCSS

By default the path `./src/theme/globalcss` is configured as an included path for our scss loader.
This means you can import any of this folder's files directly without the relative or absolute path:

```css
@import 'variables';
@import 'colors';
```

### RULES

1. Components

   1. Keep components small and function-specific
   2. Reusability is important, so keep creation of new components to the minimum required
   3. Use capitals for component names
   4. Keep components simple only works with props and include UI states only no redux no services
      Readmore: https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
   5. Only create functional components with type supported
   6. Arrow functions allowed

2. Redux & Selectors

   1. Use metadata reducers for request and error events.
      Readmore : https://react.christmas/2018/2
   2. Give specific types for reducers states
   3. use selectors when selecting states & make data manipulation inside selectors for clean code

3. Custom hooks

   1. Avoid writing multiple useEffect hooks on pages use custom Hooks instead
      More info: https://mn.reactjs.org/docs/hooks-custom.html
      Use pre-exist hooks https://github.com/rehooks/awesome-react-hooks

4. Handling null and undefined in JavaScript

   Example info:https://medium.com/javascript-scene/handling-null-and-undefined-in-javascript-1500c65d51ae

   Use lodash:

```sh
   _.get would actually return the value if it exists and would return undefined if it does not.
   _.has would check if the value exists and return true if it does and false if it does not.
   _.hasIn would do the same as _.has but would also check if this is an inherited property.
   _.result would actually walk the path and return the value as well but with a major difference ... it would execute any function among the way to get to the value.
```

# Code Editor

## Visual Studio Code

<p align="center">
  <img alt="VS Code in action" src="https://user-images.githubusercontent.com/1487073/58344409-70473b80-7e0a-11e9-8570-b2efc6f8fa44.png">
</p>

### Plugins

You should install these extentions on your VSCODE editor.

1.  -Prettier
2.  -Eslint
