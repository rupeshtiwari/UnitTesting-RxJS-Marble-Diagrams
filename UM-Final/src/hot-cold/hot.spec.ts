import { hot, cold } from 'jasmine-marbles';
import { switchMap } from 'rxjs/operators';

describe('hot', () => {
  it('should test subscription on hot observable', () => {
    const provided = hot('-a-^b---c-|');
    const subscription = '^------!';
    expect(provided).toBeObservable(cold('-b---c-|'));
    expect(provided).toHaveSubscriptions(subscription);
  });

  it('should test subscription on hot observable that never completes', () => {
    const provided = hot('-a-^(bc)--');
    expect(provided).toBeObservable(cold('-(bc)--'));
    const subscription = '^--';
    expect(provided).toHaveSubscriptions(subscription);
  });

  it('can convert alphabet to uppercase', () => {
    const alphabets = hot('--a--b--c--d--');
    const provided = convertToUpperCase(alphabets);
    expect(provided).toBeObservable(cold('--A--B--C--D--'));
    const subscription = '^--';
    expect(alphabets).toHaveSubscriptions(subscription);
  });
});

function convertToUpperCase($alphabets) {
  return $alphabets.pipe(switchMap((s: string) => s.toUpperCase()));
}
