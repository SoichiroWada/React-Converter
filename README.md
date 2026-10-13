This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Unit conversions use `decimal.js` at 30 significant digits. Display precision
can be selected independently; the input text and calculation results remain
unchanged. See [the complete unit audit and definitions](docs/conversions.md)
for exact factors, comparison quantities, calendar conventions and tests.

Run noninteractive verification with
`CI=true npm test -- --runInBand --watchAll=false`, `npm run lint`, and
`npm run build`. Build/start scripts include compatibility with modern Node's
OpenSSL defaults. `react-scripts` is pinned to 3.4.4 so the development server
avoids loading obsolete SPDY internals on Node 24; React remains version 16.

For local browser testing, run `npm start` and open `http://localhost:3000`.
Stop the development server with `Ctrl+C`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
