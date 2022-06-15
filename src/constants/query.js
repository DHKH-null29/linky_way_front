export const REACT_QUERY_KEY = {
  CARDS_BY_DEFAULT: 'cardsByDefault',
  CARDS_BY_FOLDER: 'cardsByFolder',
  CARDS_BY_TAG: 'cardsByTag',
  CARDS_BY_SEARCH: 'cardsBySearch',

  FOLDERS: 'folders',
  TAGS: 'tags',
};

export const DEFAULT_CLIENT_QUERY_SETTINGS = {
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      retry: false,
    },
  },
};

export const CARD_CLASSIFIER = {
  DEFAULT: {
    name: '',
    type: undefined,
    query: REACT_QUERY_KEY.CARDS_BY_DEFAULT,
    byId: false,
  },
  SEARCH: {
    name: '검색',
    type: 'search',
    query: REACT_QUERY_KEY.CARDS_BY_SEARCH,
    byId: false,
  },
  FOLDER: {
    name: '폴더',
    type: 'folder',
    query: REACT_QUERY_KEY.CARDS_BY_FOLDER,
    byId: true,
  },
  TAG: {
    name: '태그',
    type: 'tag',
    query: REACT_QUERY_KEY.CARDS_BY_TAG,
    byId: true,
  },
};

export const getCardQueryKeyByClassifier = (classifier, id) => {
  return classifier.byId ? [classifier.query, id] : classifier.query;
};
