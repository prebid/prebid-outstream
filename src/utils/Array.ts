/**
 * Infers the type of an array's elements.
 */
type ArrayElement<
    ArrayType extends readonly unknown[]
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
