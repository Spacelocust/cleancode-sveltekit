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