import { isBrowser } from '@src/utils';
import { UserRole } from '@src/utils/rolesConfig';

export interface LoggedUser {
  userId: string;
  role: UserRole;
}

export const key = 'loggedUser';
const setUser = (user: LoggedUser) => console.log('setUser: ', user);
const getUser = (): LoggedUser => {
  return { userId: '', role: UserRole.Admin };
};

export const setLoggedUser = (user: LoggedUser): void => {
  if (isBrowser()) {
    setUser(user);
  }
};

export const getLoggedUser = (): LoggedUser | null => {
  try {
    if (isBrowser()) {
      return getUser();
    }
  } catch {
    /* empty */
  }

  return null;
};
