/// <reference types="cypress" />

import { Courrier } from '../../../src/service';
import { Endpoint } from '../../../src/endpoint';
import { Method } from '../../../src/method';

describe('My First Test', () => {
    
    const courrier = Courrier('httpbin.org')

    it('Get Request', () => {
        const endpoint = Endpoint(path = '/get')
        const [data, resp] = courrier.request(
            endpoint,
            Method.GET
            )
        console.log(data);
        console.log(resp);
        expect(true).to.equal(true)
    })
})