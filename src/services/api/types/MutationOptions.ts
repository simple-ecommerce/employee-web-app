import { UseMutationOptions } from "react-query";
import { Error } from "./Error";

export type TMutationOptions<Payload, Response = void> = Omit<
  UseMutationOptions<Response, Error, Payload, unknown>,
  "mutationFn"
>;
