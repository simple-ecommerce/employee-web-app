import { UseMutationOptions } from "react-query";
import { Error } from "./Error";

export type MutationOptions<T extends (...args: any) => any> = Omit<
  UseMutationOptions<Awaited<ReturnType<T>>, Error, Parameters<T>[0], unknown>,
  "mutationFn"
>;
