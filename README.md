# Sensor manager UI

Sensor management webapp, which is a FE application for [Sensor manager API](https://github.com/HPCMonitoring/sensor-manager).

Visit our [documentation](https://hpcmonitoring.github.io/docs) for more details.

## Prerequisites

- `node` v18.13.0
- `npm` 8.19.3

## How to start

Install dependencies:

```bash
yarn install
```

Start project:

```bash
yarn dev
```

## Project structure

```py
📦src
 ┣ 📂assets                     # All assets such as jpg, svg, icon ... goes here
 ┣ 📂configs                    # App envs and configuration
 ┣ 📂constants                  # Constants and enums
 ┣ 📂components                 # Reusable components across the web page
 ┣ 📂interfaces                 # Interfaces of class, function ...
 ┣ 📂pages                      # Screen components
 ┣ 📂types                      # Types for variables, objects ...
 ┣ 📜App.tsx                    # App component
 ┗ 📜main.tsx                   # Program entry
```

## Project configurations

### Code linting & formating

We use [`eslint`](https://eslint.org/) to find and fix problem in code, such as:

- Unused variables
- Use `var` declaration
- Loosely comparation using `==`
- ...

You can run this command to test eslint script:

```bash
yarn lint
```

To maintain only one style coding across members, we use [`prettier`](https://prettier.io/). Try:

```bash
yarn format
```

You don't need to run these scripts regularly or before commiting code. They are run automatically before `git commit` command by setting as a precommit script. In some circumstances, precommit script is not enabled by default, just type two commands below to fix it:

```bash
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

For a tip, two plugins above could be installed in `VSCode` as extensions.

### Barrelsby & Path alias

```py
............
 ┣ 📂controllers
 ┃ ┗ 📜user.ctrler.ts
 ┣ 📂routes
 ┃ ┗ 📜user.route.ts
 ┣ 📂schemas
 ┃ ┣ 📂in
 ┃ ┃ ┣ 📜ids.schema.ts
 ┃ ┃ ┣ 📜user.schema.ts
 ┃ ┃ ┗ 📜index.ts
............
```

Imagine you are in `user.ctrler.ts` and want to import `ASchema` from `ids.schema.ts`. The code can be like this:

```typescript
import { ASchema } from '../schemas/in/ids.schema.ts'
```

The more nested folders, the more bad looking importation. It is waste time to guess how many `..` should be put in relative path.

The solution is [`barrelsby`](https://www.npmjs.com/package/barrelsby) and **path alias**. With configurations in `.barrelsby.json`, barrelsby can import your entire code base in a specific folder, and re-export them in `index.ts` file.

Try this:

```bash
yarn barrels
```

To avoid using many `..` in relative path, config path alias in `tsconfig.json`. See the guideline [here](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping).

## Git working culture

- For every updates, DO NOT push directly to `master` branch. Create a new branch, commit, publish branch and create a pull request (PR) instead.
- A branch should have prefix `features/` for a feature update, prefix `hotfixes/` for a hotfix, `improvs/` for an improvement ...
- A PR should be small enough to review. To split a large PR, use [stacked PRs](https://blog.logrocket.com/using-stacked-pull-requests-in-github/).
