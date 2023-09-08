import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Method  } from './method';
import { Endpoint } from './endpoint'

export class Courrier {
       
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
    async request(endpoint: Endpoint, method: Method, body?: string, headers?: Map<string,string>) : Promise<[string, number]>{

        var options: AxiosRequestConfig = {
            url: endpoint.path,
            timeout: 60000
        }

        if (endpoint.queryItems) {
            options.params = Object.fromEntries(endpoint.queryItems);
        }
        
        if (headers) {
            options.headers = Object.fromEntries(headers);
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