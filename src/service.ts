
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Method  } from './method';
import { Endpoint } from './endpoint'
import { QueryItem } from './queryItem';

class Courrier {
    
    host: string
    scheme: string
    apiKey: string | undefined
    session: AxiosInstance
    userAgent: String = "hecate"
    contentType: String = "application/json"
    accept: String = "application/json"
    connection: String = "keep-alive"

    constructor(host: string, scheme: string | undefined, apiKey: string | undefined) {
        this.host = host
        this.scheme = scheme === undefined ? 'https' : scheme
        this.apiKey = apiKey

        this.session = axios.create({
            baseURL: `${scheme}://${host}`,
            headers: {
                'User-Agent': this.userAgent as string,
                'Content-Type': this.contentType as string,
                'Accept': this.accept as string,
                'Connection': this.connection as string
            }
        });
    }

    /**
     * 
     * @param endpoint 
     * @param method 
     * @param body 
     * @param headers 
     */
    async request( endpoint: Endpoint, method: Method, body: string | undefined, headers: [string: string] | undefined ) : Promise<[string, number]>{

        // custom headers
        var _headers = {}
        if (headers) {
            _headers = [];
            for (const h in headers) {
                _headers[h] = headers[h];
            }
        }

        var params = {}
        if (endpoint.queryItems) {
            params = [];
            for (var i = 0; i < endpoint.queryItems.length; ++ i) {
                params[endpoint.queryItems[i].getName()] = endpoint.queryItems[i].getValue()
            }
        }
        
        // Http request options
        var options: AxiosRequestConfig = {
            url: endpoint.path,
            headers: _headers,
            params: params,
            timeout: 60000,
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

        return [resp.data, resp.status]
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