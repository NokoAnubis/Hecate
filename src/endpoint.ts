
import { QueryItem } from './queryItem'

class Endpoint {
    
    path: string
    queryItems?: Map<string,string>

    constructor(path: string, queryItems?: Map<string,string>) {
        this.path = path
        this.queryItems = queryItems
    }
}

export { Endpoint }