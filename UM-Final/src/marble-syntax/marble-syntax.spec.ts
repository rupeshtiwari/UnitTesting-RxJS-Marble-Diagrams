import { cold } from 'jasmine-marbles';
import { NEVER, EMPTY } from 'rxjs';

describe('Marble Syntax', () => {
  describe('EMPTY', () => {
    it('emits no items but terminates normally', () => {
      const provided = EMPTY;
      const expected = cold('|');

      expect(provided).toBeObservable(expected);
    });
  });

  describe('NEVER', () => {
    it('emits no items and does not terminate', () => {

      const provided = NEVER;
      const expected = cold('-');

      expect(provided).toBeObservable(expected);

      const expected1 = cold ('----');

      expect(provided).toBeObservable(expected1);
    });
  });
});
