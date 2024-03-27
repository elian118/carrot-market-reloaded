'use client';

import Input from '@/components/input';
import Button from '@/components/button';
import { useFormState } from 'react-dom';
import { smsLogIn } from '@/app/(auth)/sms/actions';
import { initFormValue, initialState } from '@/app/(auth)/sms/constants';
import { useState } from 'react';
import { FormState } from '@/app/(auth)/sms/types';

const SMSLogin = () => {
  const [state, dispatch] = useFormState(smsLogIn, initialState);
  const [form, setForm] = useState<FormState>(initFormValue);

  // state 변경 시 인풋값이 그대로 유지되며,
  // 전화번호가 인증번호로 간주되는 버그 발생으로 인해 추가
  const onSubmitHandler = () => setForm(initFormValue);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">전화번호 인증을 진행해주세요.</h2>
      </div>
      {state && (
        <form
          onSubmit={onSubmitHandler}
          action={dispatch}
          className="flex flex-col gap-3"
        >
          {state.token ? (
            <Input
              name="token"
              type="number"
              value={form.token}
              onChange={(e) => setForm({ ...form, token: e.target.value })}
              placeholder="인증번호"
              required
              min={100000}
              max={999999}
              errors={state.error?.formErrors}
            />
          ) : (
            <Input
              name="phone"
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="전화번호"
              required
              errors={state.error?.formErrors}
            />
          )}
          <Button type="submit">{state.token ? '인증하기' : '인증문자 보내기'}</Button>
        </form>
      )}
    </div>
  );
};

export default SMSLogin;
