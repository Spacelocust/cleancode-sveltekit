COMPOSE=docker compose
EXECSVELTEKIT=$(COMPOSE) exec svelte-kit

# Starting and stopping the project
start: build up-recreate

start-nocache: build-no-chache up-recreate

up-recreate:
	$(COMPOSE) up -d --remove-orphans --force-recreate

up:
	$(COMPOSE) up -d --remove-orphans

restart:
	$(COMPOSE) restart

stop:
	$(COMPOSE) stop

down:
	$(COMPOSE) down

# SSH
ssh:
	$(EXECSVELTEKIT) sh

# Build
build-app:
	$(EXECSVELTEKIT) bun run build

preview-app:
	$(EXECSVELTEKIT) bun run preview

# Linting
lint:
	$(EXECSVELTEKIT) bun run lint

format:
	$(EXECSVELTEKIT) bun run format

# Bun
update:
	$(EXECSVELTEKIT) bunx npm-check-updates -i

# Logs
logs:
	$(COMPOSE) logs


# DB
db-push:
	$(EXECSVELTEKIT) bunx run drizzle-kit push:mysql

db-drop:
	$(EXECSVELTEKIT) bunx run drizzle-kit drop

db-migrate:
	$(EXECSVELTEKIT) bun run migrate

db-create-migration:
	$(EXECSVELTEKIT) bunx run drizzle-kit generate:mysql

db-studio:
	$(EXECSVELTEKIT) drizzle-kit studio --host 0.0.0.0 --port 3001
