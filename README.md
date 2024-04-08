# CrossRoads Group Take Home Project

This app displays the commit history for a GitHub repository.

## Features

- Displays commits in a list view similar to GitHub
- Paginated fetching of commits from GitHub API
- Clickable SHA and author links to GitHub
- Responsive design with Tailwind CSS

## Usage

The app is currently hardcoded to show commits for `gabrielalao/crossroads-gabriel` repo. 

To run locally:
```sh
npm install
npm run dev
```

## Implementation

- Created reusable `Commits` component to display commit list
- Fetch commits from GitHub API in `useCommits` hook
- Use React Query for caching and pagination 
- TypeScript types for commit response
- Tailwind CSS for styling