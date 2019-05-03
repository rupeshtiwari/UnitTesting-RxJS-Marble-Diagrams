const log = console.log;
const { switchMap, tap } = require('rxjs/operators');
const { of, concat, from, zip } = require('rxjs');

function findCount(text, $toSearch) {
  return $toSearch.pipe(
    switchMap(s => of(text.match(new RegExp(s, 'g')).length))
  );
}

function sortPrices($activities) {
  const activities = [1, 2, 3, 4, 5];
  return $activities.pipe(switchMap(a => of(a.sort())));
}

sortPrices(of([3, 9, 6, 4])).subscribe(console.log);

function searchBook($title) {
  const library = [
    { author: 'Bill Gates', title: 'The Road Ahead', libraryID: 1254 },
    { author: 'Steve Jobs', title: 'Walter Isaacson', libraryID: 4264 },
    {
      author: 'Suzanne Collins',
      title: 'Mockingjay: The Final Book of The Hunger Games',
      libraryID: 3245
    }
  ];

  return $title.pipe(
    switchMap(title => of(library.filter(book => book.title === title).pop()))
  );
}

searchBook(of('Walter Isaacson')).subscribe(console.log);

function concatsample($createOrder, $billing, $prepareOrder, $ship) {
  return concat($createOrder, $billing, $prepareOrder, $ship);
}

concatsample(
  of('order  placed'),
  of('payment received'),
  of('order  ready'),
  of('order  shipped')
).subscribe(log);

function allUsers($name, $age, $userid) {
  return zip($name, $age, $userid, (name, age, userid) => ({
    name,
    age,
    userid
  }));
}
allUsers(
  from(['John', 'Paul', 'Neel', 'Stacy','adsfd']),
  from(['20', '14', '13', '12']),
  from(['john', 'paul', 'neel', 'stacy'])
).subscribe(log);
