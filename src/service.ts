import { Method  } from './method';
import { Endpoint } from './endpoint'
import { Scheme } from './scheme';

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
     */
    async request(method: Method, endpoint: Endpoint, body?: string, headers?: Map<string,string>) : Promise<Object>{

        var options: { 
            method: string,
            body: any | undefined,
            headers: any | undefined
        } = {
            method: undefined,
            body: undefined,
            headers: undefined
        };
        
        if (headers) {
            options.headers = Object.fromEntries(headers);
        }
        
        // handle methods
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

        // perform request
        const url = `${this.scheme}://${this.host}${endpoint.path}${endpoint.mapToQueryString()}`
        const response = await fetch(url, options);

        return response.json()
    }

    /**
     * 
     * @param endpoint 
     * @param fileName 
     * @param fileType 
     * @param contentType 
     * @param data 
     */
    async upload(endpoint: Endpoint, fileName: string, fileType: string, contentType:string, data?: any ) {}
}