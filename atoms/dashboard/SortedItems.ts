import { matchSorter } from 'match-sorter';
import { selector } from 'recoil';

import { limitAtom } from '../layout/limit';
import { itemsAtom } from './Items';
import { sortAtom } from './Sort';

export const sortedItemsSelector = selector({
  key: "sortedItems",
  get: ({ get }) => {
    const sort = get(sortAtom);
    const items = get(itemsAtom);
    const limit = get(limitAtom);

    function sortItems() {
      let queriedItems = queryItems();

      switch (sort.mode) {
        case "PRICE":
          return queriedItems.sort(
            (a, b) => (b.avgPrice ?? 0) - (a.avgPrice ?? 0)
          );
        case "CHANGE":
          return queriedItems.sort((a, b) => {
            if (a.history && b.history) {
              if (a.history.length > 2 && b.history.length > 2) {
                return (
                  b.history[b.history.length - 1].value -
                  b.history[b.history.length - 2].value -
                  (a.history[a.history.length - 1].value -
                    a.history[a.history.length - 2].value)
                );
              }
            }

            return 0;
          });
        case "PROFIT":
          return queriedItems.sort(
            (a, b) =>
              (b.avgPrice ?? 0) -
              (b.retail ?? 0) -
              ((a.avgPrice ?? 0) - (a.retail ?? 0))
          );
        case "COUNT":
          return queriedItems.sort((a, b) => b.count - a.count);
        case "NAME":
          return queriedItems.sort((a, b) => a.name.localeCompare(b.name));
        case "THEME":
          return queriedItems.sort((a, b) => a.theme.localeCompare(b.theme));
        default:
          return queriedItems;
      }
    }

    function queryItems() {
      if (sort.query) {
        return matchSorter(items, sort.query, {
          keys: ["name", "id", "theme"],
        });
      }

      return [...items];
    }

    if (!sort.desc) {
      return [...sortItems()].reverse();
    }

    return sortItems().slice(0, limit);
  },
});
