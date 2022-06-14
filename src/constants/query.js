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
