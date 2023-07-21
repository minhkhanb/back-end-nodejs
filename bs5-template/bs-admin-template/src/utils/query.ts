import { DefaultOptions, QueryClientConfig } from 'react-query';

const queryOptions: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
  },
};

export const queryConfig: QueryClientConfig = {
  defaultOptions: queryOptions,
};
