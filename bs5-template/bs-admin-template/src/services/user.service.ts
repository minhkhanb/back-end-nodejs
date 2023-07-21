import apiClient from '@src/utils/api';

export const apiLogin = () => {
  return apiClient.get('/profile');
};
