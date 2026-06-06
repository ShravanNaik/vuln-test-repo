const _ = require('lodash');

describe('lodash API contract', () => {
  test('_.get retrieves nested value with default', () => {
    expect(_.get({ a: { b: 42 } }, 'a.b')).toBe(42);
    expect(_.get({ a: 1 }, 'b', 'fallback')).toBe('fallback');
  });

  test('_.cloneDeep creates an independent deep copy', () => {
    const obj = { a: { b: [1, 2, 3] } };
    const clone = _.cloneDeep(obj);
    clone.a.b.push(4);
    expect(obj.a.b).toHaveLength(3);
  });

  test('_.merge combines objects deeply', () => {
    expect(_.merge({ a: { x: 1 } }, { a: { y: 2 } })).toEqual({ a: { x: 1, y: 2 } });
  });

  test('_.flatten flattens exactly one level', () => {
    // 4.x: _.flatten is single-level; _.flattenDeep is recursive
    expect(_.flatten([1, [2, [3, [4]]]])).toEqual([1, 2, [3, [4]]]);
  });

  test('_.template compiles interpolation strings', () => {
    const tpl = _.template('Hello <%= name %>!');
    expect(tpl({ name: 'World' })).toBe('Hello World!');
  });

  test('_.chunk splits array into sized groups', () => {
    expect(_.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  test('_.uniq removes duplicate primitives', () => {
    expect(_.uniq([1, 2, 1, 3, 2])).toEqual([1, 2, 3]);
  });

  test('_.pick selects named properties', () => {
    expect(_.pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  test('_.omit removes named properties', () => {
    expect(_.omit({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 });
  });

  test('_.debounce returns a function', () => {
    const fn = _.debounce(() => {}, 100);
    expect(typeof fn).toBe('function');
    expect(typeof fn.cancel).toBe('function');
  });
});
