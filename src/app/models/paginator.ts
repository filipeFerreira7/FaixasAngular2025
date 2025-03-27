export interface Paginator<T>{
    total: number;
    page: number;
    pageSize: number;
    results: T[];
}