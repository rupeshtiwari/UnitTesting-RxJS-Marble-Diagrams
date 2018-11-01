import { cold, getTestScheduler } from 'jasmine-marbles';
import { of, Observable, throwError, from } from 'rxjs';

describe('COLD', () => {
  it('of with one value', () => {
    const provided = of('a');

    const expected = cold('(a|)');

    expect(provided).toBeObservable(expected);
  });

  it('of with 2 values', () => {
    const provided1 = of('a', 'b');
    const expected = cold('(ab|)');

    expect(provided1).toBeObservable(expected);
  });

  it('from', () => {
    const provided1 = from(['a', 'b']);
    const expected = cold('(ab|)');

    expect(provided1).toBeObservable(expected);
  });

  it('should trim the spaces', () => {
    expect(cold('     ---a--b--c--| ')).toBeObservable(cold('---a--b--c--|'));
  });
});
