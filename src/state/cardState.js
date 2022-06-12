import { atom, selectorFamily } from 'recoil';

export const currentCardState = atom({
  key: 'currentCards',
  default: [],
});

export const currentDefaultCardState = atom({
  key: 'currentDefaultCards',
  default: { data: [], updated: false },
});

export const currentCardByTagState = atom({
  key: 'currentCardsByTag',
  default: {},
});

export const currentCardByFolderState = atom({
  key: 'currentCardsByFolder',
  default: {},
});

export const currentCardByFolderSelector = selectorFamily({
  key: 'currentCardSelector',
  get:
    () =>
    ({ get }) => {
      return get(currentCardByFolderState);
    },
  set:
    ({ requestType, folderId }) =>
    ({ set, get }, newValues) => {
      const currentCards = get(currentCardByFolderState);
      if (requestType === 'insert') {
        const newCards = { ...currentCards };
        if (newCards[folderId]) {
          newCards[folderId] = Object.assign([], newCards[folderId]);
          newCards[folderId].push(newValues);
        } else {
          newCards[folderId] = newValues;
        }
        set(currentCardByFolderState, newCards);
        return;
      }
      if (requestType === 'delete') {
        const result = Object.fromEntries(
          Object.entries(currentCards).map(card => {
            return [card[0], card[1].filter(c => parseInt(c.cardId) !== newValues.cardId)];
          }),
        );
        set(currentCardByFolderState, {
          ...result,
        });
        return;
      }
      if (requestType === 'update') {
        const newCardListById = currentCards[folderId];
        set(currentCardByFolderState, {
          ...currentCardByFolderState,
          [folderId]: newCardListById,
        });
      }
    },
});

export const currentCardBySearchState = atom({
  key: 'currentCardsBySearch',
  default: {},
});

export const cardChangeState = atom({
  key: 'cardChange',
  default: false,
});

export const currentCardClassifier = atom({
  key: 'cardClassifier',
  default: { id: -1, classifier: undefined, name: '', parent: undefined },
});
