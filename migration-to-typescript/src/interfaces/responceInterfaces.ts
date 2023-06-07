export interface Response {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface SourceResponse {
    status: string;
    sources: Source[];
}

export interface Article {
    source?: Source;
    author?: string;
    title?: string;
    description?: string;
    url: string;
    urlToImage?: string;
    publishedAt?: string;
    content?: string;
}

export interface Source {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}
