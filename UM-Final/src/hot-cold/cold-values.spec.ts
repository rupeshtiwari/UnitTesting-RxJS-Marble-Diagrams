import { from, of } from 'rxjs';

import { cold } from 'jasmine-marbles';

describe(' With Values ', () => {
  it('should work with value', () => {
    const result = from(['orange']);
    const expected = cold('(x|)', { x: 'orange' });

    expect(result).toBeObservable(expected);
  });

  it('should work with of operator with Array values', () => {
    const result = of(1, 2, 3);
    const expected = cold('(abc|)', { a: 1, b: 2, c: 3 });

    expect(result).toBeObservable(expected);
  });

});
