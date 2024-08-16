# Web Traffic Dashboard

This is the takehome project by [Bilby.ai](https://bibly.ai/) which implements tRPC and an ElasticSearch Database in a SvelteKit project to create a dashboard showing web traffic analytics of various countries.

## Installation

1. Install dependencies with `npm install` (or `pnpm install` or `yarn`).
2. Rename `.env.example` to `.env` and add the env information from this [link](https://share.1password.com/s#_im5DiShEnUuy-6-FXuxfX_7L7_2zyvHqAM4lZBY2Is)
3. Start a development server:

```bash
npm run dev
# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Libraries Used

In addition to the libraries provided in the initial repository, the following libraries have been installed

1. [shadcn-svelte](https://www.shadcn-svelte.com) - The primary UI library for the project
2. [mode-watcher](https://github.com/svecosystem/mode-watcher) - Used in addition with shadcn-svelte to watch for light and dark mode.
3. [lucide-svelte](https://lucide.dev/guide/packages/lucide-svelte) - The primary icon library for the project

## Roadmap

[x] - Build a responsive UI
[x] - Configure color palette for the UI and add dark mode
[ ] - Implement the API calls using an ElasticSearch client
[ ] - Create a Heatmap element and map data into the element
[ ] - Add a loading spinner when the data is being fetched
[ ] - Store preferences in httpCookies to make the form controls across sessions
[ ] - Create a Grouped Bar Chart element and map data into the element
