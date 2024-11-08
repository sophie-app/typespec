import type {
  DecoratorContext,
  Enum,
  EnumValue,
  Interface,
  Model,
  ModelProperty,
  Namespace,
  Numeric,
  Operation,
  Scalar,
  Type,
  Union,
  UnionVariant,
} from "../src/index.js";

export interface ExampleOptions {
  readonly title?: string;
  readonly description?: string;
}

export interface OperationExample {
  readonly parameters?: unknown;
  readonly returnType?: unknown;
}

/**
 * Specify how to encode the target type.
 *
 * @param encodingOrEncodeAs Known name of an encoding or a scalar type to encode as(Only for numeric types to encode as string).
 * @param encodedAs What target type is this being encoded as. Default to string.
 * @example offsetDateTime encoded with rfc7231
 *
 * ```tsp
 * @encode("rfc7231")
 * scalar myDateTime extends offsetDateTime;
 * ```
 * @example utcDateTime encoded with unixTimestamp
 *
 * ```tsp
 * @encode("unixTimestamp", int32)
 * scalar myDateTime extends unixTimestamp;
 * ```
 * @example encode numeric type to string
 *
 * ```tsp
 * model Pet {
 *   @encode(string) id: int64;
 * }
 * ```
 */
export type EncodeDecorator = (
  context: DecoratorContext,
  target: Scalar | ModelProperty,
  encodingOrEncodeAs: Scalar | string | EnumValue,
  encodedAs?: Scalar,
) => void;

/**
 * Attach a documentation string.
 *
 * @param doc Documentation string
 * @param formatArgs Record with key value pair that can be interpolated in the doc.
 * @example
 * ```typespec
 * @doc("Represent a Pet available in the PetStore")
 * model Pet {}
 * ```
 */
export type DocDecorator = (
  context: DecoratorContext,
  target: Type,
  doc: string,
  formatArgs?: Type,
) => void;

/**
 * Returns the model with required properties removed.
 */
export type WithOptionalPropertiesDecorator = (context: DecoratorContext, target: Model) => void;

/**
 * Returns the model with non-updateable properties removed.
 */
export type WithUpdateablePropertiesDecorator = (context: DecoratorContext, target: Model) => void;

/**
 * Returns the model with the given properties omitted.
 *
 * @param omit List of properties to omit
 */
export type WithoutOmittedPropertiesDecorator = (
  context: DecoratorContext,
  target: Model,
  omit: Type,
) => void;

/**
 * Returns the model with only the given properties included.
 *
 * @param pick List of properties to include
 */
export type WithPickedPropertiesDecorator = (
  context: DecoratorContext,
  target: Model,
  pick: Type,
) => void;

/**
 * Returns the model with any default values removed.
 */
export type WithoutDefaultValuesDecorator = (context: DecoratorContext, target: Model) => void;

/**
 * Set the visibility of key properties in a model if not already set.
 *
 * @param visibility The desired default visibility value. If a key property already has a `visibility` decorator then the default visibility is not applied.
 */
export type WithDefaultKeyVisibilityDecorator = (
  context: DecoratorContext,
  target: Model,
  visibility: string,
) => void;

/**
 * Typically a short, single-line description.
 *
 * @param summary Summary string.
 * @example
 * ```typespec
 * @summary("This is a pet")
 * model Pet {}
 * ```
 */
export type SummaryDecorator = (context: DecoratorContext, target: Type, summary: string) => void;

/**
 * Attach a documentation string to describe the successful return types of an operation.
 * If an operation returns a union of success and errors it only describes the success. See `@errorsDoc` for error documentation.
 *
 * @param doc Documentation string
 * @example
 * ```typespec
 * @returnsDoc("Returns doc")
 * op get(): Pet | NotFound;
 * ```
 */
export type ReturnsDocDecorator = (
  context: DecoratorContext,
  target: Operation,
  doc: string,
) => void;

/**
 * Attach a documentation string to describe the error return types of an operation.
 * If an operation returns a union of success and errors it only describes the errors. See `@returnsDoc` for success documentation.
 *
 * @param doc Documentation string
 * @example
 * ```typespec
 * @errorsDoc("Errors doc")
 * op get(): Pet | NotFound;
 * ```
 */
export type ErrorsDocDecorator = (
  context: DecoratorContext,
  target: Operation,
  doc: string,
) => void;

