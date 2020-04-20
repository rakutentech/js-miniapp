# miniapp-build-common

This is the boilerplate for the MiniAppBuild Team.

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of contents

- [miniapp-build-common](#miniapp-build-common)
  - [Table of contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Testing](#testing)
  - [Building](#building)
  - [Export Dockerized App Image as TAR](#export-dockerized-app-image-as-tar)
  - [Import Dockerized App Image from TAR](#import-dockerized-app-image-from-tar)
  - [Flow](#flow)
  - [Custom Environment Variables](#custom-environment-variables)
  - [Code Formatting](#code-formatting)
  - [Naming Convention](#naming-convention)
    - [Branches](#branches)
    - [Commits](#commits)
  - [Branching policy](#branching-policy)
  - [Others](#others)

## Requirements

- If you're a new member **[please read the MiniAppBuild guidelines](https://confluence.rakuten-it.com/confluence/display/ONEAPP/MAB+-+On-boarding+Guide+for+Engineers)**
- Please remember to generate a ssh key pair and upload the public key.
  See https://ghe.rakuten-it.com/settings/tokens or https://ghe.rakuten-it.com/settings/ssh
- Right now we're using node v12.16.1 along npm 6.13.4 (current LTS version). We may use [nvm](https://github.com/nvm-sh/nvm) in the future to set a node version within the project.

## Installation

```
git clone git@github.com:rakutentech/js-miniapp.git
cd js-miniapp
yarn install
yarn sample start
```

## Testing

For test just execute:

`yarn sample test`

## Building

To build the app for production:

`yarn sample build`

The building will be inside the `build` folder on `js-miniapp-sample` root.<br />

## Export Dockerized App Image as TAR

to build and package docker image of the production build:

`yarn sample dockerBuild`

The `poc.tar` file will be generated inside `ci/` directory on `js-miniapp-sample` root.<br/>
**Prerequisite**: [Docker](https://docs.docker.com/) LTS

## Import Dockerized App Image from TAR

to unpackage and run a production build on your local computer:

- Copy `js-miniapp-sample/ci/Makefile` to the `poc.tar` file directory and run

```bash
  make run
```

**Note**: to stop the local docker container run `make stop` on `Makefile` directory.

**Prerequisite**: [Docker](https://docs.docker.com/) LTS

## Flow

- We use [Flow](https://flow.org/) as a static type checker in our App.<br/>
- Add `// @flow` to any files you want to type check (for example, to [src/App.js](src/App.js)).<br/>
- To check the files for type errors: `npm run flow`
- Check Flow integrations for code editors [here](https://flow.org/en/docs/editors/)

## Custom Environment Variables

- Please check to [this document](https://create-react-app.dev/docs/adding-custom-environment-variables/) about Custom Environment Varibles in create-react-app.
- To set **your environment variables** you need to create a file `.env` on the root of your project. This file is on .gitignore, so it'll just be loaded on your machine.
- **All** the environment variables must start with `REACT_APP_` to work.
- To access any variable you must follow this syntax: `process.env.REACT_APP_XXX`
- At this moment we've 3 different files to add environment variables: `.env.development`, `.env.test` and `.env.production`.
- Check this [link](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used) to understand the priority on each available npm script.

## Code Formatting

- The following dev-dependencies have been installed for this purpose: `husky, lint-staged, prettier`
- Whenever we make a commit Prettier will format the changed files automatically.
- You might want to integrate Prettier in your favorite editor as well. Please check the [Prettier Editor Integration](https://prettier.io/docs/en/editors.html).

## Naming Convention

### Branches

- Feature branches: `feature/MINIBUILD-xxxxx_short_description_of_the_feature`
- Bugfix branches: `bugfix/MINIBUILD-xxxxx_short_description_of_the_bugfix`
- Tech branches (mostly for technical tasks): `tech/MINIBUILD-xxxxx_short_description_of_the_task`
- Releases branches: `release/(each project has its own version naming)`

**It's really important to include the JIRA ticket ID! In case a ticket doesn't exist create one (as a tech ticket)**

### Commits

- Each commit should have a meaningful message. It really helps to figure out where some changes are made, even for adding comments and minor modifications.
- Try to make the commits as small as possible and avoid several days of work worth big giant commits.
- _Proposal_: I'd include the JIRA ticket ID on the commit message as well: `git commit -m "MINIBUILD-XXX short description of the commited task"`

## Branching policy

- Pushing directly to master/develop is FORBIDDEN
- All changes made to master/develop should be done through a new dedicated branch and a Pull Request. Pull Requests should be approved by the members of your team
- Tag the commit of released versions using semantic versioning
- Before merging a Pull request, be sure to be up to date and solve any conflicts

Also you can check this _work in progress_ document for branching on the MiniAppBuild Team:

- https://confluence.rakuten-it.com/confluence/display/ONEAPP/Branching+strategy

## Others

- You can have a look at the create-react-app repo [here](https://github.com/facebook/create-react-app)
- Link to MiniApp Build Confluence page [here](https://confluence.rakuten-it.com/confluence/display/ONEAPP/Mini+App+Build)
- Link to MiniApp Platform Confluence page [here](https://confluence.rakuten-it.com/confluence/display/ONEAPP/Mini+App+Platform)
