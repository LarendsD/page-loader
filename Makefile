lint:
	npx eslint .
page-loader:
	node bin/page-loader.js
test:
	npm test
test-coverage:
	npm test -- --coverage
install:
	npm ci