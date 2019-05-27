import axios from 'axios';
import _ from 'lodash';
import { logger } from '../../../common/utils/logger';
import { IAuthUser } from '../routes/auth.routes';

export const createUserIfNeeded = async (authenticatedUser: IAuthUser) => {
  const user = await getUser(authenticatedUser.id);
  if (_.isEmpty(user)) {
    await addUser(authenticatedUser.id);
    logger.info(`Created user ${authenticatedUser}`);
    return true;
  }
  return false;
};

const getUser = async (id: string) => {
  const user = await axios.get(`http://localhost:3002/account/${id}`);
  return user.data;
};

const addUser = async (id: string) => {
  await axios.post(`http://localhost:3002/account`, { name: 'Foo Bar', id });
};
