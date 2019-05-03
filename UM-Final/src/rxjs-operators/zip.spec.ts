import { cold } from 'jasmine-marbles';

import { zip } from 'rxjs/operators';

describe('zip', () => {
  it('can zip 2 streams', () => {
    const $obs1 = cold('---a---b---|', { a: 1, b: 3 });
    const $obs2 = cold('-----c---d---|', { c: 5, d: 7 });
    const $result = $obs1.pipe(zip($obs2, (x: number, y: number) => x + y));
    const $expected = cold('-----x---y-|', {
      x: 1 + 5,
      y: 3 + 7
    });
    expect($result).toBeObservable($expected);
  });

  it('can create users from user properties', () => {
    const $names = cold('-a-b-c-d-e-|', {
      a: 'John',
      b: 'Paul',
      c: 'Neel',
      d: 'Stacy',
      e: 'Carey' 
    });
    const $userids = cold('-j-k-l-m-|', {
      j: 'john',
      k: 'paul',
      l: 'neel',
      m: 'stacy'
    });
    const $result = createUsers($names, $userids);
    const $expected = cold('-p-q-r-s-|', {
      p: { name: 'John', userid: 'john' },
      q: { name: 'Paul', userid: 'paul' },
      r: { name: 'Neel', userid: 'neel' },
      s: { name: 'Stacy', userid: 'stacy' }
    });
    expect($result).toBeObservable($expected);
  });
});

function createUsers($names, $userids) {
  return $names.pipe(
    zip($userids, (name, userid) => ({
      name,
      userid
    }))
  );
}
