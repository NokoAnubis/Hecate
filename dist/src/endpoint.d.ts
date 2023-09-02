declare class Endpoint {
    path: string;
    queryItems?: Map<string, string>;
    constructor(path: string, queryItems?: Map<string, string>);
}
export { Endpoint };
