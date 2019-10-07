interface WebserviceResponse<T> {
    num_results: number;
    objects: Array<T>;
    page: number;
    total_pages: number;
}
