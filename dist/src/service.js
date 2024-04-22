import { Method } from './method';
import { Scheme } from './scheme';
export class Courrier {
    host;
    scheme;
    apiKey;
    contentType = 'application/json';
    accept = 'application/json';
    constructor(scheme = Scheme.HTTPS, host) {
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
    async request(method, endpoint, body, headers) {
        var options = {
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
                options.method = method;
            case Method.HEAD:
                options.method = method;
            case Method.POST:
                options.method = method;
                options.body = body;
            case Method.PUT:
                options.method = method;
                options.body = body;
            case Method.DELETE:
                options.method = method;
            case Method.CONNECT:
                options.method = method;
            case Method.OPTIONS:
                options.method = method;
            case Method.TRACE:
                options.method = method;
            case Method.PATCH:
                options.method = method;
                options.body = body;
        }
        // perform request
        const url = `${this.scheme}://${this.host}${endpoint.path}${endpoint.mapToQueryString()}`;
        const response = await fetch(url, options);
        return [response.status, response.headers, await response.json()];
    }
    /**
     *
     * @param endpoint
     * @param fileName
     * @param fileType
     * @param contentType
     * @param data
     */
    async upload(endpoint, fileType, data, headers) {
        var options = {
            method: undefined,
            body: undefined,
            headers: undefined
        };
        const url = `${this.scheme}://${this.host}${endpoint.path}${endpoint.mapToQueryString()}`;
        var _headers = new Map();
        if (headers) {
            for (const [key, value] of Object.entries(headers)) {
                if (typeof key === 'string' && typeof value === 'string') {
                    _headers.set(key, value);
                }
            }
        }
        _headers.set("Content-Type", fileType.toString());
        options.method = Method.POST;
        options.headers = _headers;
        options.body = data;
        const response = await fetch(url, options);
        return [response.status, response.headers, await response.json()];
    }
}
