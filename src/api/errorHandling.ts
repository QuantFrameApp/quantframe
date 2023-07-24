import { AxiosError } from 'axios'

export type Success<Data> = readonly [Data, undefined];
export type Failure<Err = Error> = readonly [undefined, Err];

/** A cross between Rust and Golang exception handling. I greatly dislike exceptions */
export type Result<Data, Err = Error> = Promise<(Success<Data> | Failure<Err>)>

export const Ok = <T>(data: T): Success<T> => [data, undefined]
export const Err = <E = Error>(error: E): Failure<E> => {
  if ('response' in (error as Object)) {
    const axiosError = error as AxiosError
    console.group(axiosError?.response?.config?.url)
    console.error(axiosError.response)
    console.groupEnd()
  } else {
    console.error(error)
  }
  return [undefined, error]
}
