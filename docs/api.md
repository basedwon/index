## Classes

<dl>
<dt><a href="#MultiIndexField">MultiIndexField</a> ⇐ <code><a href="#IndexField">IndexField</a></code></dt>
<dd><p>Multi index field class.</p>
</dd>
<dt><a href="#SingleIndexField">SingleIndexField</a> ⇐ <code><a href="#IndexField">IndexField</a></code></dt>
<dd><p>Single index field class.</p>
</dd>
<dt><a href="#TextIndexField">TextIndexField</a> ⇐ <code><a href="#IndexField">IndexField</a></code></dt>
<dd><p>Text index field class.</p>
</dd>
<dt><a href="#IndexFactory">IndexFactory</a></dt>
<dd><p>Factory class for generating index fields.</p>
</dd>
<dt><a href="#IndexField">IndexField</a></dt>
<dd><p>Base class for index fields.</p>
</dd>
<dt><a href="#Index">Index</a></dt>
<dd><p>Main Index Class.</p>
</dd>
</dl>

<a name="MultiIndexField"></a>

## MultiIndexField ⇐ [<code>IndexField</code>](#IndexField)
Multi index field class.

**Kind**: global class  
**Extends**: [<code>IndexField</code>](#IndexField)  

* [MultiIndexField](#MultiIndexField) ⇐ [<code>IndexField</code>](#IndexField)
    * [.path](#IndexField+path) ⇒ <code>Array.&lt;string&gt;</code>
    * [.getKeys(field)](#MultiIndexField+getKeys) ⇒ <code>Array</code>
    * [.getPath(entity)](#MultiIndexField+getPath) ⇒ <code>Array</code>
    * [.find(...query)](#MultiIndexField+find) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>
    * [.normalize(value)](#IndexField+normalize) ⇒ <code>any</code>
    * [.buildOps(type, entity, ops)](#IndexField+buildOps) ⇒ <code>Array</code>
    * [.add(entity, [ops])](#IndexField+add) ⇒ <code>Array</code>
    * [.update(oldEntity, newEntity, [ops])](#IndexField+update) ⇒ <code>Array</code>
    * [.remove(entity, [ops])](#IndexField+remove) ⇒ <code>Array</code>
    * [.isMatch(oldEntity, newEntity)](#IndexField+isMatch) ⇒ <code>boolean</code>

<a name="IndexField+path"></a>

### multiIndexField.path ⇒ <code>Array.&lt;string&gt;</code>
Gets the path of the field.

**Kind**: instance property of [<code>MultiIndexField</code>](#MultiIndexField)  
**Returns**: <code>Array.&lt;string&gt;</code> - - The path.  
<a name="MultiIndexField+getKeys"></a>

### multiIndexField.getKeys(field) ⇒ <code>Array</code>
Retrieves keys for the index field.

**Kind**: instance method of [<code>MultiIndexField</code>](#MultiIndexField)  
**Overrides**: [<code>getKeys</code>](#IndexField+getKeys)  
**Returns**: <code>Array</code> - - Returns the key array.  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | The field slug. |

<a name="MultiIndexField+getPath"></a>

### multiIndexField.getPath(entity) ⇒ <code>Array</code>
Retrieves path based on the entity.

**Kind**: instance method of [<code>MultiIndexField</code>](#MultiIndexField)  
**Overrides**: [<code>getPath</code>](#IndexField+getPath)  
**Returns**: <code>Array</code> - - Returns the path array.  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>Object</code> | The entity to consider. |

<a name="MultiIndexField+find"></a>

### multiIndexField.find(...query) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>
Finds an entry in the index.

**Kind**: instance method of [<code>MultiIndexField</code>](#MultiIndexField)  
**Overrides**: [<code>find</code>](#IndexField+find)  
**Returns**: <code>Promise.&lt;Array.&lt;any&gt;&gt;</code> - - The search results.  

| Param | Type | Description |
| --- | --- | --- |
| ...query | <code>any</code> | Query to search for. |

<a name="IndexField+normalize"></a>

### multiIndexField.normalize(value) ⇒ <code>any</code>
Normalizes a value for indexing.

**Kind**: instance method of [<code>MultiIndexField</code>](#MultiIndexField)  
**Returns**: <code>any</code> - - The normalized value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value to normalize. |

<a name="IndexField+buildOps"></a>

### multiIndexField.buildOps(type, entity, ops) ⇒ <code>Array</code>
Builds operations for a specific type.

**Kind**: instance method of [<code>MultiIndexField</code>](#MultiIndexField)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of operation. |
| entity | <code>Object</code> | The entity to operate on. |
| ops | <code>Array</code> | The operations array. |

<a name="IndexField+add"></a>

### multiIndexField.add(entity, [ops]) ⇒ <code>Array</code>
Adds an entity to the index field.

**Kind**: instance method of [<code>MultiIndexField</code>](#MultiIndexField)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| entity | <code>Object</code> |  | The entity to add. |
| [ops] | <code>Array</code> | <code>[]</code> | Optional operations array to append to. |

<a name="IndexField+update"></a>

### multiIndexField.update(oldEntity, newEntity, [ops]) ⇒ <code>Array</code>
Updates an existing entity in the index field.

**Kind**: instance method of [<code>MultiIndexField</code>](#MultiIndexField)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| oldEntity | <code>Object</code> |  | The existing entity to update. |
| newEntity | <code>Object</code> |  | The new entity data. |
| [ops] | <code>Array</code> | <code>[]</code> | Optional operations array to append to. |

<a name="IndexField+remove"></a>

### multiIndexField.remove(entity, [ops]) ⇒ <code>Array</code>
Removes an entity from the index field.

**Kind**: instance method of [<code>MultiIndexField</code>](#MultiIndexField)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| entity | <code>Object</code> |  | The entity to remove. |
| [ops] | <code>Array</code> | <code>[]</code> | Optional operations array to append to. |

<a name="IndexField+isMatch"></a>

### multiIndexField.isMatch(oldEntity, newEntity) ⇒ <code>boolean</code>
Checks if old and new entities match.

**Kind**: instance method of [<code>MultiIndexField</code>](#MultiIndexField)  
**Returns**: <code>boolean</code> - - Whether the old and new entities match.  

| Param | Type | Description |
| --- | --- | --- |
| oldEntity | <code>Object</code> | The old entity. |
| newEntity | <code>Object</code> | The new entity. |

<a name="SingleIndexField"></a>

## SingleIndexField ⇐ [<code>IndexField</code>](#IndexField)
Single index field class.

**Kind**: global class  
**Extends**: [<code>IndexField</code>](#IndexField)  

* [SingleIndexField](#SingleIndexField) ⇐ [<code>IndexField</code>](#IndexField)
    * [.path](#IndexField+path) ⇒ <code>Array.&lt;string&gt;</code>
    * [.find(query)](#SingleIndexField+find) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>
    * [.normalize(value)](#IndexField+normalize) ⇒ <code>any</code>
    * [.buildOps(type, entity, ops)](#IndexField+buildOps) ⇒ <code>Array</code>
    * [.add(entity, [ops])](#IndexField+add) ⇒ <code>Array</code>
    * [.update(oldEntity, newEntity, [ops])](#IndexField+update) ⇒ <code>Array</code>
    * [.remove(entity, [ops])](#IndexField+remove) ⇒ <code>Array</code>
    * [.getKeys(field)](#IndexField+getKeys) ⇒ <code>Array</code>
    * [.getPath(entity)](#IndexField+getPath) ⇒ <code>Array</code>
    * [.isMatch(oldEntity, newEntity)](#IndexField+isMatch) ⇒ <code>boolean</code>

<a name="IndexField+path"></a>

### singleIndexField.path ⇒ <code>Array.&lt;string&gt;</code>
Gets the path of the field.

**Kind**: instance property of [<code>SingleIndexField</code>](#SingleIndexField)  
**Returns**: <code>Array.&lt;string&gt;</code> - - The path.  
<a name="SingleIndexField+find"></a>

### singleIndexField.find(query) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>
Finds an entry in the index.

**Kind**: instance method of [<code>SingleIndexField</code>](#SingleIndexField)  
**Overrides**: [<code>find</code>](#IndexField+find)  
**Returns**: <code>Promise.&lt;Array.&lt;any&gt;&gt;</code> - - The search results.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>any</code> | Query to search for. |

<a name="IndexField+normalize"></a>

### singleIndexField.normalize(value) ⇒ <code>any</code>
Normalizes a value for indexing.

**Kind**: instance method of [<code>SingleIndexField</code>](#SingleIndexField)  
**Returns**: <code>any</code> - - The normalized value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value to normalize. |

<a name="IndexField+buildOps"></a>

### singleIndexField.buildOps(type, entity, ops) ⇒ <code>Array</code>
Builds operations for a specific type.

**Kind**: instance method of [<code>SingleIndexField</code>](#SingleIndexField)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of operation. |
| entity | <code>Object</code> | The entity to operate on. |
| ops | <code>Array</code> | The operations array. |

<a name="IndexField+add"></a>

### singleIndexField.add(entity, [ops]) ⇒ <code>Array</code>
Adds an entity to the index field.

**Kind**: instance method of [<code>SingleIndexField</code>](#SingleIndexField)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| entity | <code>Object</code> |  | The entity to add. |
| [ops] | <code>Array</code> | <code>[]</code> | Optional operations array to append to. |

<a name="IndexField+update"></a>

### singleIndexField.update(oldEntity, newEntity, [ops]) ⇒ <code>Array</code>
Updates an existing entity in the index field.

**Kind**: instance method of [<code>SingleIndexField</code>](#SingleIndexField)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| oldEntity | <code>Object</code> |  | The existing entity to update. |
| newEntity | <code>Object</code> |  | The new entity data. |
| [ops] | <code>Array</code> | <code>[]</code> | Optional operations array to append to. |

<a name="IndexField+remove"></a>

### singleIndexField.remove(entity, [ops]) ⇒ <code>Array</code>
Removes an entity from the index field.

**Kind**: instance method of [<code>SingleIndexField</code>](#SingleIndexField)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| entity | <code>Object</code> |  | The entity to remove. |
| [ops] | <code>Array</code> | <code>[]</code> | Optional operations array to append to. |

<a name="IndexField+getKeys"></a>

### singleIndexField.getKeys(field) ⇒ <code>Array</code>
Retrieves keys for the index field.

**Kind**: instance method of [<code>SingleIndexField</code>](#SingleIndexField)  
**Returns**: <code>Array</code> - - Returns the key array.  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | The field slug. |

<a name="IndexField+getPath"></a>

### singleIndexField.getPath(entity) ⇒ <code>Array</code>
Retrieves path based on the entity.

**Kind**: instance method of [<code>SingleIndexField</code>](#SingleIndexField)  
**Returns**: <code>Array</code> - - Returns the path array.  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>Object</code> | The entity to consider. |

<a name="IndexField+isMatch"></a>

### singleIndexField.isMatch(oldEntity, newEntity) ⇒ <code>boolean</code>
Checks if old and new entities match.

**Kind**: instance method of [<code>SingleIndexField</code>](#SingleIndexField)  
**Returns**: <code>boolean</code> - - Whether the old and new entities match.  

| Param | Type | Description |
| --- | --- | --- |
| oldEntity | <code>Object</code> | The old entity. |
| newEntity | <code>Object</code> | The new entity. |

<a name="TextIndexField"></a>

## TextIndexField ⇐ [<code>IndexField</code>](#IndexField)
Text index field class.

**Kind**: global class  
**Extends**: [<code>IndexField</code>](#IndexField)  

* [TextIndexField](#TextIndexField) ⇐ [<code>IndexField</code>](#IndexField)
    * [.path](#IndexField+path) ⇒ <code>Array.&lt;string&gt;</code>
    * [.getKeys(field)](#TextIndexField+getKeys) ⇒ <code>Array</code>
    * [.isMatch(oldEntity, newEntity)](#TextIndexField+isMatch) ⇒ <code>boolean</code>
    * [.buildOps(type, entity, ops)](#TextIndexField+buildOps) ⇒ <code>Array</code>
    * [.find(...query)](#TextIndexField+find) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>
    * [.normalize(value)](#IndexField+normalize) ⇒ <code>any</code>
    * [.add(entity, [ops])](#IndexField+add) ⇒ <code>Array</code>
    * [.update(oldEntity, newEntity, [ops])](#IndexField+update) ⇒ <code>Array</code>
    * [.remove(entity, [ops])](#IndexField+remove) ⇒ <code>Array</code>
    * [.getPath(entity)](#IndexField+getPath) ⇒ <code>Array</code>

<a name="IndexField+path"></a>

### textIndexField.path ⇒ <code>Array.&lt;string&gt;</code>
Gets the path of the field.

**Kind**: instance property of [<code>TextIndexField</code>](#TextIndexField)  
**Returns**: <code>Array.&lt;string&gt;</code> - - The path.  
<a name="TextIndexField+getKeys"></a>

### textIndexField.getKeys(field) ⇒ <code>Array</code>
Retrieves keys for the index field.

**Kind**: instance method of [<code>TextIndexField</code>](#TextIndexField)  
**Overrides**: [<code>getKeys</code>](#IndexField+getKeys)  
**Returns**: <code>Array</code> - - Returns the key array.  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | The field slug. |

<a name="TextIndexField+isMatch"></a>

### textIndexField.isMatch(oldEntity, newEntity) ⇒ <code>boolean</code>
Checks if old and new entities match.

**Kind**: instance method of [<code>TextIndexField</code>](#TextIndexField)  
**Overrides**: [<code>isMatch</code>](#IndexField+isMatch)  
**Returns**: <code>boolean</code> - - Whether the old and new entities match.  

| Param | Type | Description |
| --- | --- | --- |
| oldEntity | <code>Object</code> | The old entity. |
| newEntity | <code>Object</code> | The new entity. |

<a name="TextIndexField+buildOps"></a>

### textIndexField.buildOps(type, entity, ops) ⇒ <code>Array</code>
Builds operations for text-based fields.

**Kind**: instance method of [<code>TextIndexField</code>](#TextIndexField)  
**Overrides**: [<code>buildOps</code>](#IndexField+buildOps)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of operation. |
| entity | <code>Object</code> | The entity to operate on. |
| ops | <code>Array</code> | The operations array. |

<a name="TextIndexField+find"></a>

### textIndexField.find(...query) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>
Finds an entry in the index.

**Kind**: instance method of [<code>TextIndexField</code>](#TextIndexField)  
**Overrides**: [<code>find</code>](#IndexField+find)  
**Returns**: <code>Promise.&lt;Array.&lt;any&gt;&gt;</code> - - The search results.  

| Param | Type | Description |
| --- | --- | --- |
| ...query | <code>any</code> | Query to search for. |

<a name="IndexField+normalize"></a>

### textIndexField.normalize(value) ⇒ <code>any</code>
Normalizes a value for indexing.

**Kind**: instance method of [<code>TextIndexField</code>](#TextIndexField)  
**Returns**: <code>any</code> - - The normalized value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value to normalize. |

<a name="IndexField+add"></a>

### textIndexField.add(entity, [ops]) ⇒ <code>Array</code>
Adds an entity to the index field.

**Kind**: instance method of [<code>TextIndexField</code>](#TextIndexField)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| entity | <code>Object</code> |  | The entity to add. |
| [ops] | <code>Array</code> | <code>[]</code> | Optional operations array to append to. |

<a name="IndexField+update"></a>

### textIndexField.update(oldEntity, newEntity, [ops]) ⇒ <code>Array</code>
Updates an existing entity in the index field.

**Kind**: instance method of [<code>TextIndexField</code>](#TextIndexField)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| oldEntity | <code>Object</code> |  | The existing entity to update. |
| newEntity | <code>Object</code> |  | The new entity data. |
| [ops] | <code>Array</code> | <code>[]</code> | Optional operations array to append to. |

<a name="IndexField+remove"></a>

### textIndexField.remove(entity, [ops]) ⇒ <code>Array</code>
Removes an entity from the index field.

**Kind**: instance method of [<code>TextIndexField</code>](#TextIndexField)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| entity | <code>Object</code> |  | The entity to remove. |
| [ops] | <code>Array</code> | <code>[]</code> | Optional operations array to append to. |

<a name="IndexField+getPath"></a>

### textIndexField.getPath(entity) ⇒ <code>Array</code>
Retrieves path based on the entity.

**Kind**: instance method of [<code>TextIndexField</code>](#TextIndexField)  
**Returns**: <code>Array</code> - - Returns the path array.  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>Object</code> | The entity to consider. |

<a name="IndexFactory"></a>

## IndexFactory
Factory class for generating index fields.

**Kind**: global class  

* [IndexFactory](#IndexFactory)
    * [new IndexFactory(index)](#new_IndexFactory_new)
    * [.getFieldKey(slug)](#IndexFactory+getFieldKey) ⇒ <code>string</code>
    * [.getFieldType(slug)](#IndexFactory+getFieldType) ⇒ <code>Object</code>
    * [.createField(definition)](#IndexFactory+createField) ⇒ [<code>IndexField</code>](#IndexField)

<a name="new_IndexFactory_new"></a>

### new IndexFactory(index)

| Param | Type | Description |
| --- | --- | --- |
| index | [<code>Index</code>](#Index) | The main index instance. |

<a name="IndexFactory+getFieldKey"></a>

### indexFactory.getFieldKey(slug) ⇒ <code>string</code>
Generates a key for the given slug.

**Kind**: instance method of [<code>IndexFactory</code>](#IndexFactory)  
**Returns**: <code>string</code> - - The generated key.  

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>string</code> | Slug to generate key from. |

<a name="IndexFactory+getFieldType"></a>

### indexFactory.getFieldType(slug) ⇒ <code>Object</code>
Determines the type of the field.

**Kind**: instance method of [<code>IndexFactory</code>](#IndexFactory)  
**Returns**: <code>Object</code> - - The configuration object.  

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>string</code> | The field slug. |

<a name="IndexFactory+createField"></a>

### indexFactory.createField(definition) ⇒ [<code>IndexField</code>](#IndexField)
Creates an index field.

**Kind**: instance method of [<code>IndexFactory</code>](#IndexFactory)  
**Returns**: [<code>IndexField</code>](#IndexField) - - The created index field.  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>string</code> | The field definition. |

<a name="IndexField"></a>

## IndexField
Base class for index fields.

**Kind**: global class  

* [IndexField](#IndexField)
    * [new IndexField(index, config)](#new_IndexField_new)
    * [.path](#IndexField+path) ⇒ <code>Array.&lt;string&gt;</code>
    * [.normalize(value)](#IndexField+normalize) ⇒ <code>any</code>
    * [.buildOps(type, entity, ops)](#IndexField+buildOps) ⇒ <code>Array</code>
    * [.add(entity, [ops])](#IndexField+add) ⇒ <code>Array</code>
    * [.update(oldEntity, newEntity, [ops])](#IndexField+update) ⇒ <code>Array</code>
    * [.remove(entity, [ops])](#IndexField+remove) ⇒ <code>Array</code>
    * [.getKeys(field)](#IndexField+getKeys) ⇒ <code>Array</code>
    * [.getPath(entity)](#IndexField+getPath) ⇒ <code>Array</code>
    * [.isMatch(oldEntity, newEntity)](#IndexField+isMatch) ⇒ <code>boolean</code>
    * [.find(...query)](#IndexField+find) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>

<a name="new_IndexField_new"></a>

### new IndexField(index, config)

| Param | Type | Description |
| --- | --- | --- |
| index | [<code>Index</code>](#Index) | The main index instance. |
| config | <code>Object</code> | The field configuration. |

<a name="IndexField+path"></a>

### indexField.path ⇒ <code>Array.&lt;string&gt;</code>
Gets the path of the field.

**Kind**: instance property of [<code>IndexField</code>](#IndexField)  
**Returns**: <code>Array.&lt;string&gt;</code> - - The path.  
<a name="IndexField+normalize"></a>

### indexField.normalize(value) ⇒ <code>any</code>
Normalizes a value for indexing.

**Kind**: instance method of [<code>IndexField</code>](#IndexField)  
**Returns**: <code>any</code> - - The normalized value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value to normalize. |

<a name="IndexField+buildOps"></a>

### indexField.buildOps(type, entity, ops) ⇒ <code>Array</code>
Builds operations for a specific type.

**Kind**: instance method of [<code>IndexField</code>](#IndexField)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of operation. |
| entity | <code>Object</code> | The entity to operate on. |
| ops | <code>Array</code> | The operations array. |

<a name="IndexField+add"></a>

### indexField.add(entity, [ops]) ⇒ <code>Array</code>
Adds an entity to the index field.

**Kind**: instance method of [<code>IndexField</code>](#IndexField)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| entity | <code>Object</code> |  | The entity to add. |
| [ops] | <code>Array</code> | <code>[]</code> | Optional operations array to append to. |

<a name="IndexField+update"></a>

### indexField.update(oldEntity, newEntity, [ops]) ⇒ <code>Array</code>
Updates an existing entity in the index field.

**Kind**: instance method of [<code>IndexField</code>](#IndexField)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| oldEntity | <code>Object</code> |  | The existing entity to update. |
| newEntity | <code>Object</code> |  | The new entity data. |
| [ops] | <code>Array</code> | <code>[]</code> | Optional operations array to append to. |

<a name="IndexField+remove"></a>

### indexField.remove(entity, [ops]) ⇒ <code>Array</code>
Removes an entity from the index field.

**Kind**: instance method of [<code>IndexField</code>](#IndexField)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| entity | <code>Object</code> |  | The entity to remove. |
| [ops] | <code>Array</code> | <code>[]</code> | Optional operations array to append to. |

<a name="IndexField+getKeys"></a>

### indexField.getKeys(field) ⇒ <code>Array</code>
Retrieves keys for the index field.

**Kind**: instance method of [<code>IndexField</code>](#IndexField)  
**Returns**: <code>Array</code> - - Returns the key array.  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | The field slug. |

<a name="IndexField+getPath"></a>

### indexField.getPath(entity) ⇒ <code>Array</code>
Retrieves path based on the entity.

**Kind**: instance method of [<code>IndexField</code>](#IndexField)  
**Returns**: <code>Array</code> - - Returns the path array.  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>Object</code> | The entity to consider. |

<a name="IndexField+isMatch"></a>

### indexField.isMatch(oldEntity, newEntity) ⇒ <code>boolean</code>
Checks if old and new entities match.

**Kind**: instance method of [<code>IndexField</code>](#IndexField)  
**Returns**: <code>boolean</code> - - Whether the old and new entities match.  

| Param | Type | Description |
| --- | --- | --- |
| oldEntity | <code>Object</code> | The old entity. |
| newEntity | <code>Object</code> | The new entity. |

<a name="IndexField+find"></a>

### indexField.find(...query) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>
Finds an entry in the index.

**Kind**: instance method of [<code>IndexField</code>](#IndexField)  
**Returns**: <code>Promise.&lt;Array.&lt;any&gt;&gt;</code> - - The search results.  

| Param | Type | Description |
| --- | --- | --- |
| ...query | <code>any</code> | Query to search for. |

<a name="Index"></a>

## Index
Main Index Class.

**Kind**: global class  

* [Index](#Index)
    * [new Index(storage, fields, opts)](#new_Index_new)
    * [.reducer(entity)](#Index+reducer) ⇒ <code>any</code>
    * [.by(slug)](#Index+by) ⇒ [<code>Index</code>](#Index)
    * [.dispatch(op, ...args)](#Index+dispatch) ⇒ <code>Promise</code>
    * [.buildAdd(entity, ops)](#Index+buildAdd) ⇒ <code>Array</code>
    * [.add(entity)](#Index+add) ⇒ <code>Promise</code>
    * [.buildRemove(entity, ops)](#Index+buildRemove) ⇒ <code>Array</code>
    * [.remove(entity)](#Index+remove) ⇒ <code>Promise</code>
    * [.buildUpdate(oldEntity, newEntity, ops)](#Index+buildUpdate) ⇒ <code>Array</code>
    * [.update(oldEntity, newEntity)](#Index+update) ⇒ <code>Promise</code>
    * [.find(query, ...values)](#Index+find) ⇒ <code>Promise</code>

<a name="new_Index_new"></a>

### new Index(storage, fields, opts)

| Param | Type | Description |
| --- | --- | --- |
| storage | <code>Object</code> | The storage engine. |
| fields | <code>Array.&lt;string&gt;</code> | Fields to index. |
| opts | <code>Object</code> | Options object. |

<a name="Index+reducer"></a>

### index.reducer(entity) ⇒ <code>any</code>
Default reducer function to extract id from an entity.

**Kind**: instance method of [<code>Index</code>](#Index)  
**Returns**: <code>any</code> - - The id of the entity.  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>Object</code> | The entity to extract an id from. |

<a name="Index+by"></a>

### index.by(slug) ⇒ [<code>Index</code>](#Index)
Adds a field to the index.

**Kind**: instance method of [<code>Index</code>](#Index)  
**Returns**: [<code>Index</code>](#Index) - - Returns the index instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>string</code> | The field slug. |

<a name="Index+dispatch"></a>

### index.dispatch(op, ...args) ⇒ <code>Promise</code>
Dispatches a batch operation.

**Kind**: instance method of [<code>Index</code>](#Index)  
**Returns**: <code>Promise</code> - - Returns a promise.  

| Param | Type | Description |
| --- | --- | --- |
| op | <code>string</code> | The operation type. |
| ...args | <code>any</code> | The arguments for the operation. |

<a name="Index+buildAdd"></a>

### index.buildAdd(entity, ops) ⇒ <code>Array</code>
Builds a list of 'add' operations for an entity.

**Kind**: instance method of [<code>Index</code>](#Index)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>Object</code> | The entity to add. |
| ops | <code>Array</code> | The operations array. |

<a name="Index+add"></a>

### index.add(entity) ⇒ <code>Promise</code>
Adds an entity to the index.

**Kind**: instance method of [<code>Index</code>](#Index)  
**Returns**: <code>Promise</code> - - Returns a promise.  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>Object</code> | The entity to add. |

<a name="Index+buildRemove"></a>

### index.buildRemove(entity, ops) ⇒ <code>Array</code>
Builds a list of 'remove' operations for an entity.

**Kind**: instance method of [<code>Index</code>](#Index)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>Object</code> | The entity to remove. |
| ops | <code>Array</code> | The operations array. |

<a name="Index+remove"></a>

### index.remove(entity) ⇒ <code>Promise</code>
Removes an entity from the index.

**Kind**: instance method of [<code>Index</code>](#Index)  
**Returns**: <code>Promise</code> - - Returns a promise.  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>Object</code> | The entity to remove. |

<a name="Index+buildUpdate"></a>

### index.buildUpdate(oldEntity, newEntity, ops) ⇒ <code>Array</code>
Builds a list of 'update' operations for an entity.

**Kind**: instance method of [<code>Index</code>](#Index)  
**Returns**: <code>Array</code> - - The updated operations array.  

| Param | Type | Description |
| --- | --- | --- |
| oldEntity | <code>Object</code> | The old entity. |
| newEntity | <code>Object</code> | The new entity. |
| ops | <code>Array</code> | The operations array. |

<a name="Index+update"></a>

### index.update(oldEntity, newEntity) ⇒ <code>Promise</code>
Updates an entity in the index.

**Kind**: instance method of [<code>Index</code>](#Index)  
**Returns**: <code>Promise</code> - - Returns a promise.  

| Param | Type | Description |
| --- | --- | --- |
| oldEntity | <code>Object</code> | The old entity. |
| newEntity | <code>Object</code> | The new entity. |

<a name="Index+find"></a>

### index.find(query, ...values) ⇒ <code>Promise</code>
Finds entities based on a query.

**Kind**: instance method of [<code>Index</code>](#Index)  
**Returns**: <code>Promise</code> - - Returns a promise with found entities.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> \| <code>Object</code> | The query string or object. |
| ...values | <code>any</code> | Additional query parameters. |

