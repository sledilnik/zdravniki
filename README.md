# Zdravniki - available doctors in Slovenia

[![Build and deploy (production)](https://github.com/sledilnik/zdravniki/actions/workflows/prod.yml/badge.svg)](https://github.com/sledilnik/zdravniki/actions/workflows/prod.yml)
[![Build and deploy (staging)](https://github.com/sledilnik/zdravniki/actions/workflows/stage.yml/badge.svg)](https://github.com/sledilnik/zdravniki/actions/workflows/stage.yml)
[![Stanje prevoda](https://hosted.weblate.org/widgets/sledilnik/-/zdravniki/svg-badge.svg)](https://hosted.weblate.org/projects/sledilnik/zdravniki/)

## Develop

For setting up development environment locally run:

1. `yarn install`
2. ...TODO

## Data source

See .csv files in the [csv/](https://github.com/sledilnik/zdravniki-data/tree/main/csv) directory of [zdravniki-data](https://github.com/sledilnik/zdravniki-data) repository.

## Translations

We use [Weblate](https://hosted.weblate.org/engage/sledilnik/?component=zdravniki) translation service. Your contributions are welcome.

Current translation status:

[![Stanje prevoda](https://hosted.weblate.org/widgets/sledilnik/-/zdravniki/multi-auto.svg)](https://hosted.weblate.org/projects/sledilnik/zdravniki/)

## Libraries

Notable:

- Map: [Leaflet](https://leafletjs.com/) via [React Leaflet](https://react-leaflet.js.org)
- Internationalisation (i18n): [i18next](https://www.i18next.com/)
- ...TODO...

All used libraries can be seen on [GitHub dependancies](https://github.com/sledilnik/zdravniki/network/dependencies).

## Linting

### CLI Usage

`yarn lint`

If you also want to automatically fix the project errors:

`yarn lint --fix`

### IDE Usage

#### VSCode

Have a look at step 3 of [this article from DigitalOcean](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code)

#### WebStorm

<img width="1157" alt="image" src="https://user-images.githubusercontent.com/142531/144209240-4f93daeb-f945-4e68-aca9-b9c244bc070b.png">

## Genric React App instructions (to be removed or minimized)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
