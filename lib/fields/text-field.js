const { _, log } = require('basd')
const IndexField = require('../index-field')

/**
 * Text index field class.
 */
class TextIndexField extends IndexField {
  static get type() { return 'text' }

  /**
   * Retrieves keys for the index field.
   * @param {string} field - The field slug.
   * @returns {Array} - Returns the key array.
   */
  getKeys(field) {
    [field] = field.split(' ')
    return super.getKeys(field)
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
   * Builds operations for text-based fields.
   * @param {string} type - The type of operation.
   * @param {Object} entity - The entity to operate on.
   * @param {Array} ops - The operations array.
   * @returns {Array} - The updated operations array.
   */
  buildOps(type, entity, ops = []) {
    const key = this.params
    const value = _.get(entity, key)
    const entityId = this.index.reducer(entity)
    const words = this.index.formatter.tokenize(value)
    for (const word of words) {
      const path = this.path.concat(word)
      const op = { path, type, key: entityId }
      if (type !== 'del') op.value = true
      ops.push(op)
    }
    return ops
  }

  /**
   * Finds an entry in the index.
   * @param {...any} query - Query to search for.
   * @returns {Promise<Array<any>>} - The search results.
   */
  async find(...query) {
    query = _.flatten(query)
    if (!query.every(i => _.isString(i) || _.isNumber(i)))
      throw new Error(`Text field query must be a string or an array of strings`)
    query = _.isString(query) ? query : query.join(' ')
    const all = {}
    for (const value of this.index.formatter.tokenize(query)) {
      all[value] = all[value] || new Set
      for await (const [id] of this.db.sub(value).iterator())
        all[value].add(id)
    }
    return _.intersection(..._.values(all).map(set => Array.from(set)))
  }
}

module.exports = TextIndexField
