const minimist = require('minimist');

describe('minimist arg parsing contract', () => {
  test('parses long flag with string value', () => {
    const args = minimist(['--name', 'Alice']);
    expect(args.name).toBe('Alice');
  });

  test('parses numeric values as numbers', () => {
    const args = minimist(['--port', '3000']);
    expect(args.port).toBe(3000);
    expect(typeof args.port).toBe('number');
  });

  test('parses boolean flags', () => {
    const args = minimist(['--verbose']);
    expect(args.verbose).toBe(true);
  });

  test('parses short flags', () => {
    const args = minimist(['-n', 'Bob', '-v']);
    expect(args.n).toBe('Bob');
    expect(args.v).toBe(true);
  });

  test('collects positional arguments in _', () => {
    const args = minimist(['file.txt', 'other.txt', '--debug']);
    expect(args._).toEqual(['file.txt', 'other.txt']);
    expect(args.debug).toBe(true);
  });

  test('applies default values for missing flags', () => {
    const args = minimist([], { default: { port: 3000, host: 'localhost' } });
    expect(args.port).toBe(3000);
    expect(args.host).toBe('localhost');
  });

  test('treats known boolean flags correctly even without value', () => {
    const args = minimist(['--no-color'], { boolean: ['color'] });
    expect(args.color).toBe(false);
  });

  // BREAKING CHANGE DETECTOR — verifies prototype pollution fix is active (>=1.2.6)
  // minimist <1.2.6 allowed --__proto__ to pollute Object.prototype
  test('__proto__ flag does not pollute Object prototype (>=1.2.6 security fix)', () => {
    minimist(['--__proto__.polluted', 'yes']);
    expect(({}).polluted).toBeUndefined();
  });

  test('constructor flag does not pollute Object prototype', () => {
    minimist(['--constructor.polluted', 'yes']);
    expect(({}).polluted).toBeUndefined();
  });
});
