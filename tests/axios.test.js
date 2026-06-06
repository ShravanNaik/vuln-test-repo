const axios = require('axios');

describe('axios 0.x API contract', () => {
  test('axios is callable as a function', () => {
    expect(typeof axios).toBe('function');
  });

  test('axios.create returns a configured instance', () => {
    const instance = axios.create({ baseURL: 'https://example.com', timeout: 5000 });
    expect(typeof instance).toBe('function');
    expect(instance.defaults.baseURL).toBe('https://example.com');
    expect(instance.defaults.timeout).toBe(5000);
  });

  // BREAKING CHANGE DETECTOR — this test will FAIL if axios is upgraded to 1.x
  // CancelToken was removed in axios 1.x (replaced by AbortController).
  // If this test fails after a version bump, the upgrade is a breaking change.
  test('axios.CancelToken exists and is functional (0.x only — removed in 1.x)', () => {
    expect(axios.CancelToken).toBeDefined();
    expect(typeof axios.CancelToken.source).toBe('function');
    const source = axios.CancelToken.source();
    expect(source.token).toBeDefined();
    expect(typeof source.cancel).toBe('function');
  });

  test('axios.isCancel identifies cancellation errors', () => {
    expect(typeof axios.isCancel).toBe('function');
    expect(axios.isCancel(new Error('not a cancel'))).toBe(false);
  });

  test('axios.defaults has standard headers', () => {
    expect(axios.defaults).toBeDefined();
    expect(axios.defaults.headers).toBeDefined();
    expect(axios.defaults.headers.common).toBeDefined();
  });

  test('axios.interceptors has request and response handlers', () => {
    expect(axios.interceptors.request).toBeDefined();
    expect(typeof axios.interceptors.request.use).toBe('function');
    expect(axios.interceptors.response).toBeDefined();
    expect(typeof axios.interceptors.response.use).toBe('function');
  });

  test('axios.all and axios.spread exist (0.x batch API)', () => {
    // axios.all / axios.spread were deprecated in 1.x
    expect(typeof axios.all).toBe('function');
    expect(typeof axios.spread).toBe('function');
  });
});
