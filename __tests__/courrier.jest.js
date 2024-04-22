const c = require('../src/service');
const e = require('../src/endpoint');
const m = require('../src/method');
const s = require('../src/scheme');

const courrier = new c.Courrier(s.Scheme.HTTPS, 'httpbin.org');

test('GET REQUEST', async() => {
    const query = new Map();
    query.set('location', '0.0555')
    
    const endpoint = new e.Endpoint('/get', query);

    const headers = new Map();
    headers.set('Access-Control-Allow-Origin', '*');

    const response = await courrier.request(
        m.Method.GET,
        endpoint,
        null,
        headers
    );
    
    expect(response.url).toBe('https://httpbin.org/get?location=0.0555');
    expect(response.args.location).toBe('0.0555')

});

test('POST REQUEST', async () => {
    const endpoint = new e.Endpoint('/post');
    const object = {
        message: 'i was born in the dark...'
    };

    const response = await courrier.request(
        m.Method.POST,
        endpoint,
        JSON.stringify(object)
    );
    console.log(response.data)
    expect(response.url).toBe('https://httpbin.org/post');
    expect(response.data["message"]).toBe('i was born in the dark...');
});
