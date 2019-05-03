import { cold } from 'jasmine-marbles';
import { concat } from 'rxjs/operators';

describe('concat operator', () => {
  it('should concat 2 observables', () => {
    const $obs1 = cold('---a---b|');
    const sub1 = '^-------!';
    const $obs2 = cold('---c---d|');
    const sub2 = '--------^-------!';
    const $result = $obs1.pipe(concat($obs2));

    const $expected = cold('---a---b---c---d|');

    expect($result).toBeObservable($expected);
    expect($obs1).toHaveSubscriptions(sub1);
    expect($obs2).toHaveSubscriptions(sub2);
  });
  xit('serving pizza to customer', () => {
    const status = {
      orderCreated: '📦 order placed',
      paymentReceived: '💰 received',
      orderReady: '🍕 ready 😋',
      orderShipped: '🍕 shipped 🚀'
    };
    const $orderCreated = cold('--c--|', {
      c: status.orderCreated
    });
    const $paymentReceived = cold('---p|', {
      p: status.paymentReceived
    });
    const $orderReady = cold('-r-|', {
      r: status.orderReady
    });
    const $orderShipped = cold('---s--|', {
      s: status.orderShipped
    });
    const $expected = cold('--f-----u-n----i--|', {
      f: status.orderCreated,
      u: status.paymentReceived,
      n: status.orderReady,
      i: status.orderShipped
    });
    const $result = servePizza(
      $orderCreated,
      $paymentReceived,
      $orderReady,
      $orderShipped
    );
    expect($result).toBeObservable($expected);
  });
});

function servePizza($sale, $payment, $kitchen, $shipOrReadyForPickup) {
  return $sale.pipe(concat($payment, $kitchen, $shipOrReadyForPickup));
}
