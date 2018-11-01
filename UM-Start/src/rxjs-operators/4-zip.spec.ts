import { cold } from 'jasmine-marbles';
import { zip } from 'rxjs/operators';

describe('zip', () => {
  it('should work with zip operator with values', () => {
    const obs1 = cold('---a---b---|', { a: 1, b: 3 });
    const obs2 = cold('-----c---d---|', { c: 5, d: 7 });
    const result = obs1.pipe(zip(obs2, (x: number, y: number) => x + y));
    const expected = cold('-----x---y-|', {
      x: 1 + 5,
      y: 3 + 7
    });
    expect(result).toBeObservable(expected);
  });
});
