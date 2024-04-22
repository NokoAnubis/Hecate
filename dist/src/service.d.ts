import { Method } from './method';
import { Endpoint } from './endpoint';
import { Scheme } from './scheme';
import { FileType } from './fileType';
export declare class Courrier {
    host: string;
    scheme: string;
    apiKey?: string;
    contentType: string;
    accept: string;
    constructor(scheme: Scheme, host: string);
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
    request(method: Method, endpoint: Endpoint, body?: string, headers?: Map<string, string>): Promise<[number, Object, Object]>;
    /**
     *
     * @param endpoint
     * @param fileName
     * @param fileType
     * @param contentType
     * @param data
     */
    upload(endpoint: Endpoint, fileType: FileType, data?: any, headers?: Map<string, string>): Promise<[number, Object, Object]>;
}
