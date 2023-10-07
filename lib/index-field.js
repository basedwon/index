const { _, log } = require('basd')

/**
 * Base class for index fields.
 */
class IndexField {
  static get type() { return null }
  /**
   * @param {Index} index - The main index instance.
   * @param {Object} config - The field configuration.
   */
  constructor(index, { key, slug, type, params } = {}) {
    if (new.target === IndexField)
      throw new Error(`Cannot create instance of IndexField directly`)
    _.objProp(this, 'fieldType', this.constructor.type)
    if (!this.fieldType)
      throw new Error(`Fields must define a field type`)
    _.objProp(this, 'key', key)
    _.objProp(this, 'slug', slug)
    _.objProp(this, 'type', type)
    _.objProp(this, 'params', params)
    _.objProp(this, 'index', index)
    _.objProp(this, 'keys', this.getKeys(this.slug))
    _.objProp(this, 'db', this.index.storage.sub(this.key))
  }

  /**
   * Gets the path of the field.
   * @returns {Array<string>} - The path.
   */
  get path() {
    return this.db.path.slice()
  }

  /**
   * Normalizes a value for indexing.
   * @param {any} value - The value to normalize.
   * @returns {any} - The normalized value.
   */
  normalize(value) {
    return this.index.formatter.normalize(value)
  }

  /**
   * Builds operations for a specific type.
   * @param {string} type - The type of operation.
   * @param {Object} entity - The entity to operate on.
   * @param {Array} ops - The operations array.
   * @returns {Array} - The updated operations array.
   */
  buildOps(type, entity, ops = []) {
    const path = this.getPath(entity)
    const entityId = this.index.reducer(entity)
    const op = { path: this.path.concat(path), type, key: entityId }
    if (type !== 'del') op.value = true
    ops.push(op)
    return ops
  }

  /**
   * Adds an entity to the index field.
   * @param {Object} entity - The entity to add.
   * @param {Array} [ops=[]] - Optional operations array to append to.
   * @returns {Array} - The updated operations array.
   */
  add(entity, ops = []) {
    this.buildOps('put', entity, ops)
    return ops
  }

  /**
   * Updates an existing entity in the index field.
   * @param {Object} oldEntity - The existing entity to update.
   * @param {Object} newEntity - The new entity data.
   * @param {Array} [ops=[]] - Optional operations array to append to.
   * @returns {Array} - The updated operations array.
   */
  update(oldEntity, newEntity, ops = []) {
    if (this.isMatch(oldEntity, newEntity)) return ops
    this.remove(oldEntity, ops)
    this.add(newEntity, ops)
    return ops
  }

  /**
   * Removes an entity from the index field.
   * @param {Object} entity - The entity to remove.
   * @param {Array} [ops=[]] - Optional operations array to append to.
   * @returns {Array} - The updated operations array.
   */
  remove(entity, ops = []) {
    this.buildOps('del', entity, ops)
    return ops
  }
  
  // Interface
  /**
   * Retrieves keys for the index field.
   * @param {string} field - The field slug.
   * @returns {Array} - Returns the key array.
   */
  getKeys(field) {
    return [field]
  }

  /**
   * Retrieves path based on the entity.
   * @param {Object} entity - The entity to consider.
   * @returns {Array} - Returns the path array.
   */
  getPath(entity) {
    const [value] = _.values(_.flatObj(_.pick(entity, this.keys)))
    return this.normalize(value)
  }

  /**
   * Checks if old and new entities match.
   * @param {Object} oldEntity - The old entity.
   * @param {Object} newEntity - The new entity.
   * @returns {boolean} - Whether the old and new entities match.
   */
  isMatch(oldEntity, newEntity) {
    const oldValue = _.pick(oldEntity, this.keys)
    const newValue = _.pick(newEntity, this.keys)
    return _.isMatch(oldValue, newValue)
  }

  /**
   * Finds an entry in the index.
   * @param {any} query - Query to search for.
   * @returns {Promise<Array<any>>} - The search results.
   */
  async find(...query) {
    throw new Error(`Not implemented`)
  }
}

module.exports = IndexField
