export interface Paginator<K> {
    content: K[]
    empty: boolean,
    first: boolean,
    last: boolean,
    number: number,
    numberOfElements: number,
    size: number,
    totalElements: number,
    totalPages: number
}