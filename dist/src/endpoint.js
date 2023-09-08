"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoint = void 0;
class Endpoint {
    path;
    queryItems;
    constructor(path, queryItems) {
        this.path = path;
        this.queryItems = queryItems;
    }
}
exports.Endpoint = Endpoint;
