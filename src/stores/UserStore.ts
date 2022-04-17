import Repository from '@repository/Repository';
import { UserOutDto } from '@src/types';
import { observable } from 'mobx';
import AuthStore from './AuthStore';

interface UserStoreType {
  userCardInfo: UserOutDto | null;
  getUserInfo: () => Promise<UserOutDto>;
  getUserCardInfo: () => UserOutDto | null;
}

const UserStore = observable<UserStoreType>({
  userCardInfo: null,

  async getUserInfo(): Promise<UserOutDto> {
    try {
      if (this.userCardInfo === null) {
        const result = await Repository.getUser(AuthStore.getAccessToken());
        this.userCardInfo = result;
        return result;
      }
      return this.userCardInfo;
    } catch (error) {
      AuthStore.removeAccessToken();
      console.error('getUserData fail');
      throw error;
    }
  },

  getUserCardInfo() {
    return this.userCardInfo;
  },
});

export default UserStore;

//  ably@dummy.com
//  !abc321#$
