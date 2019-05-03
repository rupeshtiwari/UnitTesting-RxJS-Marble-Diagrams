import { switchMap } from 'rxjs/operators';

import { of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

describe('can support observable data mocking', () => {
  xit('can mock string value', () => {
    const $provided = hot('--a--', {
      a: 'apple'
    });
    $provided.subscribe(console.log);
    expect($provided).toBeObservable(hot('a'));
  });

  it('can search character counts in a given text', () => {
    const $searchCharacter = hot('--x--', { x: 'a' });
    const $result = findCount('marble diagrams', $searchCharacter);
    const $expected = cold('--y--', { y: 3 });
    expect($result).toBeObservable($expected);
  });

  it('can sort prices of the books from highest to the lowest', () => {
    const $bookPrices = cold('--a--', {
      a: [3, 69, 1, 4, 6, 33, 10]
    });
    const $result = sortPrices($bookPrices);

    const $expected = cold('--a--', {
      a: [69, 33, 10, 6, 4, 3, 1]
    });

    expect($result).toBeObservable($expected);
  });

  it('can search book by title', () => {
    const $title = cold('--t--', {
      t: 'The Road Ahead'
    });

    const $result = searchBook($title);

    const $expected = cold('--b--', {
      b: { author: 'Bill Gates', libraryID: 1254, title: 'The Road Ahead' }
    });

    expect($result).toBeObservable($expected);
  });
});

function findCount(text, $toSearch) {
  return $toSearch.pipe(
    switchMap((s: string) => of(text.match(new RegExp(s, 'g')).length))
  );
}

function sortPrices($prices) {
  return $prices.pipe(switchMap((a: []) => of(a.sort((x, y) => y - x))));
}

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
