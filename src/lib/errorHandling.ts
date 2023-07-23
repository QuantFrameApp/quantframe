
export type Success<Data> = readonly [Data, undefined];
export type Failure = readonly [undefined, Error];

/** Inspired by Golang's data, err pattern. I greatly dislike exceptions */
export type GoResponse<Data> = Promise<(Success<Data> | Failure)>

export const ok = <T>(data: T): Success<T> => [data, undefined];
export const fail = (error: Error): Failure => [undefined, error];
