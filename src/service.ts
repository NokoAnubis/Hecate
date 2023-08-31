
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Method  } from './method';
import { Endpoint } from './endpoint'

class Courrier {
    
    host: string;
    scheme: string;
    apiKey?: string;
    session: AxiosInstance;
    contentType: string = 'application/json';
    accept: string = 'application/json';

    constructor(host: string, scheme?: string, apiKey?: string) {
        this.host = host;
        this.scheme = scheme === undefined ? 'https' : scheme;
        this.apiKey = apiKey;

        this.session = axios.create({
            baseURL: `${this.scheme}://${this.host}`,
            headers: {
                'Content-Type': this.contentType,
                'Accept': this.accept
            }
        });
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
    async request(endpoint: Endpoint, method: Method, body?: string, headers?: [string: string]) : Promise<[string, number]>{

        // url request params if there are any
        var params = new Map<string, string>();
        if (endpoint.queryItems) {
            for (var i = 0; i < endpoint.queryItems.length; ++ i) {
                params.set(endpoint.queryItems[i].getName(), endpoint.queryItems[i].getValue());
            }
        }

        // Http request options
        var options: AxiosRequestConfig = {
            url: endpoint.path,
            params: Object.fromEntries(params),
            timeout: 60000,
        }

        // custom headers
        var _headers: Map<string, string>;
        if (headers) {
            for (const h in headers) {
                _headers.set(h, headers[h])
                options.headers[h] = headers[h]
            }
        }

        // handle methods
        switch (method) {
            case Method.GET:
                options.method = method
            case Method.POST:
                options.method = method
                options.data = body
            case Method.PUT:
                options.method = method
                options.data = body
            case Method.DELETE:
                options.method = method
        }

        // perform request
        const { data } = await this.session.request(options);

        return data
    }

    /**
     * 
     * @param endpoint 
     * @param fileName 
     * @param fileType 
     * @param contentType 
     * @param data 
     */
    async upload( endpoint: Endpoint, fileName: string, fileType: string, contentType:string, data?: any ) {}

}

export { Courrier }