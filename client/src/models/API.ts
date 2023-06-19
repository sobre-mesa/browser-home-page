type Payload<T> = T &  {
    _id: string,
    id: string,
    _v?: number,
};

export type APIResponseWithArray<T> = {
    status: string,
    results: number,
    payload: Payload<T>[],
}

export type APIResponse<T> = {
    status: string,
    results: number,
    payload: Payload<T>,
}

export type EmptyResponse = undefined | null | "";