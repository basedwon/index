const { _, log } = require('basd')
const IndexField = require('./index-field')
const SingleIndexField = require('./fields/single-field')
const MultiIndexField = require('./fields/multi-field')
const TextIndexField = require('./fields/text-field')

/**
 * Factory class for generating index fields.
 */
class IndexFactory {
  /**
   * @param {Index} index - The main index instance.
   */
  constructor(index) {
    this.index = index
    this.registry = this.index.registry
    this.registry.setMany({
      single: SingleIndexField,
      multi: MultiIndexField,
      text: TextIndexField,
    })
  }

  /**
   * Generates a key for the given slug.
   * @param {string} slug - Slug to generate key from.
   * @returns {string} - The generated key.
   */
  getFieldKey(slug) {
    slug = _(slug.split(' ')).startCase().replace(/ /g, '')
    return slug[0].toLowerCase() + slug.slice(1)
  }

  /**
   * Determines the type of the field.
   * @param {string} slug - The field slug.
   * @returns {Object} - The configuration object.
   */
  getFieldType(slug) {
    if (_.isString(slug))
      slug = slug.split('|')
    let type, params = slug
    if (slug.length === 1) {
      slug = slug.pop()
      if (slug.match(/\s/)) {
        [params, type] = slug.split(' ')
      } else {
        type = 'single'
      }  
    } else {
      slug = slug.join('|')
      type = 'multi'
    }
    const key = this.getFieldKey(slug)
    return { key, slug, type, params }
  }

  /**
   * Creates an index field.
   * @param {string} definition - The field definition.
   * @returns {IndexField} - The created index field.
   */
  createField(definition) {
    const config = this.getFieldType(definition)
    const field = this.registry.createInstance(config.type, IndexField, this.index, config)
    _.objProp(field, 'find', field.find.bind(field))
    _.objProps(field.find, {
      find: field.find,
      add: field.add.bind(field),
      update: field.update.bind(field),
      remove: field.remove.bind(field),
    })
    return field
  }
}

module.exports = IndexFactory
