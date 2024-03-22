'use server';

import { z } from 'zod';
import validator from 'validator';

const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

const tokenSchema = z.coerce.number().min(100000).max(999999);

export const smsLogin = async (prevState: any, formData: FormData) => {
  console.log(typeof formData.get('phone'));
  console.log(typeof tokenSchema.parse(formData.get('token')));
};
