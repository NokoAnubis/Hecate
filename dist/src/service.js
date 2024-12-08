import { Method } from './method';
import { Scheme } from './scheme';
import { NetworkError } from './errors';
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
        // Set headers if they exist
        if (headers !== undefined) {
            options.headers = Object.fromEntries(headers);
        }
        // Handle methods
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
        // Perform request & return responses
        const url = `${this.scheme}://${this.host}${endpoint.path}${endpoint.mapToQueryString()}`;
        const response = await fetch(url, options);
        let data = undefined;
        try {
            if (response.body) {
                data = await response.json();
            }
        }
        catch (error) {
            console.log('Malakbel Error (Failed to decode response): ' + error);
            return [500, {}, undefined];
        }
        if (response.status > 299 && response.status < 400) {
            throw new NetworkError(`(${response.status})`);
        }
        else if (response.status > 399 && response.status < 500) {
            throw new NetworkError(`(${response.status})`);
        }
        else if (response.status > 499 && response.status < 600) {
            throw new NetworkError(`(${response.status})`);
        }
        else {
            return [response.status, response.headers, data];
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
    async upload(endpoint, fileType, data, headers) {
        var options = {
            method: "POST",
            body: undefined,
            headers: undefined
        };
        // Crafting URL
        const url = `${this.scheme}://${this.host}${endpoint.path}${endpoint.mapToQueryString()}`;
        // Add content type
        headers.set('Content-Type', fileType.toString());
        // Add options for fetch
        options.headers = Object.fromEntries(headers);
        options.method = Method.POST;
        options.body = data;
        // Perform network call and return
        const response = await fetch(url, options);
        return [response.status, response.headers, await response.json()];
    }
}