/**
 * Mark this type as deprecated.
 *
 * NOTE: This decorator **should not** be used, use the `#deprecated` directive instead.
 *
 * @deprecated Use the `#deprecated` directive instead.
 * @param message Deprecation message.
 * @example
 * Use the `#deprecated` directive instead:
 *
 * ```typespec
 * #deprecated "Use ActionV2"
 * op Action<Result>(): Result;
 * ```
 */
export type DeprecatedDecorator = (
  context: DecoratorContext,
  target: Type,
  message: string,
) => void;

/**
 * Mark this namespace as describing a service and configure service properties.
 *
 * @param options Optional configuration for the service.
 * @example
 * ```typespec
 * @service
 * namespace PetStore;
 * ```
 * @example Setting service title
 * ```typespec
 * @service({title: "Pet store"})
 * namespace PetStore;
 * ```
 * @example Setting service version
 * ```typespec
 * @service({version: "1.0"})
 * namespace PetStore;
 * ```
 */
export type ServiceDecorator = (
  context: DecoratorContext,
  target: Namespace,
  options?: Type,
) => void;

/**
 * Specify that this model is an error type. Operations return error types when the operation has failed.
 *
 * @example
 * ```typespec
 * @error
 * model PetStoreError {
 *   code: string;
 *   message: string;
 * }
 * ```
 */
export type ErrorDecorator = (context: DecoratorContext, target: Model) => void;

/**
 * Specify a known data format hint for this string type. For example `uuid`, `uri`, etc.
 * This differs from the `@pattern` decorator which is meant to specify a regular expression while `@format` accepts a known format name.
 * The format names are open ended and are left to emitter to interpret.
 *
 * @param format format name.
 * @example
 * ```typespec
 * @format("uuid")
 * scalar uuid extends string;
 * ```
 */
export type FormatDecorator = (
  context: DecoratorContext,
  target: Scalar | ModelProperty,
  format: string,
) => void;

/**
 * Specify the the pattern this string should respect using simple regular expression syntax.
 * The following syntax is allowed: alternations (`|`), quantifiers (`?`, `*`, `+`, and `{ }`), wildcard (`.`), and grouping parentheses.
 * Advanced features like look-around, capture groups, and references are not supported.
 *
 * This decorator may optionally provide a custom validation _message_. Emitters may choose to use the message to provide
 * context when pattern validation fails. For the sake of consistency, the message should be a phrase that describes in
 * plain language what sort of content the pattern attempts to validate. For example, a complex regular expression that
 * validates a GUID string might have a message like "Must be a valid GUID."
 *
 * @param pattern Regular expression.
 * @param validationMessage Optional validation message that may provide context when validation fails.
 * @example
 * ```typespec
 * @pattern("[a-z]+", "Must be a string consisting of only lower case letters and of at least one character.")
 * scalar LowerAlpha extends string;
 * ```
 */
export type PatternDecorator = (
  context: DecoratorContext,
  target: Scalar | ModelProperty,
  pattern: string,
  validationMessage?: string,
) => void;

/**
 * Specify the minimum length this string type should be.
 *
 * @param value Minimum length
 * @example
 * ```typespec
 * @minLength(2)
 * scalar Username extends string;
 * ```
 */
export type MinLengthDecorator = (
  context: DecoratorContext,
  target: Scalar | ModelProperty,
  value: Numeric,
) => void;

/**
 * Specify the maximum length this string type should be.
 *
 * @param value Maximum length
 * @example
 * ```typespec
 * @maxLength(20)
 * scalar Username extends string;
 * ```
 */
export type MaxLengthDecorator = (
  context: DecoratorContext,
  target: Scalar | ModelProperty,
  value: Numeric,
) => void;

/**
 * Specify the minimum number of items this array should have.
 *
 * @param value Minimum number
 * @example
 * ```typespec
 * @minItems(1)
 * model Endpoints is string[];
 * ```
 */
export type MinItemsDecorator = (
  context: DecoratorContext,
  target: Type | ModelProperty,
  value: Numeric,
) => void;

/**
 * Specify the maximum number of items this array should have.
 *
 * @param value Maximum number
 * @example
 * ```typespec
 * @maxItems(5)
 * model Endpoints is string[];
 * ```
 */
