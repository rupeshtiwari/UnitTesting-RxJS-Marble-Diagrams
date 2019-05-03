const { interval } = require('rxjs');
const { share, map } = require('rxjs/operators');

const log = console.log;

// source observable
  const source = interval(1000).pipe(
    map(s => s + 1),
    share()
  )


setTimeout(function() {
  // 1st subscriber after 2 seconds
  log('subscriber1' + ' joined after: ' + 2 + ' seconds');
  source.subscribe(s => log('subscriber1 received: ', s));

  // 2nd Subscriber after 5 Seconds
  setTimeout(function() {
    log('subscriber2' + ' joined after: ' + 5 + ' seconds');
    source.subscribe(s => log('subscriber2 received: ', s));
  }, 5000);
}, 2000);
