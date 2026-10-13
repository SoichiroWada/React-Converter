Unit converter built with React 19, React Router 8 and [Vite](https://vite.dev/).
Requires Node ^22.22 or ≥24.15 (developed on Node 24.21.0 / npm 12.1.0).

Unit conversions use `decimal.js` at 30 significant digits. Display precision
can be selected independently; the input text and calculation results remain
unchanged. See [the complete unit audit and definitions](docs/conversions.md)
for exact factors, comparison quantities, calendar conventions and tests.

Run noninteractive verification with `npm test -- --run`, `npm run lint`, and
`npm run build`.

For local browser testing, run `npm run dev` (or `npm start`) and open
`http://localhost:3000`. Stop the development server with `Ctrl+C`.

## Available Scripts

In the project directory, you can run:

### `npm run dev` / `npm start`

Runs the app in development mode with hot module replacement at
[http://localhost:3000](http://localhost:3000).

### `npm test`

Runs Vitest in watch mode. Add `-- --run` to run the suite once.

### `npm run lint`

Checks the project with ESLint (`eslint.config.js`).

### `npm run build`

Builds the app for production into the `build` folder, which Firebase Hosting
(`firebase.json`) and `server.js` serve.

### `npm run preview`

Serves the production build locally for a final check.

## Learn More

- [Vite documentation](https://vite.dev/guide/)
- [React documentation](https://react.dev/)
- [React Router documentation](https://reactrouter.com/)
