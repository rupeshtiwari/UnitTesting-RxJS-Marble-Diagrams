const { interval } = require('rxjs');
const { share } = require('rxjs/operators');

const log = console.log;

// source observable
const source = interval(1000).pipe(share());

setTimeout(function() {
  // 1st subscriber after 2 seconds
  log('subscriber1' + ' joined after: ' + 2000 + ' seconds');
  source.subscribe(s => log('subscriber1', s + 1, 'seconds'));

  // 2nd Subscriber after 5 Seconds
  setTimeout(function() {
    log('subscriber2' + ' joined after: ' + 5000 + ' seconds');
    source.subscribe(s => log('subscriber2', s + 1, 'seconds'));
  }, 5000);
}, 2000);
