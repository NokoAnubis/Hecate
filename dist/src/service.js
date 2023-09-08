"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Courrier = void 0;
const axios_1 = require("axios");
const method_1 = require("./method");
class Courrier {
    host;
    scheme;
    apiKey;
    session;
    contentType = 'application/json';
    accept = 'application/json';
    constructor(host, scheme, apiKey) {
        this.host = host;
        this.scheme = scheme === undefined ? 'https' : scheme;
        this.apiKey = apiKey;
        this.session = axios_1.default.create({
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
    async request(endpoint, method, body, headers) {
        var options = {
            url: endpoint.path,
            timeout: 60000
        };
        if (endpoint.queryItems) {
            options.params = Object.fromEntries(endpoint.queryItems);
        }
        if (headers) {
            options.headers = Object.fromEntries(headers);
        }
        // handle methods
        switch (method) {
            case method_1.Method.GET:
                options.method = method;
            case method_1.Method.POST:
                options.method = method;
                options.data = body;
            case method_1.Method.PUT:
                options.method = method;
                options.data = body;
            case method_1.Method.DELETE:
                options.method = method;
        }
        // perform request
        const { data } = await this.session.request(options);
        return data;
    }
    /**
     *
     * @param endpoint
     * @param fileName
     * @param fileType
     * @param contentType
     * @param data
     */
    async upload(endpoint, fileName, fileType, contentType, data) { }
}
exports.Courrier = Courrier;
