class QueryItem {

    name: string
    value: string

    constructor(name: string, value: string) {
        this.name = name
        this.value = value
    }
    
    /**
     * 
     * Returns a composite string of the contents of QueryItem
     * 
     * @returns a compsite string value `${name}=${value}`
     */
    toString() : string {
        return `${this.name}=${this.value}`
    }

    /**
     * 
     * Return the string value of the name
     * 
     * @returns returns string value of name
     */
    getName() : string {
        return this.name
    }

    /**
     * 
     * Returns the string value of the name variable
     * 
     * @returns returns string value of value
     */
    getValue() : string {
        return this.value
    }

    /**
     * 
     * Returns the contents of a query item
     * 
     * @returns an array containing the name and value
     */
    getContents() : [string, string] {
        return [this.name, this.value]
    }
}

export { QueryItem }