import { Method  } from './method';
import { Endpoint } from './endpoint'
import { Scheme } from './scheme';
import { FileType } from './fileType';
import { NetworkError } from './errors';

export class Courrier {
       
    host: string;
    scheme: string;
    apiKey?: string;
    contentType: string = 'application/json';
    accept: string = 'application/json';

    constructor(scheme: Scheme=Scheme.HTTPS, host: string) {
        this.host = host;
        this.scheme = scheme;
    }

    /**
     * 
     * Launch http request with the parameters below
     * 
     * @param endpoint 
     * @param method 
     * @param body 
     * @param headers 
     * 
     * @returns {[string, Object, Object]} an array containing the status code, the headers, and the body
     */
    async request(method: Method, endpoint: Endpoint, body: string | undefined, headers: Map<string,string> | undefined) : Promise<[number, Object, Object | undefined]> {
        var options: { 
            method: string | undefined,
            body: any | undefined,
            headers: any | undefined
        } = {
            method: undefined,
            body: undefined,
            headers: undefined
        };
        
        // Set headers if they exist
        if (headers !== undefined) {
            options.headers = Object.fromEntries(headers);
        }
        
        // Handle methods
        switch (method) {
            case Method.GET:
                options.method = method
            case Method.HEAD:
                options.method = method
            case Method.POST:
                options.method = method
                options.body = body
            case Method.PUT:
                options.method = method
                options.body = body
            case Method.DELETE:
                options.method = method
            case Method.CONNECT:
                options.method = method
            case Method.OPTIONS:
                options.method = method
            case Method.TRACE:
                options.method = method
            case Method.PATCH:
                options.method = method
                options.body = body
        }

        // Perform request & return responses
        const url = `${this.scheme}://${this.host}${endpoint.path}${endpoint.mapToQueryString()}`
        const response = await fetch(url, options);

        let data: Object | undefined = undefined;
        try {
            const size = response.headers.get('content-length');
            const contentType = response.headers.get('content-type');
            const hasJSONContentType = contentType?.includes('application/json') ?? false;
            if (hasJSONContentType && size > '3') {
                data = await response.json();
            }
        } catch (error) {
            throw new NetworkError(`Malakbel Error (Failed to decode response): ${error}`);
        }

        if (response.status > 299 && response.status < 400) {
            throw new NetworkError(`(${response.status})`)
        } else if (response.status > 399 && response.status < 500) {
            throw new NetworkError(`(${response.status})`)
        } else if (response.status > 499 && response.status < 600) {
            throw new NetworkError(`(${response.status})`)
        } else {
            return [response.status, response.headers, data]
        }
    }

    /**
     * 
     * @param endpoint 
     * @param fileName 
     * @param fileType 
     * @param contentType 
     * @param data 
     */
    async upload(endpoint: Endpoint, fileType: FileType, data: any, headers: Map<string, string> | undefined): Promise<[number, Object, Object]> {
        var options: { 
            method: string,
            body: any | undefined,
            headers: any | undefined
        } = {
            method: "POST",
            body: undefined,
            headers: undefined
        };

        // Crafting URL
        const url = `${this.scheme}://${this.host}${endpoint.path}${endpoint.mapToQueryString()}`
        
        // Add content type
        if (headers !== undefined) {
            headers?.set('Content-Type',fileType.toString());
            options.headers = Object.fromEntries(headers);
        }

        // Add options for fetch
        options.method = Method.POST
        options.body = data

        // Perform network call and return
        const response = await fetch(url, options)
        return [response.status, response.headers, await response.json()]
    }
}