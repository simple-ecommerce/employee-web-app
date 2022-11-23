import { UseQueryOptions } from "react-query";
import { Error } from "./Error";

export type QueryOptions<T extends (...args: any) => any> = Omit<
  UseQueryOptions<any, Error, Awaited<ReturnType<T>>, any>,
  "queryKey" | "queryFn"
>;
