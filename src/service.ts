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
    async request(method: Method, endpoint: Endpoint, body: string | undefined, headers: Map<string,string> | undefined) : Promise<[number, Headers, Object | undefined]> {
        const options: { 
            method: string | undefined,
            body: string | undefined,
            headers: Record<string, string> | undefined
        } = {
            method: undefined,
            body: undefined,
            headers: undefined
        };
        
        if (headers) {
            options.headers = Object.fromEntries(headers);
        }
        
        switch (method) {
            case Method.GET:
                options.method = method;
                break;
            case Method.HEAD:
                options.method = method;
                break;
            case Method.POST:
                options.method = method;
                options.body = body;
                break;
            case Method.PUT:
                options.method = method;
                options.body = body;
                break;
            case Method.DELETE:
                options.method = method;
                break;
            case Method.CONNECT:
                options.method = method;
                break;
            case Method.OPTIONS:
                options.method = method;
                break;
            case Method.TRACE:
                options.method = method;
                break;
            case Method.PATCH:
                options.method = method;
                options.body = body;
                break;
        }
    
        const url = `${this.scheme}://${this.host}${endpoint.path}${endpoint.mapToQueryString()}`
        const response = await fetch(url, options);
    
        let data: Object | undefined = undefined;
        try {
            const contentType = response.headers.get('content-type');
            const hasJSONContentType = contentType?.includes('application/json') ?? false;
            
            if (hasJSONContentType && response.bodyUsed === false) {
                const text = await response.text();
                if (text.length > 0) {
                    data = JSON.parse(text);
                }
            }
        } catch (error) {
            throw new NetworkError(`Failed to decode response: ${error}`);
        }
    
        if (response.status >= 300) {
            throw new NetworkError(`(${response.status})`);
        }
        
        return [response.status, response.headers, data];
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