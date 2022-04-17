import UserStore from '@stores/UserStore';
import AuthStore from '../stores/AuthStore';

const useStore = () => ({ AuthStore, UserStore });

export default useStore;
