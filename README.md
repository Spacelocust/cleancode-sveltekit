# Clean code SvelteKit

Clean code project for ESGI with SvelteKit.

## Content

- [Clean code SvelteKit](#clean-code-sveltekit)
  - [Content](#content)
  - [Launch the project](#launch-the-project)
  - [Using a different API](#using-a-different-api)
  - [Libraries](#libraries)
  - [Services](#services)
  - [Makefile commands](#makefile-commands)
  - [E2E tests](#e2e-tests)

## Launch the project

Launch the project using the `make start` command. You can then stop and relaunch the project using the `make stop` and `make up` commands.

You can view the project on [http://localhost:5173](http://localhost:5173).
The database UI is available on [http://localhost:8080](http://localhost:8080).

## Using a different API

To change the API used by the project, you can change the `API_HOST_PREFIX` variable in a new `.env.local` file.
By default, the API used is the project's API (`/api`).

```env
API_HOST_PREFIX=http://localhost:9999/api
```

## Libraries

Librairies, frameworks and tools used in this project.

- [SvelteKit](https://kit.svelte.dev)
- [TailwindCSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Biome](https://biomejs.dev)
- [DrizzleORM](https://orm.drizzle.team/)
- [Docker](https://www.docker.com)
- [Playwright](https://playwright.dev)
- [shadcn-svelte](https://www.shadcn-svelte.com)
- [Bun](https://bun.sh)
- [Vite](https://vitejs.dev)
- [PostCSS](https://postcss.org)

## Services

Services used by the `compose.yml` file.

- `svelte-kit` : The SvelteKit service. Container name : `cc-app`.
- `mariadb` : The MariaDB service. Container name : `cc-mariadb`.
- `phpmyadmin` : The PHPMyAdmin service. Container name : `cc-phpmyadmin`.

## Makefile commands

Many commands are available in the Makefile. Here are a few of them.

| Command              | Description                                                           |
| -------------------- | --------------------------------------------------------------------- |
| `make start`         | Start the project, all the containers and run additional commands.    |
| `make start-nocache` | Start the project and all the containers without using the cache.     |
| `make up`            | Start the project and all the containers.                             |
| `make up-recreate`   | Start the project and all the containers and recreate the containers. |
| `make stop`          | Stop the project and all the containers.                              |
| `make restart`       | Restart the project and all the containers.                           |
| `make down`          | Stop and remove the project and all the containers.                   |
| `make ssh`           | SH into the project container.                                        |
| `make build-app`     | Build the app.                                                        |
| `make preview-app`   | Preview the app.                                                      |
| `make lint`          | Lint the app using Biome.                                             |
| `make format`        | Format the app using Biome.                                           |
| `make update`        | Update the dependencies with Bun.                                     |
| `make logs`          | Show the logs of the different containers.                            |

To list all the available commands, run the `make` command.

## E2E tests

TODO
