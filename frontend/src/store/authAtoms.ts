import { atom } from 'jotai';

export const userAtom = atom<{ email: string | null; token: string | null }>({
  email: null,
  token: null
});

export const draftAtom = atom<{ email: string; password: string }>({
  email: '',
  password: ''
});