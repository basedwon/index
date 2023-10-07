const Index = require('../lib/index')
const IndexFactory = require('../lib/index-factory')
const SingleField = require('../lib/fields/single-field')
const MultiField = require('../lib/fields/multi-field')
const TextField = require('../lib/fields/text-field')
const IndexField = require('../lib/index-field')
const Storage = require('@plaindb/storage/mock')

describe('Index', () => {
  const entity = { id: 1, name: 'Alice', age: 33, bio: 'Software Developer', gender: 'F', height: `5'4"` }
  const charlie = { id: 2, name: 'Charlie', age: 42, bio: 'Business Developer', gender: 'M', height: `6'4"` }
  const newEntity = { ...entity, name: 'Bob' }

  let storage = new Storage()
  let index = new Index(storage, ['name', 'name|age', 'bio text'])

  describe('constructor', () => {
    it('should set default fields', () => {
      expect(index.fields).to.have.keys(['name', 'nameAge', 'bioText'])
    })
    
    it('should initialize keys set', () => {
      expect(index.keys).to.be.instanceOf(Set)
    })

    it('should attach storage', () => {
      expect(index.storage).to.equal(storage)
    })

    it('reducer method should return correct id', () => {
      const id = index.reducer({ id: '123' })
      expect(id).to.equal('123')
    })
  })

  describe('by', () => {
    it('should add a new field', () => {
      index.by('gender')
      expect(index.fields).to.have.keys(['name', 'nameAge', 'bioText', 'gender'])
    })
  })

  describe('dispatch', () => {
    it('should call storage.root.batch with ops', async () => {
      await index.dispatch('add', entity)
      const db = storage.sub(['name', 'alice'])
      for await (const [id, value] of db.iterator()) {
        expect(value).to.be.true
        expect(id).to.equal('1')
      }
    })
  })

  describe('buildAdd', () => {
    it('should build operations for adding entity', () => {
      const expectedOps = [
        { path: [ 'name', 'alice' ], type: 'put', key: 1, value: true },
        { path: [ 'nameAge', 'alice|33' ], type: 'put', key: 1, value: true },
        { path: [ 'bioText', 'software' ], type: 'put', key: 1, value: true },
        { path: [ 'bioText', 'developer' ], type: 'put', key: 1, value: true },
        { path: [ 'gender', 'f' ], type: 'put', key: 1, value: true }
      ]
      const ops = index.buildAdd(entity)
      expect(ops).to.have.lengthOf(5)
      expect(ops).to.eql(expectedOps)
    })
  })

  describe('add', () => {
    it('should dispatch add operation', async () => {
      await index.add(entity)
      const db = storage.sub(['name', 'alice'])
      const results = []
      for await (const [id, value] of db.iterator()) {
        results.push({ id, value })
      }
      expect(results).to.have.lengthOf(1)
      expect(results[0].value).to.be.true
      expect(results[0].id).to.equal('1')
    })
  })

  describe('buildUpdate', () => {
    it('should build operations for updating entity', () => {
      const ops = index.buildUpdate(entity, newEntity)
      const expectedOps = [
        { path: [ 'name', 'alice' ], type: 'del', key: 1 },
        { path: [ 'name', 'bob' ], type: 'put', key: 1, value: true },
        { path: [ 'nameAge', 'alice|33' ], type: 'del', key: 1 },
        { path: [ 'nameAge', 'bob|33' ], type: 'put', key: 1, value: true }
      ]
      expect(ops).to.have.lengthOf(4)
      expect(ops).to.eql(expectedOps)
    })
  })

  describe('update', () => {
    it('should dispatch update operation', async () => {
      await index.update(entity, newEntity)
      const db = storage.sub(['name', 'bob'])
      const results = []
      for await (const [id, value] of db.iterator()) {
        results.push({ id, value })
        expect(value).to.be.true
        expect(id).to.equal('1')
      }
      expect(results).to.have.lengthOf(1)
      expect(results[0].value).to.be.true
      expect(results[0].id).to.equal('1')
    })
  })

  describe('buildRemove', () => {
    it('should build operations for removing entity', () => {
      const expectedOps = [
        { path: [ 'name', 'alice' ], type: 'del', key: 1 },
        { path: [ 'nameAge', 'alice|33' ], type: 'del', key: 1 },
        { path: [ 'bioText', 'software' ], type: 'del', key: 1 },
        { path: [ 'bioText', 'developer' ], type: 'del', key: 1 },
        { path: [ 'gender', 'f' ], type: 'del', key: 1 }
      ]
      const ops = index.buildRemove(entity)
      expect(ops).to.have.lengthOf(5)
      expect(ops).to.eql(expectedOps)
    })
  })

  describe('remove', () => {
    it('should dispatch remove operation', async () => {
      await index.remove(newEntity)
      const results = []
      for await (const [id, value] of storage.sub(['name', 'bob']).iterator()) {
        results.push(id)
      }
      expect(results).to.have.lengthOf(0)
    })
  })

  describe('find', async () => {
    beforeEach(async () => {
      storage = new Storage()
      index = new Index(storage, ['name', 'name|age', 'bio text'])
      await index.add(entity)
      await index.add(charlie)

      // // Set up some mock data and methods
      // index.keys = new Set([1, 2, 3])
      // index.fields.field1 = { find: sinon.stub() }
      // index.fields.field2 = { find: sinon.stub() }
    })

    it('should return empty array if no key matches', async () => {
      const results = await index.find('name', 'Bob')
      expect(results).to.be.empty
    })

    it('should return matched keys', async () => {
      const results = await index.find('name', 'Alice')
      expect(results).to.deep.equal(['1'])
    })

    it('should work with a single field', async () => {
      const results = await index.find({ name: 'Alice' })
      expect(results).to.deep.equal(['1'])
    })

    it('should work with multiple fields', async () => {
      const results = await index.find({ name: 'Alice', age: 33 })
      expect(results).to.deep.equal(['1'])
    })

    it('should work with text fields', async () => {
      const results = await index.find('bioText', 'developer')
      expect(results).to.deep.equal(['1', '2'])
    })

    it('should handle non-existent fields gracefully', async () => {
      const results = await index.find({ nonexistentField: 'value' })
      expect(results).to.be.empty
    })
  })
})

describe('IndexFactory', () => {
  let index = new Index(new Storage())
  let factory = new IndexFactory(index)

  describe('getFieldKey', () => {
    it('should return the correct field key', () => {
      expect(factory.getFieldKey('field1')).to.equal('field1')
    })
  })

  describe('getFieldType', () => {
    it('should return the correct field type for a single-field', () => {
      expect(factory.getFieldType('name').type).to.equal('single')
    })

    it('should return the correct field type for a multi-field', () => {
      expect(factory.getFieldType('name|age').type).to.equal('multi')
    })

    it('should return the correct field type for a text-field', () => {
      expect(factory.getFieldType('description text').type).to.equal('text')
    })
  })

  describe('createField', () => {
    it('should return the correct field for a single-field definition', () => {
      expect(factory.createField('name')).to.be.instanceOf(SingleField)
    })

    it('should return the correct field for a multi-field definition', () => {
      expect(factory.createField('name|age')).to.be.instanceOf(MultiField)
    })

    it('should return the correct field for a text-field definition', () => {
      expect(factory.createField('description text')).to.be.instanceOf(TextField)
    })
  })
})

describe('IndexField', () => {
  it('should throw error when trying to create instance directly', () => {
    expect(() => new IndexField()).to.throw('Cannot create instance of IndexField directly')
  })
})

describe('SingleIndexField', () => {
})

describe('MultiIndexField', () => {
})

describe('TextIndexField', () => {
})
