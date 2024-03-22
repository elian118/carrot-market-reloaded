'use client';

import Input from '@/components/input';
import Button from '@/components/button';
import { useFormState } from 'react-dom';
import { smsLogin } from '@/app/sms/actions';

const SMSLogin = () => {
  const [state, dispatch] = useFormState(smsLogin, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">전화번호 인증을 진행해주세요.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="phone"
          type="text"
          placeholder="전화번호"
          required
          // errors={state?.fieldErrors.phone}
        />
        <Input
          name="token"
          type="number"
          placeholder="인증번호"
          required
          // errors={state?.fieldErrors.token}
          min={100000}
          max={999999}
        />
        <Button text="인증하기" />
      </form>
    </div>
  );
};

export default SMSLogin;
