import { hot, cold } from 'jasmine-marbles';
import { from } from 'rxjs';
import { share } from 'rxjs/operators';

describe('hot', () => {
   
  it('should test subscription', () => {
    const source = hot('-a---^b---c---|');
    const subscription = '   ^--------!';

    expect(source).toHaveSubscriptions(subscription);
  });

  it('should test subscription observable', () => {
    const source = hot('-a-^(bc)-|');
    const expected = cold('-(bc)-|');

    expect(source).toBeObservable(expected);
  });
});
