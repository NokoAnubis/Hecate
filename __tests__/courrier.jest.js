const c = require('../src/service');
const e = require('../src/endpoint');
const m = require('../src/method');
const s = require('../src/scheme');
const f = require('../src/fileType');

const courrier = new c.Courrier(s.Scheme.HTTPS, 'httpbin.org');

test('GET REQUEST', async() => {
    const query = new Map();
    query.set('location', '0.0555')
    
    const endpoint = new e.Endpoint('/get', query);

    const _headers = new Map();
    _headers.set('Access-Control-Allow-Origin', '*');

    const [status, headers, body] = await courrier.request(
        m.Method.GET,
        endpoint,
        null,
        _headers
    );

    expect(status).toBe(200);
    expect(body.url).toBe('https://httpbin.org/get?location=0.0555');
    expect(body.args.location).toBe('0.0555')

});

test('POST REQUEST', async () => {
    const endpoint = new e.Endpoint('/post');
    const object = {
        message: 'i was born in the dark...'
    };

    const [status, headers, body] = await courrier.request(
        m.Method.POST,
        endpoint,
        JSON.stringify(object)
    );

    const data = JSON.parse(body.data)

    expect(status).toBe(200);
    expect(body.url).toBe('https://httpbin.org/post');
    expect(data.message).toBe('i was born in the dark...');
});

test('PUT REQUEST', async () => {
    const endpoint = new e.Endpoint('/put');
    const object = {
        message: 'i have the higher ground'
    };

    const [status, headers, body] = await courrier.request(
        m.Method.PUT,
        endpoint,
        JSON.stringify(object)
    );

    const data = JSON.parse(body.data)

    expect(status).toBe(200);
    expect(body.url).toBe('https://httpbin.org/put');
    expect(data.message).toBe('i have the higher ground');
});

test('DELETE REQUEST', async () => {
    const endpoint = new e.Endpoint('/delete');

    const [status, headers, body] = await courrier.request(
        m.Method.DELETE,
        endpoint
    );

    expect(status).toBe(200);
    expect(body.url).toBe('https://httpbin.org/delete');
});

test('UPLOAD REQUEST', async () => {
    const endpoint = new e.Endpoint('/post');
    const hdrs = new Map();
    hdrs.set('Authorization', 'xxx');
    hdrs.set('X-Filename', '000');
    const object = {
        message: 'i was born in the dark...'
    };

    const [status, headers, body] = await courrier.upload(
        endpoint,
        f.FileType.JPEG,
        JSON.stringify(object),
        hdrs
    );

    const data = JSON.parse(body.data)
    expect(status).toBe(200);
    expect(body.url).toBe('https://httpbin.org/post');
    expect(data.message).toBe('i was born in the dark...');
    expect(body.headers['Content-Type']).toBe(f.FileType.JPEG);
});