import { tokenUser } from '../services/users'

export const isAuthenticated = () => {

  if (tokenUser) {
    return true;
  } else {
    return false;
  }
};