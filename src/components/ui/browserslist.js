
// This file contains the browserslist configuration for the project
// It will be used by tools like autoprefixer, babel, etc.
export const browserslistConfig = {
  production: [
    '>0.2%',
    'not dead',
    'not op_mini all'
  ],
  development: [
    'last 1 chrome version',
    'last 1 firefox version',
    'last 1 safari version'
  ]
};

// Run this command to update browserslist database:
// npx update-browserslist-db@latest
