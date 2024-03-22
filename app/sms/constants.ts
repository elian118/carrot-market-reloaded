import { ActionState, FormState } from '@/app/sms/types';

export const initialState: ActionState = {
  token: false,
};

export const initFormValue: FormState = {
  phone: '',
  token: '',
};