export type MaxItemsDecorator = (
  context: DecoratorContext,
  target: Type | ModelProperty,
  value: Numeric,
) => void;

/**
 * Specify the minimum value this numeric type should be.
 *
 * @param value Minimum value
 * @example
 * ```typespec
 * @minValue(18)
 * scalar Age is int32;
 * ```
 */
export type MinValueDecorator = (
  context: DecoratorContext,
  target: Scalar | ModelProperty,
  value: Numeric,
) => void;

/**
 * Specify the maximum value this numeric type should be.
 *
 * @param value Maximum value
 * @example
 * ```typespec
 * @maxValue(200)
 * scalar Age is int32;
 * ```
 */
export type MaxValueDecorator = (
  context: DecoratorContext,
  target: Scalar | ModelProperty,
  value: Numeric,
) => void;

/**
 * Specify the minimum value this numeric type should be, exclusive of the given
 * value.
 *
 * @param value Minimum value
 * @example
 * ```typespec
 * @minValueExclusive(0)
 * scalar distance is float64;
 * ```
 */
export type MinValueExclusiveDecorator = (
  context: DecoratorContext,
  target: Scalar | ModelProperty,
  value: Numeric,
) => void;

/**
 * Specify the maximum value this numeric type should be, exclusive of the given
 * value.
 *
 * @param value Maximum value
 * @example
 * ```typespec
 * @maxValueExclusive(50)
 * scalar distance is float64;
 * ```
 */
export type MaxValueExclusiveDecorator = (
  context: DecoratorContext,
  target: Scalar | ModelProperty,
  value: Numeric,
) => void;

/**
 * Mark this string as a secret value that should be treated carefully to avoid exposure
 *
 * @example
 * ```typespec
 * @secret
 * scalar Password is string;
 * ```
 */
export type SecretDecorator = (context: DecoratorContext, target: Scalar | ModelProperty) => void;

/**
 * Attaches a tag to an operation, interface, or namespace. Multiple `@tag` decorators can be specified to attach multiple tags to a TypeSpec element.
 *
 * @param tag Tag value
 */
export type TagDecorator = (
  context: DecoratorContext,
  target: Namespace | Interface | Operation,
  tag: string,
) => void;

/**
 * Specifies how a templated type should name their instances.
 *
 * @param name name the template instance should take
 * @param formatArgs Model with key value used to interpolate the name
 * @example
 * ```typespec
 * @friendlyName("{name}List", T)
 * model List<Item> {
 *   value: Item[];
 *   nextLink: string;
 * }
 * ```
 */
export type FriendlyNameDecorator = (
  context: DecoratorContext,
  target: Type,
  name: string,
  formatArgs?: Type,
) => void;

/**
 * Provide a set of known values to a string type.
 *
 * @param values Known values enum.
 * @example
 * ```typespec
 * @knownValues(KnownErrorCode)
 * scalar ErrorCode extends string;
 *
 * enum KnownErrorCode {
 *   NotFound,
 *   Invalid,
 * }
 * ```
 */
export type KnownValuesDecorator = (
  context: DecoratorContext,
  target: Scalar | ModelProperty,
  values: Enum,
) => void;

/**
 * Mark a model property as the key to identify instances of that type
 *
 * @param altName Name of the property. If not specified, the decorated property name is used.
 * @example
 * ```typespec
 * model Pet {
 *   @key id: string;
 * }
 * ```
 */
export type KeyDecorator = (
  context: DecoratorContext,
  target: ModelProperty,
  altName?: string,
) => void;

/**
 * Specify this operation is an overload of the given operation.
 *
 * @param overloadbase Base operation that should be a union of all overloads
 * @example
 * ```typespec
 * op upload(data: string | bytes, @header contentType: "text/plain" | "application/octet-stream"): void;
 * @overload(upload)
 * op uploadString(data: string, @header contentType: "text/plain" ): void;
 * @overload(upload)
 * op uploadBytes(data: bytes, @header contentType: "application/octet-stream"): void;
 * ```
 */
export type OverloadDecorator = (
  context: DecoratorContext,
  target: Operation,
  overloadbase: Operation,
) => void;

/**
 * DEPRECATED: Use `@encodedName` instead.
 *
 * Provide an alternative name for this type.
 *
 * @param targetName Projection target
 * @param projectedName Alternative name
 * @example
 * ```typespec
 * model Certificate {
 *   @projectedName("json", "exp")
 *   expireAt: int32;
 * }
 * ```
 */
