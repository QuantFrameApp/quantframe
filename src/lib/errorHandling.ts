import { AxiosError } from "axios";

export type Success<Data> = readonly [Data, undefined];
export type Failure<Err = Error> = readonly [undefined, Err];

/** Inspired by Golang's data, err pattern. I greatly dislike exceptions */
export type GoResponse<Data, Err = Error> = Promise<(Success<Data> | Failure<Err>)>

export const ok = <T>(data: T): Success<T> => [data, undefined];
export const fail = <E = Error>(error: E): Failure<E> => {
  if ('response' in (error as Object)) {
    const axiosError = error as AxiosError;
    console.group(axiosError?.response?.config?.url);
    console.error(axiosError.response);
    console.groupEnd()
  } else {
    console.error(error);
  }
  return [undefined, error];
};
