import { hot, cold } from 'jasmine-marbles';
import { concat } from 'rxjs/operators';

describe('concat', () => {
  xit('should concat cold observables', () => {
    const obs1 = cold('---a---b|');
    const obs2 = cold('         ---c---d|');
    const result = obs1.pipe(concat(obs2));
    const expected = cold('---a---b---c---d|');
    expect(result).toBeObservable(expected);
  });

  describe('should identify subscription points in cold observable', () => {
    let obs1, sub1, obs2, sub2, expected, result;
    beforeEach(() => {
      obs1 = cold('    ---a---b|');
      sub1 = '         ^-------!';
      obs2 = cold('             ---c---d|');
      sub2 = '         --------^--------!';
      expected = cold('---a---b---c---d|');
      result = obs1.pipe(concat(obs2));
    });

    it('should match result', () => {
      expect(result).toBeObservable(expected);
    });

    it('should identify first subscription', () => {
      expect(obs1).toHaveSubscriptions(sub1);
    });

    it('should identify 2nd subscription', () => {
    //  expect(obs2).toHaveSubscriptions(sub2);
    });
  });

  xit('should concat hot observables', () => {
    const obs1 = hot('---a--^--b--|');
    const sub1 = '    ------^-----!';
    const obs2 = hot('------^----c--d|');
    const sub2 = '          ------^--!';
    const expected = cold(' ---b----d|');
    const result = obs1.pipe(concat(obs2));

    expect(result).toBeObservable(expected);
    // expect(obs1).toHaveSubscriptions(sub1);
    // expect(obs2).toHaveSubscriptions(sub2);
  });
});
