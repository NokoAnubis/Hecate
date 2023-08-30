
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Method  } from './method';
import { Endpoint } from './endpoint'
import { QueryItem } from './queryItem';

class Courrier {
    
    host: string;
    scheme: string;
    apiKey?: string;
    session: AxiosInstance;
    userAgent: String = 'hecate';
    contentType: String = 'application/json';
    accept: String = 'application/json';
    connection: String = 'keep-alive';

    constructor(host: string, scheme: string | undefined, apiKey: string | undefined) {
        this.host = host
        this.scheme = scheme === undefined ? 'https' : scheme
        this.apiKey = apiKey

        try {
            this.session = axios.create({
                baseURL: `${scheme}://${host}`,
                headers: {
                    'User-Agent': this.userAgent as string,
                    'Content-Type': this.contentType as string,
                    'Accept': this.accept as string,
                    'Connection': this.connection as string
                }
            });
        } catch (error) {
            console.log(error);
        }
        
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
    async request( endpoint: Endpoint, method: Method, body: string | undefined, headers: [string: string] | undefined ) : Promise<[string, number]>{

        // url request params if there are any
        var params: Map<string, string>;
        if (endpoint.queryItems) {
            for (var i = 0; i < endpoint.queryItems.length; ++ i) {
                params.set(endpoint.queryItems[i].getName(), endpoint.queryItems[i].getValue());
            }
        }

        // Http request options
        var options: AxiosRequestConfig = {
            url: endpoint.path,
            params: params,
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
        const resp = await this.session.request(options);

        return [resp.data.toString(), resp.status]
    }

    /**
     * 
     * @param endpoint 
     * @param fileName 
     * @param fileType 
     * @param contentType 
     * @param data 
     */
    async upload( endpoint: Endpoint, fileName: string, fileType: string, contentType:string, data: any | undefined ) {}

}

export { Courrier }