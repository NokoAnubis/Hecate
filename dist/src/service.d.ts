import { AxiosInstance } from 'axios';
import { Method } from './method';
import { Endpoint } from './endpoint';
declare class Courrier {
    host: string;
    scheme: string;
    apiKey?: string;
    session: AxiosInstance;
    contentType: string;
    accept: string;
    constructor(host: string, scheme?: string, apiKey?: string);
    /**
     *
     * Launch http request with the parameters below
     *
     * @param endpoint
     * @param method
     * @param body
     * @param headers
     */
    request(endpoint: Endpoint, method: Method, body?: string, headers?: Map<string, string>): Promise<[string, number]>;
    /**
     *
     * @param endpoint
     * @param fileName
     * @param fileType
     * @param contentType
     * @param data
     */
    upload(endpoint: Endpoint, fileName: string, fileType: string, contentType: string, data?: any): Promise<void>;
}
export { Courrier };
