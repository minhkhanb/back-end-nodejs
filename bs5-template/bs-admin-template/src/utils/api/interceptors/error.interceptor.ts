import { AxiosInterceptorManager, AxiosResponse } from 'axios';

export const ErrorIntercept = (
  response: AxiosInterceptorManager<AxiosResponse>
): void => {
  response.use(
    (data) => data,
    async (err) => {
      return Promise.reject(err);
    }
  );
};
