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

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ELASTIC_SEARCH_CLOUD_ID`

`ELASTIC_SEARCH_API_KEY`

`ELASTIC_SEARCH_INDEX`

## Libraries Used

In addition to the libraries provided in the initial repository, some essential libraries have been installed libraries have been installed

1. [shadcn-svelte](https://www.shadcn-svelte.com/) - A tailwind component library for Svelte
2. [mode-watcher](https://github.com/svecosystem/mode-watcher) - A dark/light mode theme manager for Svelte.
3. [d3](d3js.org/) - A data-visualization library for javascript.
4. [lucide-svelte](lucide.dev/guide/packages/lucide-svelte) - A library for icons.
5. [svelte-persisted-store](https://github.com/joshnuss/svelte-persisted-store) - A svelte library to sync the stores with LocalStorage.

## Features

This project features a fullstack SvelteKit application with the following features -

1. typesafe tRPC calls to the Elasticsearch database.
2. Parsing of the Elasticsearch response in the backend.
3. Heatmap generation using d3.js
4. Persistent user preferences in LocalStorage.
5. Dark and light mode support.
6. Accessibility support using shadcn components.

## API Reference

#### Get unique visitors

```trpc
  trpc.uniqueVisitors.getUniqueVisitorsByCountry.query({initialDate, finalDate})
```

| Parameter     | Type     | Description                                                 |
| :------------ | :------- | :---------------------------------------------------------- |
| `initialDate` | `string` | **Required**. Initial date in ISO 8601 format for the query |
| `finalDate`   | `string` | **Required**. Initial date in ISO 8601 format for the query |

## Tech Stack

**Client:** SvelteKit, Tailwind, Typescript, shadcn-svelte, lucide-icons, d3

**Server:** SvelteKit, Typescript, tRPC, Elasticsearch DB, DQL
