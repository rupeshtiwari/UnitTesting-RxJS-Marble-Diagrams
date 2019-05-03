import { cold, getTestScheduler } from 'jasmine-marbles';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

describe('TestScheduler', () => {
  xit('should work with interval operator', () => {
    interval(40, getTestScheduler()).subscribe(i => {
      console.log(i);
    });
  });

  it('should work with cold observable', () => {
    const messages = cold('--a---b--|', { a: 'marble testing', b: 'is fun' });
    messages.subscribe(console.log);
    getTestScheduler().flush(); 
  });
});
