import { interval, Observable, Observer } from 'rxjs';
import { take, delay } from 'rxjs/operators';
/*
const source = interval(3000).pipe(take(5));

source.subscribe(
  x => {
    console.log('onNext', x, new Date());
  },
  e => {
    console.log('onError', e);
  },
  () => {
    console.log('onComplete', new Date());
  }
);
*/

const source = Observable.create((observer: Observer<number>) => {
  observer.next(1);
  observer.next(2);
  observer.error(new Error('sadfdsfdf'));
});
source.subscribe(
  x => {
    console.log('onNext', x, new Date());
  },
  e => {
    console.log('onError', e);
  },
  () => {
    console.log('onComplete', new Date());
  }
);