export type ProjectedNameDecorator = (
  context: DecoratorContext,
  target: Type,
  targetName: string,
  projectedName: string,
) => void;

/**
 * Provide an alternative name for this type when serialized to the given mime type.
 *
 * @param mimeType Mime type this should apply to. The mime type should be a known mime type as described here https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types without any suffix (e.g. `+json`)
 * @param name Alternative name
 * @example
 * ```typespec
 * model Certificate {
 *   @encodedName("application/json", "exp")
 *   @encodedName("application/xml", "expiry")
 *   expireAt: int32;
 * }
 * ```
 * @example Invalid values
 *
 * ```typespec
 * @encodedName("application/merge-patch+json", "exp")
 *              ^ error cannot use subtype
 * ```
 */
export type EncodedNameDecorator = (
  context: DecoratorContext,
  target: Type,
  mimeType: string,
  name: string,
) => void;

/**
 * Specify the property to be used to discriminate this type.
 *
 * @param propertyName The property name to use for discrimination
 * @example
 * ```typespec
 * @discriminator("kind")
 * union Pet{ cat: Cat, dog: Dog }
 *
 * model Cat {kind: "cat", meow: boolean}
 * model Dog {kind: "dog", bark: boolean}
 * ```
 *
 * ```typespec
 * @discriminator("kind")
 * model Pet{ kind: string }
 *
 * model Cat extends Pet {kind: "cat", meow: boolean}
 * model Dog extends Pet  {kind: "dog", bark: boolean}
 * ```
 */
export type DiscriminatorDecorator = (
  context: DecoratorContext,
  target: Model | Union,
  propertyName: string,
) => void;

/**
 * Provide an example value for a data type.
 *
 * @param example Example value.
 * @param options Optional metadata for the example.
 * @example
 * ```tsp
 * @example(#{name: "Fluffy", age: 2})
 * model Pet {
 *  name: string;
 *  age: int32;
 * }
 * ```
 */
export type ExampleDecorator = (
  context: DecoratorContext,
  target: Model | Enum | Scalar | Union | ModelProperty | UnionVariant,
  example: unknown,
  options?: ExampleOptions,
) => void;

/**
 * Provide example values for an operation's parameters and corresponding return type.
 *
 * @param example Example value.
 * @param options Optional metadata for the example.
 * @example
 * ```tsp
 * @opExample(#{parameters: #{name: "Fluffy", age: 2}, returnType: #{name: "Fluffy", age: 2, id: "abc"})
 * op createPet(pet: Pet): Pet;
 * ```
 */
export type OpExampleDecorator = (
  context: DecoratorContext,
  target: Operation,
  example: OperationExample,
  options?: ExampleOptions,
) => void;

/**
 * Indicates that a property is only considered to be present or applicable ("visible") with
 * the in the given named contexts ("visibilities"). When a property has no visibilities applied
 * to it, it is implicitly visible always.
 *
 * As far as the TypeSpec core library is concerned, visibilities are open-ended and can be arbitrary
 * strings, but  the following visibilities are well-known to standard libraries and should be used
 * with standard emitters that interpret them as follows:
 *
 * - "read": output of any operation.
 * - "create": input to operations that create an entity..
 * - "query": input to operations that read data.
 * - "update": input to operations that update data.
 * - "delete": input to operations that delete data.
 *
 * See also: [Automatic visibility](https://typespec.io/docs/libraries/http/operations#automatic-visibility)
 *
 * @param visibilities List of visibilities which apply to this property.
 * @example
 * ```typespec
 * model Dog {
 *   // the service will generate an ID, so you don't need to send it.
 *   @visibility("read") id: int32;
 *   // the service will store this secret name, but won't ever return it
 *   @visibility("create", "update") secretName: string;
 *   // the regular name is always present
 *   name: string;
 * }
 * ```
 */
export type VisibilityDecorator = (
  context: DecoratorContext,
  target: ModelProperty,
  ...visibilities: string[]
) => void;

