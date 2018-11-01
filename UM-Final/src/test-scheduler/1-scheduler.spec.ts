import {
  hot,
  getTestScheduler,
  cold,
  initTestScheduler,
  resetTestScheduler
} from 'jasmine-marbles';
import { interval } from 'rxjs';
import { take, filter } from 'rxjs/operators';

describe('testscheduler', () => {
  it('should work with interval operators', () => {
    const scheduler = getTestScheduler();
    const source = interval(20, scheduler);
    const result = source.pipe(take(4));

    /**
     * --0-1-2-3-4-5
     *   take(4)
     * --0-1-2-(3|)
     */

    const expected = cold('--a-b-c-(d|)', { a: 0, b: 1, c: 2, d: 3, e: 4 });
    // show them that it can go max 740 frames + 0 frame = 750 frames.
    // expect(source).toBeObservable(cold('--a-b-c-d-e-f-'));
    expect(result).toBeObservable(expected);
  });

  it('should work with interval operators with large time', () => {
    const scheduler = getTestScheduler();

    const source = interval(80, scheduler);
    const result = source.pipe(take(4));

    /**
     * ---------0-------1-------2-------3-------4-------5
     *   take(4)
     * ---------0-------1-------2-------(3|)
     */

    const expected = cold('--------a-------b-------c-------(d|)', {
      a: 0,
      b: 1,
      c: 2,
      d: 3,
      e: 4
    });

    expect(result).toBeObservable(expected);
  });

  it('should work with interval and filter operators', () => {
    const data = { a: 0, b: 1, c: 2, d: 3, e: 4 };
    const scheduler = getTestScheduler();
    const source = interval(20, scheduler).pipe(take(4));
    const result = source.pipe(filter(x => x % 2 === 0));

    /**
     * --0-1-2-(3|)
     *   filter(EVEN NUMBERS)
     * --0---2-(-|)
     */

    const expected = cold('--a---c-(-|)', data);

    expect(result).toBeObservable(expected);
  });

  it('can emit values', () => {
    const stocks = cold('--a--b--c--d--e--f|', {
      a: 2,
      b: 2.5,
      c: 3,
      d: 2,
      e: 4,
      f: 3
    });

    stocks.subscribe(s => console.log(s));
  });
});
