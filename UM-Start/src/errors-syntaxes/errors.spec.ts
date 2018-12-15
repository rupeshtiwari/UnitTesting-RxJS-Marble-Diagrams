import { cold } from 'jasmine-marbles';
import { throwError, Observable } from 'rxjs';

describe('error', () => {
  it('throwError', () => {
    
  });
  it('should work with error', () => {

  });

  it('should work with value and error', () => {

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
