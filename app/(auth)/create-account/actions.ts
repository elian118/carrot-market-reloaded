'use server';

import { signIn } from '@/app/(auth)/create-account/services';
import { formSchema } from '@/app/(auth)/create-account/schemas';

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  const result = await formSchema.spa(data); // spa Alias of safeParseAsync

  if (!result.success) return result.error.flatten();
  else await signIn(result.data);
};
