const { _, log } = require('basd')
const IndexField = require('../index-field')

/**
 * Single index field class.
 * @extends IndexField
 */
class SingleIndexField extends IndexField {
  static get type() { return 'single' }

  /**
   * Finds an entry in the index.
   * @param {any} query - Query to search for.
   * @returns {Promise<Array<any>>} - The search results.
   */
  async find(query) {
    const normalized = this.normalize(query)
    const path = this.path.concat(normalized)
    const db = this.db.root.sub(path)
    const results = []
    for await (const [id] of db.iterator())
      results.push(id)
    return results
  }
}

module.exports = SingleIndexField
