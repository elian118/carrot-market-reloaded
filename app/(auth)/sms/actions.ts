'use server';

import { ActionState } from '@/app/(auth)/sms/types';
import { loginWithSMS, validChkWithSMS } from '@/app/(auth)/sms/services';
import { phoneSchema, tokenSchema } from '@/app/(auth)/sms/schemas';

export const smsLogIn = async (
  prevState: ActionState,
  formData: FormData,
): Promise<any> => {
  const phone = formData.get('phone');
  const token = formData.get('token');

  if (!prevState.token) {
    const phoneValid = phoneSchema.safeParse(phone);
    return !phoneValid.success
      ? { token: false, error: phoneValid.error.flatten() }
      : await validChkWithSMS(phoneValid.data);
  } else {
    const tokenValid = await tokenSchema.spa(token);
    if (!tokenValid.success) {
      return { token: !tokenValid.success, error: tokenValid.error.flatten() };
    } else await loginWithSMS(tokenValid.data.toString());
  }
};
