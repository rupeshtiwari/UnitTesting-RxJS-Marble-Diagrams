import { hot, cold } from 'jasmine-marbles';
import { concat } from 'rxjs/operators';

describe('concat', () => {
  it('should concat cold observables', () => {});

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

    it('should match result', () => {});

    it('should identify first subscription', () => {});

    it('should identify 2nd subscription', () => {});
  });

  it('should concat hot observables', () => {});
});
