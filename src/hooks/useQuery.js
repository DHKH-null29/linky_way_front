import { useInfiniteQuery } from 'react-query';
import { useState } from 'react';

export const useLazyPagingQuery = (key, fn, options) => {
  const [enabled, setEnabled] = useState(false);
  return [
    () => setEnabled(true),
    useInfiniteQuery(key, fn, {
      ...options,
      enabled,
      getNextPageParam: lastPage => {
        if (lastPage.hasNext) {
          return lastPage.next;
        }
        return undefined;
      },
    }),
  ];
};

export const useEagerPagingQuery = (key, fn, options) => {
  return useInfiniteQuery(key, fn, {
    getNextPageParam: lastPage => {
      if (lastPage.hasNext) {
        return lastPage.next;
      }
      return undefined;
    },
    ...options,
  });
};
