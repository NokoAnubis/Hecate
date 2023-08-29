
import { QueryItem } from './queryItem'

class Endpoint {
    
    path: string
    queryItems: Array<QueryItem>

    constructor(path: string, queryItems: Array<QueryItem>) {
        this.path = path
        this.queryItems = queryItems
    }
}

export { Endpoint }