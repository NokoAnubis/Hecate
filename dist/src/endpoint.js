export class Endpoint {
    path;
    queryItems;
    constructor(path, queryItems) {
        this.path = path;
        this.queryItems = queryItems;
    }
    mapToQueryString() {
        const queryItems = [];
        if (!this.queryItems) {
            return '';
        }
        for (const [key, value] of this.queryItems.entries()) {
            queryItems.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
        if (queryItems.length === 0) {
            return '';
        }
        return `?${queryItems.join('&')}`;
    }
}
