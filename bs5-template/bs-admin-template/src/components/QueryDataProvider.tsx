import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { queryConfig } from '@src/utils/query';
// import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient(queryConfig);

const QueryDataProvider: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
    </QueryClientProvider>
  );
};

export default QueryDataProvider;
