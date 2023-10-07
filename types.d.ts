declare module '@plaindb/index' {
  type IndexOptions = {
    formatter?: Formatter,
    reducer?: Function,
    [key: string]: any
  }

  type EntityType = {
    id: string | number,
    [key: string]: any
  }

  type Op = {
    path: string[],
    type: 'put' | 'del',
    key: string | number,
    value?: boolean
  }

  class IndexFactory {
    constructor(index: Index)
    getFieldKey(slug: string | string[]): string
    getFieldType(slug: string | string[]): any
    createField(definition: any): IndexField
  }

  class Index {
    constructor(storage: any, fields?: string[], opts?: IndexOptions)
    by(slug: string): this
    dispatch(op: string, ...args: any[]): Promise<void>
    buildAdd(entity: EntityType, ops?: Op[]): Op[]
    add(entity: EntityType): Promise<void>
    buildRemove(entity: EntityType, ops?: Op[]): Op[]
    remove(entity: EntityType): Promise<void>
    buildUpdate(oldEntity: EntityType, newEntity: EntityType, ops?: Op[]): Op[]
    update(oldEntity: EntityType, newEntity: EntityType): Promise<void>
    find(query: string | object, ...values: any[]): Promise<any[]>
  }

  class IndexField {
    constructor(index: Index, config: any)
    getKeys(field: string): string[]
    getPath(entity: EntityType): any
    isMatch(oldEntity: EntityType, newEntity: EntityType): boolean
    find(...query: any[]): Promise<any[]>
    add(entity: EntityType, ops?: Op[]): Op[]
    update(oldEntity: EntityType, newEntity: EntityType, ops?: Op[]): Op[]
    remove(entity: EntityType, ops?: Op[]): Op[]
  }

  class SingleIndexField extends IndexField {
    find(query: any): Promise<any[]>
  }

  class MultiIndexField extends IndexField {
    find(...query: any[]): Promise<any[]>
  }

  class TextIndexField extends IndexField {
    find(...query: any[]): Promise<any[]>
  }
}
