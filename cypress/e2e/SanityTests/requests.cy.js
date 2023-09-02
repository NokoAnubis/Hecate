/// <reference types="cypress" />

import { Courrier } from '../../../src/service';
import { Endpoint } from '../../../src/endpoint';
import { Method } from '../../../src/method';

describe('Request Tests', () => {
    
    const courrier = new Courrier('httpbin.org');

    it('GET REQUEST', async () => {
        const query = new Map();
        query.set('location', '0.0555')
        const endpoint = new Endpoint('/get', query);

        const headers = new Map();
        headers.set('Access-Control-Allow-Origin', '*');

        const data = await courrier.request(
            endpoint,
            Method.GET,
            null,
            headers
        );
        
        console.log(data)
        expect(data.url).to.equal('https://httpbin.org/get?location=0.0555');
        expect(data.args.location).to.equal('0.0555')
    });

    it('POST REQUEST', async () => {
        const endpoint = new Endpoint('/post');
        const object = {
            message: 'i was born in the dark...'
        };

        const data = await courrier.request(
            endpoint,
            Method.POST,
            object
        );

        expect(data.url).to.equal('https://httpbin.org/post');
        expect(data.json.message).to.equal('i was born in the dark...');
    });

    it('PUT REQUEST', async () => {
        const endpoint = new Endpoint('/put');
        const object = {
            message: 'i have the higher ground'
        };

        const data = await courrier.request(
            endpoint,
            Method.PUT,
            object
        );

        expect(data.url).to.equal('https://httpbin.org/put');
        expect(data.json.message).to.equal('i have the higher ground');
    });

    it('DELETE REQUEST', async () => {
        const endpoint = new Endpoint('/delete');

        const data = await courrier.request(
            endpoint,
            Method.DELETE
        );

        expect(data.url).to.equal('https://httpbin.org/delete');
    });
})