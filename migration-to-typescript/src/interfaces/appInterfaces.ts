export interface ChoosenOptions {
    country?: string;
    category?: string;
    language?: string;
    sources?: string;
    q?: string;
    pageSize?: number;
    page?: number;
}

export interface RequestOptions extends ChoosenOptions {
    apiKey: string;
}
