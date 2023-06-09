import { ChoosenOptions, RequestOptions } from '../../interfaces/appInterfaces';
import { NewsResponse, SourceResponse } from '../../interfaces/responceInterfaces';
import { Endpoints, Methods } from '../../types/types';

class Loader {
    private baseLink: string;
    private options: Pick<RequestOptions, 'apiKey'>;
    constructor(baseLink: string, options: Pick<RequestOptions, 'apiKey'>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        { endpoint, options = {} }: { endpoint: Endpoints; options?: ChoosenOptions },
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: ChoosenOptions, endpoint: Endpoints) {
        const urlOptions: RequestOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof ChoosenOptions]}&`;
        });

        return url.slice(0, -1);
    }

    private load(
        method: Methods,
        endpoint: Endpoints,
        callback: (arg: NewsResponse | SourceResponse) => void,
        options = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
