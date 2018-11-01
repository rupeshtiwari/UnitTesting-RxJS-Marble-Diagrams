import { cold, getTestScheduler } from 'jasmine-marbles';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

describe('from operator', () => {
  it('should work with value', () => {
    const result = interval(30, getTestScheduler()).pipe(take(5));

    const expected = cold('---a--b--c--d--(e|)', { a: 0, b: 1, c: 2, d: 3, e: 4 });

    expect(result).toBeObservable(expected);
  });
});