/**
 * Removes properties that are not considered to be present or applicable
 * ("visible") in the given named contexts ("visibilities"). Can be used
 * together with spread to effectively spread only visible properties into
 * a new model.
 *
 * See also: [Automatic visibility](https://typespec.io/docs/libraries/http/operations#automatic-visibility)
 *
 * When using an emitter that applies visibility automatically, it is generally
 * not necessary to use this decorator.
 *
 * @param visibilities List of visibilities which apply to this property.
 * @example
 * ```typespec
 * model Dog {
 *   @visibility("read") id: int32;
 *   @visibility("create", "update") secretName: string;
 *   name: string;
 * }
 *
 * // The spread operator will copy all the properties of Dog into DogRead,
 * // and @withVisibility will then remove those that are not visible with
 * // create or update visibility.
 * //
 * // In this case, the id property is removed, and the name and secretName
 * // properties are kept.
 * @withVisibility("create", "update")
 * model DogCreateOrUpdate {
 *   ...Dog;
 * }
 *
 * // In this case the id and name properties are kept and the secretName property
 * // is removed.
 * @withVisibility("read")
 * model DogRead {
 *   ...Dog;
 * }
 * ```
 */
export type WithVisibilityDecorator = (
  context: DecoratorContext,
  target: Model,
  ...visibilities: string[]
) => void;

/**
 * Mark this operation as a `list` operation that returns a paginated list of items.
 */
export type ListDecorator = (context: DecoratorContext, target: Operation) => void;

/**
 * Pagination property defining the number of items to skip.
 *
 * @example
 * ```tsp
 * model Page<T> {
 *   @pageItems items: T[];
 * }
 * @list op listPets(@offset skip: int32, @pageSize pageSize: int8): Page<Pet>;
 * ```
 */
export type OffsetDecorator = (context: DecoratorContext, target: ModelProperty) => void;

/**
 * Pagination property defining the page index.
 *
 * @example
 * ```tsp
 * model Page<T> {
 *   @pageItems items: T[];
 * }
 * @list op listPets(@pageIndex page: int32, @pageSize pageSize: int8): Page<Pet>;
 * ```
 */
export type PageIndexDecorator = (context: DecoratorContext, target: ModelProperty) => void;

/**
 * Specify the pagination parameter that controls the maximum number of items to include in a page.
 *
 * @example
 * ```tsp
 * model Page<T> {
 *   @pageItems items: T[];
 * }
 * @list op listPets(@pageIndex page: int32, @pageSize pageSize: int8): Page<Pet>;
 * ```
 */
export type PageSizeDecorator = (context: DecoratorContext, target: ModelProperty) => void;

/**
 * Specify the the property that contains the array of page items.
 *
 * @example
 * ```tsp
 * model Page<T> {
 *   @pageItems items: T[];
 * }
 * @list op listPets(@pageIndex page: int32, @pageSize pageSize: int8): Page<Pet>;
 * ```
 */
export type PageItemsDecorator = (context: DecoratorContext, target: ModelProperty) => void;

/**
 * Pagination property defining the token to get to the next page.
 * It MUST be specified both on the request parameter and the response.
 *
 * @example
 * ```tsp
 * model Page<T> {
 *   @pageItems items: T[];
 *   @continuationToken continuationToken: string;
 * }
 * @list op listPets(@continuationToken continuationToken: string): Page<Pet>;
 * ```
 */
export type ContinuationTokenDecorator = (context: DecoratorContext, target: ModelProperty) => void;

/**
 * Pagination property defining a link to the next page.
 *
 * It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.
 *
 * @example
 * ```tsp
 * model Page<T> {
 *   @pageItems items: T[];
 *   @nextLink next: url;
 *   @prevLink prev: url;
 *   @firstLink first: url;
 *   @lastLink last: url;
 * }
 * @list op listPets(): Page<Pet>;
 * ```
 */
export type NextLinkDecorator = (context: DecoratorContext, target: ModelProperty) => void;

/**
 * Pagination property defining a link to the previous page.
 *
 * It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.
 *
 * @example
 * ```tsp
 * model Page<T> {
 *   @pageItems items: T[];
 *   @nextLink next: url;
 *   @prevLink prev: url;
 *   @firstLink first: url;
 *   @lastLink last: url;
 * }
 * @list op listPets(): Page<Pet>;
 * ```
 */
export type PrevLinkDecorator = (context: DecoratorContext, target: ModelProperty) => void;

