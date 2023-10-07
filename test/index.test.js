const Index = require('../lib/index')
const IndexFactory = require('../lib/index-factory')
const SingleField = require('../lib/fields/single-field')
const MultiField = require('../lib/fields/multi-field')
const TextField = require('../lib/fields/text-field')
const IndexField = require('../lib/index-field')
const Storage = require('@plaindb/storage/mock')

describe('Index', () => {
  const storage = new Storage()
  const index = new Index(storage, ['field1', 'field2|multi', 'field3 text'])

  describe('constructor', () => {
    it('should set default fields', () => {
      expect(index.fields).to.have.keys(['field1', 'field2Multi', 'field3Text'])
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
      index.by('newField')
      expect(index.fields).to.have.keys(['field1', 'field2Multi', 'field3Text', 'newField'])
    })
  })

  describe('@todo - dispatch', () => {
    it('should call storage.root.batch with ops', async () => {
      // const ops = [{}, {}, {}]
      // index.buildAdd = sinon.stub().returns(ops)

      // await index.dispatch('add', {})

      // expect(storage.root.batch.calledWith(ops)).to.be.true
    })
  })




  describe('buildAdd', () => {
    it('should build operations for adding entity', () => {
      // const entity = { id: 1, field1: 'test1' }
      // const ops = []
      
      // index.fields.field1 = { add: sinon.stub().returns(ops) }
      
      // const result = index.buildAdd(entity)

      // expect(index.fields.field1.add.calledWith(entity, ops)).to.be.true
      // expect(result).to.equal(ops)
    })
  })

  describe('add', () => {
    it('should dispatch add operation', async () => {
      // index.dispatch = sinon.stub().resolves()

      // await index.add({})

      // expect(index.dispatch.calledWith('add')).to.be.true
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

/*
describe('SingleIndexField', () => {
})

describe('MultiIndexField', () => {
})

describe('TextIndexField', () => {
})
*/

describe.omit('Index', () => {
  let storage
  let index

  beforeEach(() => {
    storage = {
      root: {
        batch: sinon.stub().resolves()
      }
    }
    index = new Index(storage, ['field1', 'field2|multi', 'field3 text'])
  })


  describe('buildRemove', () => {
    it('should build operations for removing entity', () => {
      const entity = { id: 1, field1: 'test1' }
      const ops = []
      
      index.fields.field1 = { remove: sinon.stub().returns(ops) }

      const result = index.buildRemove(entity)

      expect(index.fields.field1.remove.calledWith(entity, ops)).to.be.true
      expect(result).to.equal(ops)
    })
  })

  describe('remove', () => {
    it('should dispatch remove operation', async () => {
      index.dispatch = sinon.stub().resolves()

      await index.remove({})

      expect(index.dispatch.calledWith('remove')).to.be.true
    })
  })

  describe('buildUpdate', () => {
    it('should build operations for updating entity', () => {
      const oldEntity = { id: 1, field1: 'test1' }
      const newEntity = { id: 1, field1: 'test2' }
      const ops = []
      
      index.fields.field1 = { update: sinon.stub().returns(ops) }

      const result = index.buildUpdate(oldEntity, newEntity)

      expect(index.fields.field1.update.calledWith(oldEntity, newEntity, ops)).to.be.true
      expect(result).to.equal(ops)
    })
  })

  describe('update', () => {
    it('should dispatch update operation', async () => {
      index.dispatch = sinon.stub().resolves()

      await index.update({}, {})

      expect(index.dispatch.calledWith('update')).to.be.true
    })
  })

  // You could add more tests for 'find' method depending on your needs
})

describe.omit('Index', () => {
  // ... (Previous set-up code and other tests)

  describe('find', () => {
    beforeEach(() => {
      // Set up some mock data and methods
      index.keys = new Set([1, 2, 3])
      index.fields.field1 = { find: sinon.stub() }
      index.fields.field2 = { find: sinon.stub() }
    })

    it('should return empty array if no key matches', async () => {
      index.fields.field1.find.returns(new Set([]))
      index.fields.field2.find.returns(new Set([]))

      const result = await index.find({ field1: 'value1', field2: 'value2' })
      
      expect(result).to.be.empty
    })

    it('should return matched keys', async () => {
      index.fields.field1.find.returns(new Set([1, 2]))
      index.fields.field2.find.returns(new Set([2, 3]))

      const result = await index.find({ field1: 'value1', field2: 'value2' })
      
      expect(result).to.deep.equal([2])
    })

    it('should work with a single field', async () => {
      index.fields.field1.find.returns(new Set([1, 2]))

      const result = await index.find({ field1: 'value1' })
      
      expect(result).to.deep.equal([1, 2])
    })

    it('should work with multiple fields', async () => {
      index.fields.field1.find.returns(new Set([1, 2]))
      index.fields.field2.find.returns(new Set([2, 3]))
      index.fields.field3.find.returns(new Set([2, 4]))

      const result = await index.find({ field1: 'value1', field2: 'value2', field3: 'value3' })
      
      expect(result).to.deep.equal([2])
    })

    it('should handle non-existent fields gracefully', async () => {
      const result = await index.find({ nonexistentField: 'value' })
      
      expect(result).to.be.empty
    })
  })
})
