const { _, log } = require('basd')
const Registry = require('@basd/registry')
const Formatter = require('@basd/formatter')
const IndexFactory = require('./index-factory')

/**
 * Main Index Class.
 */
class Index {
  /**
   * @param {Object} storage - The storage engine.
   * @param {Array<string>} fields - Fields to index.
   * @param {Object} opts - Options object.
   */
  constructor(storage, fields = [], opts = {}) {
    _.objProp(this, 'registry', Registry.get(opts))
    _.objProp(this, 'factory', new IndexFactory(this))
    _.objProp(this, 'keys', new Set(), { show: true })
    _.objProp(this, 'opts', opts)
    _.objProp(this, 'storage', storage)
    _.objProp(this, 'formatter', opts.formatter || new Formatter())
    if (_.isFunction(this.opts.reducer))
      _.objProp(this, 'reducer', this.opts.reducer.bind(this))
    _.objProp(this, 'fields', {}, { show: true })
    for (const field of fields)
      this.by(field)
  }

  /**
   * Default reducer function to extract id from an entity.
   * @param {Object} entity - The entity to extract an id from.
   * @returns {any} - The id of the entity.
   */
  reducer(entity) {
    return entity.id
  }

  /**
   * Adds a field to the index.
   * @param {string} slug - The field slug.
   * @returns {Index} - Returns the index instance for chaining.
   */
  by(slug) {
    const field = this.factory.createField(slug)
    field.keys.map(key => this.keys.add(key))
    _.objProp(this, `by${_.ucf(field.key)}`, field.find, { show: true })
    this.fields[field.key] = field
    return this
  }

  /**
   * Dispatches a batch operation.
   * @param {string} op - The operation type.
   * @param {...any} args - The arguments for the operation.
   * @returns {Promise} - Returns a promise.
   */
  dispatch(op, ...args) {
    const ops = this[`build${_.ucf(op)}`](...args)
    return this.storage.root.batch(ops)
  }

  /**
   * Builds a list of 'add' operations for an entity.
   * @param {Object} entity - The entity to add.
   * @param {Array} ops - The operations array.
   * @returns {Array} - The updated operations array.
   */
  buildAdd(entity, ops = []) {
    for (const field of _.values(this.fields))
      field.add(entity, ops)
    return ops
  }

  /**
   * Adds an entity to the index.
   * @param {Object} entity - The entity to add.
   * @returns {Promise} - Returns a promise.
   */
  async add(entity) {
    return this.dispatch('add', entity)
  }

  /**
   * Builds a list of 'remove' operations for an entity.
   * @param {Object} entity - The entity to remove.
   * @param {Array} ops - The operations array.
   * @returns {Array} - The updated operations array.
   */
  buildRemove(entity, ops = []) {
    for (const field of _.values(this.fields))
      field.remove(entity, ops)
    return ops
  }

  /**
   * Removes an entity from the index.
   * @param {Object} entity - The entity to remove.
   * @returns {Promise} - Returns a promise.
   */
  async remove(entity) {
    return this.dispatch('remove', entity)
  }

  /**
   * Builds a list of 'update' operations for an entity.
   * @param {Object} oldEntity - The old entity.
   * @param {Object} newEntity - The new entity.
   * @param {Array} ops - The operations array.
   * @returns {Array} - The updated operations array.
   */
  buildUpdate(oldEntity, newEntity, ops = []) {
    for (const field of _.values(this.fields))
      field.update(oldEntity, newEntity, ops)
    return ops
  }

  /**
   * Updates an entity in the index.
   * @param {Object} oldEntity - The old entity.
   * @param {Object} newEntity - The new entity.
   * @returns {Promise} - Returns a promise.
   */
  async update(oldEntity, newEntity) {
    return this.dispatch('update', oldEntity, newEntity)
  }

  /**
   * Finds entities based on a query.
   * @param {string|Object} query - The query string or object.
   * @param {...any} values - Additional query parameters.
   * @returns {Promise} - Returns a promise with found entities.
   */
  async find(query, ...values) {
    const findField = (query) => {
      const field = this.fields[this.factory.getFieldKey(query)]
      if (field) return field
      if (this.keys.has(query))
        return _.find(this.fields, f => f.keys.includes(query))
    }
    if (_.isString(query)) {
      const field = findField(query)
      if (!field) throw new Error(`Invalid query`)
      return field.find(...values)
    }
    if (_.isObj(query)) {
      const flat = _.flatObj(query)
      values = _.values(flat)
      // Try with multi-field
      const key = this.factory.getFieldKey(_.keys(flat).join(' '))
      const field = this.fields[key]
      if (field) return field.find(...values)
      // Try with multiple single fields
      const keys = _.keys(flat)
      if (_.every(keys, k => this.keys.has(k))) {
        const results = await Promise.all(_.map(flat, (value, key) => this.find(key, value)))
        return _.intersection(...results)
      }
    }
  }
}

module.exports = Index
