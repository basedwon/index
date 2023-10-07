# Indexer

[![npm](https://img.shields.io/npm/v/@plaindb/index?style=flat&logo=npm)](https://www.npmjs.com/package/@plaindb/index)
[![pipeline](https://gitlab.com/frenware/framework/plaindb/index/badges/master/pipeline.svg)](https://gitlab.com/frenware/framework/plaindb/index/-/pipelines)
[![license](https://img.shields.io/npm/l/@plaindb/index)](https://gitlab.com/frenware/framework/plaindb/index/-/blob/master/LICENSE)
[![downloads](https://img.shields.io/npm/dw/@plaindb/index)](https://www.npmjs.com/package/@plaindb/index) 

[![Gitlab](https://img.shields.io/badge/Gitlab%20-%20?logo=gitlab&color=%23383a40)](https://gitlab.com/frenware/framework/plaindb/index)
[![Github](https://img.shields.io/badge/Github%20-%20?logo=github&color=%23383a40)](https://github.com/basedwon/index)
[![Twitter](https://img.shields.io/badge/@basdwon%20-%20?logo=twitter&color=%23383a40)](https://twitter.com/basdwon)
[![Discord](https://img.shields.io/badge/Basedwon%20-%20?logo=discord&color=%23383a40)](https://discordapp.com/users/basedwon)

A comprehensive indexing solution built to cater to a wide variety of indexing requirements. It provides a robust API for adding, removing, updating, and finding data based on multiple types of index fields. Including an inverted-indexing of words within a text field.

## Features

- Dynamic field creation for indexing
- Supports single, multi, and text-based fields
- Extensible with custom index field types
- Asynchronous API support
- Transactional batch operations
- Formatter and reducer customization

## Installation

Install the package with:

```bash
npm install @plaindb/index
```

## Usage

First, import the `Indexer` library.

```js
import Indexer from '@plaindb/index'
```
or
```js
const Indexer = require('@plaindb/index')
```

### Initialize the Index

```js
const storage = // Your storage instance
const index = new Index(storage, ['name', 'age|gender', 'description text'])
```

### Adding an Entity

```js
await index.add({
  id: 1,
  name: 'John',
  age: 30,
  gender: 'male',
  description: 'Software Engineer'
})
```

### Removing an Entity

```js
await index.remove({
  id: 1
})
```

### Updating an Entity

```js
await index.update(oldEntity, newEntity)
```

### Finding Entities

You can find entities based on index fields:

```js
const results = await index.find('age', 30)
```

### Custom Formatter and Reducer

You can provide custom formatter and reducer functions through the `opts` parameter:

```js
const index = new Index(storage, ['name'], {
  formatter: new CustomFormatter(),
  reducer: (entity) => entity.customId
})
```

## Documentation

- [API Reference](/docs/api.md)

### Classes

- `Index`: Manages multiple index fields and dispatches operations.
- `IndexFactory`: Creates index fields dynamically.
- `IndexField`: Abstract class for index fields.
- `SingleIndexField`: Index field for single properties.
- `MultiIndexField`: Index field for multi-properties.
- `TextIndexField`: Index field for text-based searching.

### Methods

- `Index.by(slug)`: Dynamically add an index field.
- `Index.add(entity)`: Add an entity to the index.
- `Index.remove(entity)`: Remove an entity from the index.
- `Index.update(oldEntity, newEntity)`: Update an entity in the index.
- `Index.find(query, ...values)`: Find entities based on a query.

## Extending

To extend the library with a custom index field, create a class extending `IndexField` and register it via `Registry`.

## Tests

In order to run the test suite, simply clone the repository and install its dependencies:

```bash
git clone https://gitlab.com/frenware/framework/plaindb/index.git
cd indexer
npm install
```

To run the tests:

```bash
npm test
```

## Contributing

Thank you! Please see our [contributing guidelines](/docs/contributing.md) for details.

## Donations

If you find this project useful and want to help support further development, please send us some coin. We greatly appreciate any and all contributions. Thank you!

**Bitcoin (BTC):**
```
1JUb1yNFH6wjGekRUW6Dfgyg4J4h6wKKdF
```

**Monero (XMR):**
```
46uV2fMZT3EWkBrGUgszJCcbqFqEvqrB4bZBJwsbx7yA8e2WBakXzJSUK8aqT4GoqERzbg4oKT2SiPeCgjzVH6VpSQ5y7KQ
```

## License

@plaindb/index is [MIT licensed](https://gitlab.com/frenware/framework/plaindb/index/-/blob/master/LICENSE).
