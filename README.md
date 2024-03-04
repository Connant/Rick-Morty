
# Rick and Morty Project
Only desktop version

## Overview

The Rick and Morty Project is a React-based web application that leverages the powerful combination of Redux Toolkit for state management, `react-router-dom` for navigation, and Vite as the build tool, offering a modern and efficient development experience. Inspired by the Rick and Morty universe, this application fetches data from the [Rick and Morty API](https://rickandmortyapi.com/) and showcases a sleek UI built with TailwindCSS and advanced JavaScript functionalities with TypeScript.

## Features

- Data fetching from the Rick and Morty API to display characters, episodes, and more.
- Modern React 18 and Redux Toolkit setup for state management.
- Routing with React Router 6.
- Code quality enforcement with ESLint.
- Unit and end-to-end testing with Cypress.
- Custom styling with TailwindCSS and SASS.

## Installation

To get started with the Rick and Morty project, clone the repository and install the dependencies:

```bash
git clone // todo
cd Rick-Morty
npm install
```

## Usage

To run the application in development mode, execute:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

To build the application for production, run:

```bash
npm run build
```

You can preview the production build with:

```bash
npm run preview
```

## Linting

To enforce code quality and consistency, lint your code using:

```bash
npm run lint
```

## Testing

Run end-to-end tests with Cypress using:

```bash
npx cypress open
```

## Architecture

The application follows the Feature-Slice Design (FSD) architecture, ensuring modular and maintainable code structure.
