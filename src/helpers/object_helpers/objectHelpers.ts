import { TextHelpers } from "../text_helpers/TextHelpers";

const camelize = TextHelpers.toCamelCase;
const snakefy = TextHelpers.toSnakeCase;

export namespace ObjectHelpers {
  const camelCase = (value: any): unknown => {
    if (value === null || value === undefined) return value;
    if (Array.isArray(value)) return value.map((value) => camelCase(value));
    if (typeof value === "object")
      return Object.keys(value).reduce(
        (acc, cur) => ({ ...acc, [camelize(cur)]: camelCase(value[cur]) }),
        {}
      );
    return value;
  };

  const snakeCase = (value: any): unknown => {
    if (typeof value === "object" && value?.constructor?.name === "FormData")
      return value;
    if (value === null || value === undefined) return value;
    if (Array.isArray(value)) return value.map((value) => snakeCase(value));
    if (typeof value === "object")
      return Object.keys(value).reduce(
        (acc, cur) => ({ ...acc, [snakefy(cur)]: snakeCase(value[cur]) }),
        {}
      );
    return value;
  };

  export const toCamelCase = <T>(object: any): T => {
    return camelCase(object) as T;
  };

  export const toSnakeCase = (object: any): unknown => {
    return snakeCase(object);
  };
}
