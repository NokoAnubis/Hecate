export class Endpoint {
    
    path: string
    queryItems?: Map<string,string>

    constructor(path: string, queryItems?: Map<string,string>) {
        this.path = path
        this.queryItems = queryItems
    }

    public mapToQueryString(): string {
        const queryItems: string[] = [];
        
        if (!this.queryItems) {
            return ''
        }

        for (const [key, value] of this.queryItems.entries()) {
            queryItems.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
        
        if (queryItems.length === 0) {
            return '';
        }
        
        return '?' + queryItems.join('?');
    }
}