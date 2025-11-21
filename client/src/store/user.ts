import { atom } from 'recoil';
import type { TUser } from 'librechat-data-provider';

const user = atom<TUser | undefined>({
  key: 'user',
  default: undefined,
});

export default {
  user,
};
