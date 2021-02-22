.PHONY: dev-env

all: dev-env

dev-env: src/mocks/handlers.js src/mocks/data/current

src/mocks/handlers.js:
	@cp src/mocks/handlers.example.js $@

src/mocks/data/current:
	@cp -r src/mocks/data/default/* $@
