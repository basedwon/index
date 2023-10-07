const { _, log } = require('basd')
const IndexField = require('../index-field')

/**
 * Multi index field class.
 */
class MultiIndexField extends IndexField {
  static get type() { return 'multi' }

  /**
   * Retrieves keys for the index field.
   * @param {string} field - The field slug.
   * @returns {Array} - Returns the key array.
   */
  getKeys(field) {
    return field.split('|')
  }

  /**
   * Retrieves path based on the entity.
   * @param {Object} entity - The entity to consider.
   * @returns {Array} - Returns the path array.
   */
  getPath(entity) {
    return this.keys
      .map(key => this.normalize(_.get(entity, key)))
      .join('|')
  }

  /**
   * Finds an entry in the index.
   * @param {...any} query - Query to search for.
   * @returns {Promise<Array<any>>} - The search results.
   */
  async find(...query) {
    const path = _(query)
      .flatten()
      .map(v => String(v).split('|'))
      .flatten()
      .map(v => this.normalize(v))
      .value()
      .join('|')
    const results = []
    for await (const [id] of this.db.sub(path).iterator())
      results.push(id)
    return results
  }
}

module.exports = MultiIndexField