/**
 * Pagination property defining a link to the first page.
 *
 * It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.
 *
 * @example
 * ```tsp
 * model Page<T> {
 *   @pageItems items: T[];
 *   @nextLink next: url;
 *   @prevLink prev: url;
 *   @firstLink first: url;
 *   @lastLink last: url;
 * }
 * @list op listPets(): Page<Pet>;
 * ```
 */
export type FirstLinkDecorator = (context: DecoratorContext, target: ModelProperty) => void;

/**
 * Pagination property defining a link to the last page.
 *
 * It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.
 *
 * @example
 * ```tsp
 * model Page<T> {
 *   @pageItems items: T[];
 *   @nextLink next: url;
 *   @prevLink prev: url;
 *   @firstLink first: url;
 *   @lastLink last: url;
 * }
 * @list op listPets(): Page<Pet>;
 * ```
 */
export type LastLinkDecorator = (context: DecoratorContext, target: ModelProperty) => void;

/**
 * A debugging decorator used to inspect a type.
 *
 * @param text Custom text to log
 */
export type InspectTypeDecorator = (context: DecoratorContext, target: Type, text: string) => void;

/**
 * A debugging decorator used to inspect a type name.
 *
 * @param text Custom text to log
 */
export type InspectTypeNameDecorator = (
  context: DecoratorContext,
  target: Type,
  text: string,
) => void;

/**
 * Sets which visibilities apply to parameters for the given operation.
 *
 * @param visibilities List of visibility strings which apply to this operation.
 */
export type ParameterVisibilityDecorator = (
  context: DecoratorContext,
  target: Operation,
  ...visibilities: string[]
) => void;

/**
 * Sets which visibilities apply to the return type for the given operation.
 *
 * @param visibilities List of visibility strings which apply to this operation.
 */
export type ReturnTypeVisibilityDecorator = (
  context: DecoratorContext,
  target: Operation,
  ...visibilities: string[]
) => void;

export type TypeSpecDecorators = {
  encode: EncodeDecorator;
  doc: DocDecorator;
  withOptionalProperties: WithOptionalPropertiesDecorator;
  withUpdateableProperties: WithUpdateablePropertiesDecorator;
  withoutOmittedProperties: WithoutOmittedPropertiesDecorator;
  withPickedProperties: WithPickedPropertiesDecorator;
  withoutDefaultValues: WithoutDefaultValuesDecorator;
  withDefaultKeyVisibility: WithDefaultKeyVisibilityDecorator;
  summary: SummaryDecorator;
  returnsDoc: ReturnsDocDecorator;
  errorsDoc: ErrorsDocDecorator;
  deprecated: DeprecatedDecorator;
  service: ServiceDecorator;
  error: ErrorDecorator;
  format: FormatDecorator;
  pattern: PatternDecorator;
  minLength: MinLengthDecorator;
  maxLength: MaxLengthDecorator;
  minItems: MinItemsDecorator;
  maxItems: MaxItemsDecorator;
  minValue: MinValueDecorator;
  maxValue: MaxValueDecorator;
  minValueExclusive: MinValueExclusiveDecorator;
  maxValueExclusive: MaxValueExclusiveDecorator;
  secret: SecretDecorator;
  tag: TagDecorator;
  friendlyName: FriendlyNameDecorator;
  knownValues: KnownValuesDecorator;
  key: KeyDecorator;
  overload: OverloadDecorator;
  projectedName: ProjectedNameDecorator;
  encodedName: EncodedNameDecorator;
  discriminator: DiscriminatorDecorator;
  example: ExampleDecorator;
  opExample: OpExampleDecorator;
  visibility: VisibilityDecorator;
  withVisibility: WithVisibilityDecorator;
  list: ListDecorator;
  offset: OffsetDecorator;
  pageIndex: PageIndexDecorator;
  pageSize: PageSizeDecorator;
  pageItems: PageItemsDecorator;
  continuationToken: ContinuationTokenDecorator;
  nextLink: NextLinkDecorator;
  prevLink: PrevLinkDecorator;
  firstLink: FirstLinkDecorator;
  lastLink: LastLinkDecorator;
  inspectType: InspectTypeDecorator;
  inspectTypeName: InspectTypeNameDecorator;
  parameterVisibility: ParameterVisibilityDecorator;
  returnTypeVisibility: ReturnTypeVisibilityDecorator;
};
