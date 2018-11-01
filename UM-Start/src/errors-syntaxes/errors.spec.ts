import { cold } from 'jasmine-marbles';
import { throwError, Observable } from 'rxjs';

describe('error', () => {
  it('test', () => {
    const s = throwError('error');
    expect(s).toBeObservable(cold('#'));
  });
  it('should work with error with values', () => {
    const expected = cold('#', {}, new Error('server error'));
    const result = getData();

    expect(result).toBeObservable(expected);
  });

  it('should work with value and error', () => {
    const expected = cold('(x#)', { x: 'orange' }, new Error('server error'));
    const result = getEmployees();

    expect(result).toBeObservable(expected);
  });
});

function getData() {
  return throwError(new Error('server error'));
}

function getEmployees() {
  return Observable.create(observer => {
    observer.next('orange');
    observer.error(new Error('server error'));
  });
}
