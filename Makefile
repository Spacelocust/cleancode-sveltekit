.DEFAULT_GOAL:=help
COMPOSE=docker compose
EXECSVELTEKIT=$(COMPOSE) exec svelte-kit

## All commands available in the Makefile

##@ Helper
help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nAll commands available in the Makefile\n \nUsage:\n  make \033[36m<target>\033[0m\n"} /^[.a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)


##@ Starting/stopping the project
start: ## Build and start the project
	build up-recreate

start-nocache: ## Build and start the project without cache
	build-no-chache up-recreate

up-recreate: ## Start the project and recreate the containers
	$(COMPOSE) up -d --remove-orphans --force-recreate

up: ## Start the project
	$(COMPOSE) up -d --remove-orphans

restart: ## Restart the project
	$(COMPOSE) restart

stop: ## Stop the project
	$(COMPOSE) stop

down: ## Stop the project and remove all containers
	$(COMPOSE) down

##@ SSH
ssh: ## SSH into the container
	$(EXECSVELTEKIT) sh

# Build
build-app: ## Build the app
	$(EXECSVELTEKIT) bun run build

preview-app: ## Run the app in preview mode
	$(EXECSVELTEKIT) bun run preview

##@ Linting
lint: ## Run the linter
	$(EXECSVELTEKIT) bun run lint

format: ## Run the formatter
	$(EXECSVELTEKIT) bun run format

##@ Bun
update: ## Update the project
	$(EXECSVELTEKIT) bunx npm-check-updates -i

##@ Logs
logs: ## Show the logs
	$(COMPOSE) logs


##@ DB
db-push: ## Push the current schema to the database
	$(EXECSVELTEKIT) bunx drizzle-kit push:mysql --config=src/lib/server/drizzle/drizzle.config.ts

db-clear: ## Pull the current schema from the database
	db-drop db-create

db-drop: ## Drop the database
	$(EXECSVELTEKIT) bun run db:drop

db-create: ## Create the database
	$(EXECSVELTEKIT) bun run db:create

db-drop-migration: ## Drop the latest migration from the database
	$(EXECSVELTEKIT) bunx drizzle-kit drop --config=src/lib/server/drizzle/drizzle.config.ts

db-migrate: ## Run latest migration
	$(EXECSVELTEKIT) bun run db:migrate

db-create-migration: ## Create a new migration
	$(EXECSVELTEKIT) bunx drizzle-kit generate:mysql --config=src/lib/server/drizzle/drizzle.config.ts

db-studio: ## Launch the drizzle studio
	$(EXECSVELTEKIT) bunx drizzle-kit studio --host 0.0.0.0 --port 3001 --config=./src/lib/server/drizzle/drizzle.config.ts
